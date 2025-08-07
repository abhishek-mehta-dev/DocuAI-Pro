from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DocuAiPro-App"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: Optional[str] = None
    FRONTEND_URL: Optional[str] = None
    ACCESS_TOKEN_EXPIRE_MINUTES: Optional[int] = None
    SECRET_KEY: Optional[str] = None
    GOOGLE_CLIENT_ID: str

    class Config:
        env_file = "app/.env"

settings = Settings()
