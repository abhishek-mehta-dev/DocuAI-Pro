from typing import Optional
from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent  # points to backend/app
ROOT_DIR = BASE_DIR.parent  # points to backend/

class Settings(BaseSettings):
    PROJECT_NAME: str = "DocuAiPro-App"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: Optional[str] = None
    FRONTEND_URL: Optional[str] = None
    ACCESS_TOKEN_EXPIRE_MINUTES: Optional[int] = None
    SECRET_KEY: Optional[str] = None
    GOOGLE_CLIENT_ID: Optional[str] = None
    PAYPAL_CLIENT_ID: Optional[str] = None
    PAYPAL_SECRET: Optional[str] = None
    google_application_credentials:Optional[str] = None
    
    # LLM Provider
    DEFAULT_LLM_PROVIDER: str = None

    # OpenAI
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4o-mini"

    # Anthropic
    ANTHROPIC_API_KEY: Optional[str] = None
    ANTHROPIC_MODEL: str = "claude-3-opus-20240229"

    # Azure OpenAI
    AZURE_API_KEY: Optional[str] = None
    AZURE_ENDPOINT: Optional[str] = None
    AZURE_DEPLOYMENT: Optional[str] = None
    AZURE_API_VERSION: str = "2024-05-01"

    # Google GenAI
    GOOGLE_API_KEY: Optional[str] = None
    GOOGLE_GENAI_MODEL: str = "gemini-pro"

    # Google Vertex AI
    VERTEX_MODEL: Optional[str] = None  


    # Cohere
    COHERE_API_KEY: Optional[str] = None
    COHERE_MODEL: str = "command-r"

    # Mistral
    MISTRAL_API_KEY: Optional[str] = None
    MISTRAL_MODEL: str = "mistral-large"

    # Groq
    GROQ_API_KEY: Optional[str] = None
    GROQ_MODEL: str = "mixtral-8x7b"

    # HuggingFace
    HF_EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    HF_LLM_MODEL: str ="HuggingFaceH4/zephyr-7b-alpha"
    HF_API_KEY: Optional[str] = None


    # NVIDIA
    NVIDIA_API_KEY: Optional[str] = None
    NVIDIA_MODEL: str = "nemotron-3"

    # AWS Bedrock
    BEDROCK_MODEL: Optional[str] = None
    AWS_REGION: Optional[str] = None

    OLLAMA_MODEL: Optional[str] = None

    # Storage directories
    DOC_UPLOAD_DIR: Path = ROOT_DIR / "storage" / "uploads"
    DOC_INDEX_DIR: Path = ROOT_DIR / "storage" / "indexes"

    class Config:
        env_file = "app/.env"

settings = Settings()

# Ensure directories exist
settings.DOC_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
settings.DOC_INDEX_DIR.mkdir(parents=True, exist_ok=True)