from sqlmodel import create_engine, Session
from app.core.config import settings
import app.db.base  

DATABASE_URL = settings.DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=5,
    max_overflow=10,
    connect_args={"sslmode": "require"},
)

def get_session():
    """FastAPI dependency to provide a session per request."""
    with Session(engine) as session:
        yield session
