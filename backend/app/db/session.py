from sqlmodel import create_engine, Session
from app.core.config import settings


DATABASE_URL = settings.DATABASE_URL

# For async usage: use "postgresql+asyncpg://" and AsyncSession
engine = create_engine(DATABASE_URL, echo=False)


def get_session():
    """FastAPI dependency to provide a session per request."""
    with Session(engine) as session:
        yield session
