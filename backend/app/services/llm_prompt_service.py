from app.services.llm_factory import build_embeddings, build_llm
from fastapi import HTTPException


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