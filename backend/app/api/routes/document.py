from fastapi import APIRouter,Depends,status
from sqlmodel import Session
from app.db.session import get_session
from app.dependencies.auth import get_current_user
from app.utils.response_helpers import success_response,error_response
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Body
from pathlib import Path
import os, shutil
from app.core.config import settings
from app.services import pdf_service, vector_service, document_service
from app.schemas.transformers.convert_document_for_api import convert_document_for_api,convert_documents_for_api


router = APIRouter(prefix="/document", tags=["Documents"])

UPLOAD_DIR = Path(settings.DOC_UPLOAD_DIR)
INDEX_DIR = Path(settings.DOC_INDEX_DIR)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    if not file.filename.lower().endswith(".pdf"):
        return error_response("Only PDF files are allowed", status.HTTP_400_BAD_REQUEST)

    # Save PDF safely
    safe_name = file.filename.replace("/", "_")
    stored_path = UPLOAD_DIR / f"{current_user.id}__{safe_name}"
    with open(stored_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Extract + chunk text
    chunks, pages = pdf_service.extract_and_chunk(str(stored_path))

    # Build FAISS index (your service)
    faiss_dir = INDEX_DIR / f"{current_user.id}__{safe_name}"
    vector_service.save_embeddings(str(faiss_dir), chunks)

    # Persist metadata in DB
    doc = document_service.create_document(
        db=db,
        user_id=current_user.id,
        filename=safe_name,
        stored_path=str(stored_path),
        faiss_path=str(faiss_dir),
        page_count=pages,
    )

    return success_response(
        data=convert_document_for_api(doc),
        message="PDF processed successfully",
        status_code=status.HTTP_201_CREATED,
    )

@router.get("/list")
def list_documents(
    db: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    docs = document_service.get_user_documents(db, current_user.id)
    return success_response(
        data=convert_documents_for_api(docs),
        message="Documents fetched successfully",
        status_code=status.HTTP_200_OK
    )

@router.post("/chat")
def chat_with_pdf(
    doc_id: int = Body(..., embed=True),
    question: str = Body(..., embed=True),
    db: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    if not question.strip():
        return error_response("Question is empty", status.HTTP_400_BAD_REQUEST)

    # Check if the document belongs to the current user
    doc = document_service.get_user_document(db, current_user.id, doc_id)
    if not doc:
        return error_response("Document not found", status.HTTP_404_NOT_FOUND)

    # Get answer from FAISS/vector service
    try:
        answer = vector_service.get_answer(doc.faiss_path, question)
    except Exception as e:
        return error_response(f"Error while processing vector query: {str(e)}", status.HTTP_500_INTERNAL_SERVER_ERROR)

    return success_response(
        data={"answer": answer, "document": convert_document_for_api(doc)},
        message="Answer retrieved successfully",
        status_code=status.HTTP_200_OK,
    )