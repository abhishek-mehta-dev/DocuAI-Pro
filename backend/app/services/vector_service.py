import os
from fastapi import HTTPException
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from typing import Dict, Any, List
from app.services.llm_factory import build_embeddings, build_llm


def save_embeddings(faiss_dir: str, chunks: list[str]) -> None:
    """Create FAISS index from chunks and save locally."""
    try:
        # Remove empty/whitespace chunks
        valid_chunks = [c.strip() for c in chunks if c and c.strip()]
        if not valid_chunks:
            raise HTTPException(status_code=400, detail="No valid text found to embed")

        os.makedirs(os.path.dirname(faiss_dir), exist_ok=True)
        vs = FAISS.from_texts(valid_chunks, build_embeddings())
        vs.save_local(faiss_dir)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save embeddings: {str(e)}")


def get_answer(faiss_path: str, question: str, provider: str = None) -> str:
    """
    Improved function to get answer from document using similarity search
    Uses direct approach instead of ConversationalRetrievalChain for better reliability
    """
    try:
        # Validate vector store exists
        index_file = os.path.join(faiss_path, "index.faiss")
        metadata_file = os.path.join(faiss_path, "index.pkl")

        if not os.path.exists(index_file) or not os.path.exists(metadata_file):
            raise HTTPException(status_code=404, detail=f"Vector index not found at {faiss_path}")

        print(f"Loading vector store from: {faiss_path}")
        
        # Load embeddings and vector store
        embeddings = build_embeddings()
        vectorstore = FAISS.load_local(
            faiss_path,
            embeddings,
            allow_dangerous_deserialization=True
        )

        print(f"Question: {question}")
        
        # Perform similarity search - get most relevant chunks
        relevant_docs = vectorstore.similarity_search(question, k=5)
        
        if not relevant_docs:
            return "I couldn't find any relevant information in this document to answer your question."

        print(f"Found {len(relevant_docs)} relevant document chunks")

        # Build context from relevant chunks
        context = _build_context_from_docs(relevant_docs)
        
        # Generate answer using LLM
        answer = _generate_answer_with_llm(context, question, provider)
        
        return answer

    except Exception as e:
        print(f"Error in get_answer: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get answer: {str(e)}")


def get_answer_with_conversational_chain(faiss_path: str, question: str, provider: str = None) -> str:
    """
    Original function using ConversationalRetrievalChain (kept for backward compatibility)
    Use this if you prefer the chain approach
    """
    try:
        index_file = os.path.join(faiss_path, "index.faiss")
        metadata_file = os.path.join(faiss_path, "index.pkl")

        if not os.path.exists(index_file) or not os.path.exists(metadata_file):
            raise HTTPException(status_code=404, detail=f"Vector index not found at {faiss_path}")

        embeddings = build_embeddings()
        vectorstore = FAISS.load_local(
            faiss_path,
            embeddings,
            allow_dangerous_deserialization=True
        )

        retriever = vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 3}
        )

        llm = build_llm(provider)

        qa_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever
        )

        response = qa_chain.invoke({"question": question, "chat_history": []})

        if "answer" in response:
            return response["answer"]
        elif "result" in response:
            return response["result"]
        else:
            raise HTTPException(status_code=500, detail="Unexpected response format from LLM")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get answer: {str(e)}")


def get_answer_with_similarity_scores(faiss_path: str, question: str, provider: str = None) -> Dict[str, Any]:
    """
    Get answer along with similarity scores for debugging
    """
    try:
        # Validate vector store exists
        index_file = os.path.join(faiss_path, "index.faiss")
        metadata_file = os.path.join(faiss_path, "index.pkl")

        if not os.path.exists(index_file) or not os.path.exists(metadata_file):
            raise HTTPException(status_code=404, detail=f"Vector index not found at {faiss_path}")

        embeddings = build_embeddings()
        vectorstore = FAISS.load_local(
            faiss_path,
            embeddings,
            allow_dangerous_deserialization=True
        )

        # Get documents with similarity scores
        relevant_docs_with_scores = vectorstore.similarity_search_with_score(question, k=5)

        if not relevant_docs_with_scores:
            return {
                "answer": "I couldn't find any relevant information in this document.",
                "similarity_scores": [],
                "chunks_found": 0,
                "avg_similarity": 0
            }

        # Extract docs and scores
        docs = [doc for doc, score in relevant_docs_with_scores]
        scores = [float(score) for doc, score in relevant_docs_with_scores]

        # Build context and generate answer
        context = _build_context_from_docs(docs)
        answer = _generate_answer_with_llm(context, question, provider)
        
        return {
            "answer": answer,
            "similarity_scores": scores,
            "chunks_found": len(docs),
            "avg_similarity": sum(scores) / len(scores) if scores else 0
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get answer with scores: {str(e)}")


def _build_context_from_docs(docs) -> str:
    """
    Build context string from retrieved documents
    """
    context_parts = []
    
    for i, doc in enumerate(docs, 1):
        # Add page info if available
        page_info = ""
        if hasattr(doc, 'metadata') and doc.metadata:
            page = doc.metadata.get('page', '')
            if page:
                page_info = f" (Page {page + 1})" if isinstance(page, int) else f" (Page {page})"
        
        context_parts.append(f"[Chunk {i}{page_info}]:\n{doc.page_content}")
    
    return "\n\n".join(context_parts)


def _generate_answer_with_llm(context: str, question: str, provider: str = None) -> str:
    """
    Generate answer using LLM with the retrieved context
    """
    try:
        # Load LLM
        llm = build_llm(provider)
        
        # Create prompt template
        prompt = f"""You are a helpful AI assistant. Answer the user's question based on the following context from a PDF document.

Instructions:
- Use only the information provided in the context below
- If the answer is not in the context, say "I don't have enough information in this document to answer your question."
- Be specific and detailed in your response
- If the question asks for "details about the PDF", provide a comprehensive overview of the main topics, content, and key information found in the document
- Maintain a professional and helpful tone

Context from PDF:
{context}

Question: {question}

Answer:"""

        print("Generating answer with LLM...")
        
        # Get response from LLM
        response = llm.invoke(prompt)
        
        # Handle different response formats
        if hasattr(response, 'content'):
            answer = response.content
        elif isinstance(response, str):
            answer = response
        else:
            answer = str(response)
        
        print(f"Generated answer: {answer[:200]}...")  # Log first 200 chars
        
        return answer.strip()

    except Exception as e:
        print(f"Error generating answer with LLM: {str(e)}")
        raise HTTPException(status_code=500, detail=f"LLM generation failed: {str(e)}")


def validate_vector_store(faiss_path: str) -> bool:
    """
    Validate that FAISS vector store files exist
    """
    index_file = os.path.join(faiss_path, "index.faiss")
    metadata_file = os.path.join(faiss_path, "index.pkl")
    
    return os.path.exists(index_file) and os.path.exists(metadata_file)


