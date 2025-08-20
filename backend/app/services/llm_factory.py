import os
from fastapi import HTTPException
from app.core.config import settings

# === LangChain Providers ===
from langchain_openai import OpenAIEmbeddings, ChatOpenAI, AzureChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_google_vertexai import ChatVertexAI
from langchain_cohere import ChatCohere, CohereEmbeddings
from langchain_mistralai import ChatMistralAI
from langchain_ollama import ChatOllama
from langchain_groq import ChatGroq
from langchain_aws import ChatBedrock
from langchain_huggingface import ChatHuggingFace, HuggingFaceEmbeddings
from langchain_nvidia_ai_endpoints import ChatNVIDIA


# Map of providers → model constructors
LLM_PROVIDERS = {
    "openai": lambda: ChatOpenAI(
        temperature=0,
        model=settings.OPENAI_MODEL,
        openai_api_key=settings.OPENAI_API_KEY,
    ),
    "azure_openai": lambda: AzureChatOpenAI(
        deployment_name=settings.AZURE_DEPLOYMENT,
        openai_api_version=settings.AZURE_API_VERSION,
        azure_endpoint=settings.AZURE_ENDPOINT,
        api_key=settings.AZURE_API_KEY,
    ),
    "anthropic": lambda: ChatAnthropic(
        temperature=0,
        model=settings.ANTHROPIC_MODEL,
        anthropic_api_key=settings.ANTHROPIC_API_KEY,
    ),
    "google_genai": lambda: ChatGoogleGenerativeAI(
        temperature=0,
        model=settings.GOOGLE_GENAI_MODEL,
        google_api_key=settings.GOOGLE_API_KEY,
    ),
    "vertexai": lambda: ChatVertexAI(model=settings.VERTEX_MODEL),
    "cohere": lambda: ChatCohere(
        temperature=0,
        model=settings.COHERE_MODEL,
        cohere_api_key=settings.COHERE_API_KEY,
    ),
    "mistral": lambda: ChatMistralAI(
        temperature=0,
        model=settings.MISTRAL_MODEL,
        mistral_api_key=settings.MISTRAL_API_KEY,
    ),
    "ollama": lambda: ChatOllama(model=settings.OLLAMA_MODEL) if settings.OLLAMA_MODEL else None,
    "groq": lambda: ChatGroq(
        temperature=0,
        model=settings.GROQ_MODEL,
        groq_api_key=settings.GROQ_API_KEY,
    ),
    "aws_bedrock": lambda: ChatBedrock(
        model=settings.BEDROCK_MODEL,
        region=settings.AWS_REGION,
    ),
    "huggingface": lambda: ChatHuggingFace(model=settings.HF_MODEL),
    "nvidia": lambda: ChatNVIDIA(
        model=settings.NVIDIA_MODEL,
        api_key=settings.NVIDIA_API_KEY,
    ),
}


def detect_provider() -> str:
    """
    Auto-detect which provider is configured in .env by checking keys/models.
    Returns the first provider that has credentials set.
    """
    providers = [
        ("openai", settings.OPENAI_API_KEY),
        ("anthropic", settings.ANTHROPIC_API_KEY),
        ("azure_openai", settings.AZURE_API_KEY),
        ("google_genai", settings.GOOGLE_API_KEY),
        ("vertexai", settings.VERTEX_MODEL),
        ("cohere", settings.COHERE_API_KEY),
        ("mistral", settings.MISTRAL_API_KEY),
        ("ollama", settings.OLLAMA_MODEL),
        ("groq", settings.GROQ_API_KEY),
        ("aws_bedrock", settings.BEDROCK_MODEL),
        ("huggingface", settings.HF_MODEL),
        ("nvidia", settings.NVIDIA_API_KEY),
    ]
    for provider, key in providers:
        if key:
            return provider
    raise HTTPException(status_code=400, detail="No LLM provider is configured in .env")


def build_llm(provider: str = None):
    """
    Return a chat model based on the configured provider.
    Auto-detects provider if None is passed.
    """
    if provider is None:
        provider = detect_provider()
    if provider not in LLM_PROVIDERS:
        raise HTTPException(status_code=400, detail=f"Unsupported LLM provider: {provider}")
    try:
        model = LLM_PROVIDERS[provider]()
        if model is None:
            raise HTTPException(status_code=400, detail=f"{provider} model not configured")
        return model
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initialize {provider} LLM: {str(e)}")


def build_embeddings(provider: str = None):
    """
    Returns an embeddings provider based on the LLM provider.
    Auto-detects provider if None is passed.
    Supports: OpenAI, Google GenAI, Cohere, HuggingFace.
    """
    if provider is None:
        provider = detect_provider()

    if provider == "openai":
        if not settings.OPENAI_API_KEY:
            raise HTTPException(status_code=400, detail="OPENAI_API_KEY not configured")
        return OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)

    if provider == "google_genai":
        if not settings.GOOGLE_API_KEY:
            raise HTTPException(status_code=400, detail="GOOGLE_API_KEY not configured")
        return GoogleGenerativeAIEmbeddings(
            model=settings.GOOGLE_GENAI_MODEL,
            api_key=settings.GOOGLE_API_KEY
        )

    if provider == "cohere":
        if not settings.COHERE_API_KEY:
            raise HTTPException(status_code=400, detail="COHERE_API_KEY not configured")
        return CohereEmbeddings(cohere_api_key=settings.COHERE_API_KEY)

    if provider == "huggingface":
        if not settings.HF_MODEL:
            raise HTTPException(status_code=400, detail="HF_MODEL not configured")
        return HuggingFaceEmbeddings(model_name=settings.HF_MODEL)

    raise HTTPException(status_code=400, detail=f"Unsupported embeddings provider: {provider}")