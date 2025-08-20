from sqlmodel import SQLModel, Field
from datetime import datetime

class Document(SQLModel, table=True):
    __tablename__ = "documents"
    
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(index=True, foreign_key="users.id")  
    filename: str
    stored_path: str                # disk path to PDF
    faiss_path: str                 # folder where FAISS index is saved
    page_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
