import fitz
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Tuple, List


def extract_text(pdf_path: str) -> Tuple[str, int]:
    """Extract all text from PDF and return (text, page_count)."""
    doc = fitz.open(pdf_path)
    texts = [page.get_text("text") for page in doc]
    return "\n".join(texts), len(doc)


def extract_and_chunk(pdf_path: str, chunk_size: int = 800, overlap: int = 120) -> Tuple[List[str], int]:
    """Extract text from PDF, chunk it, return (chunks, page_count)."""
    text, pages = extract_text(pdf_path)
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=overlap)
    chunks = splitter.split_text(text)
    return chunks, pages
