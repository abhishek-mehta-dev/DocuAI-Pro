from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from app.db.models.document import Document
from app.services import vector_service


def create_document(
    db: Session,
    user_id: int,
    filename: str,
    stored_path: str,
    faiss_path: str,
    page_count: int,
) -> Document | None:
    """Persist uploaded document metadata in DB with safe transaction handling."""
    try:
        doc = Document(
            user_id=user_id,
            filename=filename,
            stored_path=stored_path,
            faiss_path=faiss_path,
            page_count=page_count,
            created_at=datetime.utcnow()
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc

    except SQLAlchemyError as e:
        db.rollback()
        print("Transaction failed while creating document:", e)
        return None


def get_user_documents(db: Session, user_id: int) -> list[Document]:
    """Fetch all documents belonging to a user (newest first)."""
    try:
        return (
            db.query(Document)
            .filter(Document.user_id == user_id)
            .order_by(Document.created_at.desc())
            .all()
        )
    except SQLAlchemyError as e:
        print("Failed to fetch user documents:", e)
        return []


def get_user_document(db: Session, user_id: int, doc_id: int) -> Document | None:
    """Fetch a single document for a user by doc_id."""
    try:
        return (
            db.query(Document)
            .filter(Document.user_id == user_id, Document.id == doc_id)
            .first()
        )
    except SQLAlchemyError as e:
        print("Failed to fetch user document:", e)
        return None


def chat_with_document(db: Session, user_id: int, doc_id: int, question: str) -> str | None:
    """Return AI answer from FAISS index if document belongs to user."""
    doc = get_user_document(db, user_id, doc_id)
    if not doc:
        return None

    return vector_service.get_answer(doc.faiss_path, question)
