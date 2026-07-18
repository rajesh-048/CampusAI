"""
Application configuration module.

Loads settings from environment variables and .env file using pydantic-settings.
All configuration values can be overridden via environment variables.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Keys
    gemini_api_key: str = ""

    # Storage paths
    chroma_persist_dir: str = "./chroma_data"
    upload_dir: str = "./uploads"

    # Model configuration
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    llm_model: str = "gemini-2.0-flash"

    # CORS
    cors_origins: str = "http://localhost:3000"

    # Text processing
    chunk_size: int = 1000
    chunk_overlap: int = 200

    # Retrieval
    max_retrieval_results: int = 5

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached application settings.

    Returns a singleton Settings instance. The @lru_cache decorator ensures
    the .env file is only read once during the application lifetime.
    """
    return Settings()
