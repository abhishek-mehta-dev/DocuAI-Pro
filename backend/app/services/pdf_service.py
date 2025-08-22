import fitz
import pytesseract
from pdf2image import convert_from_path
from langchain.text_splitter import RecursiveCharacterTextSplitter
from fastapi import HTTPException
from typing import Tuple, List


def extract_text(pdf_path: str) -> Tuple[str, int]:
    """Extract text from PDF. Falls back to OCR for scanned pages."""
    doc = fitz.open(pdf_path)
    texts = []

    for page in doc:
        t = page.get_text("text").strip()
        if t:
            texts.append(t)
        else:
            # OCR only for pages without text
            images = convert_from_path(pdf_path, first_page=page.number+1, last_page=page.number+1)
            ocr_text = pytesseract.image_to_string(images[0], config="--oem 3 --psm 6").strip()
            if ocr_text:
                texts.append(ocr_text)

    full_text = "\n".join([t for t in texts if t])

    if not full_text.strip():
        raise HTTPException(status_code=400, detail="No text extracted (text layer missing & OCR failed).")

    return full_text, len(doc)


def extract_and_chunk(pdf_path: str, chunk_size: int = 800, overlap: int = 120) -> Tuple[List[str], int]:
    """Extract text (with OCR fallback), then chunk it."""
    text, pages = extract_text(pdf_path)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n\n", "\n", " ", ""]
    )
    chunks = [c.strip() for c in splitter.split_text(text) if c.strip()]

    if not chunks:
        raise HTTPException(status_code=400, detail="No valid chunks generated from PDF text.")

    return chunks, pages
