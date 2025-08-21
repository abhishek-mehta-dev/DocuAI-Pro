import os
from fastapi import HTTPException
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA

from app.services.llm_factory import build_embeddings, build_llm


def save_embeddings(faiss_dir: str, chunks: list[str]) -> None:
    """Create FAISS index from chunks and save locally."""
    try:
        os.makedirs(os.path.dirname(faiss_dir), exist_ok=True)
        vs = FAISS.from_texts(chunks, build_embeddings())
        vs.save_local(faiss_dir)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save embeddings: {str(e)}")


def get_answer(faiss_dir: str, question: str, provider: str = None) -> str:
    """Load FAISS index and query with an LLM."""
    try:
        embeddings = build_embeddings()
        vs = FAISS.load_local(faiss_dir, embeddings, allow_dangerous_deserialization=True)
        retriever = vs.as_retriever(search_kwargs={"k": 4})
        llm = build_llm(provider or "openai")
        qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
        return qa.run(question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get answer: {str(e)}")
