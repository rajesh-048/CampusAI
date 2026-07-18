"""
CampusAI FastAPI Application Entry Point.

This module creates and configures the FastAPI application instance with:
- CORS middleware for frontend access
- Router registration for search, chat, and document endpoints
- Startup initialization for the vector store
- Health check endpoint
- Global error handling
"""

import logging
import sys
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.routers import search, chat, documents

# ─── Logging Configuration ───────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)


# ─── Application Lifespan ────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler for startup and shutdown events.

    On startup:
        - Validates configuration
        - Initializes the ChromaDB vector store
        - Creates required directories

    On shutdown:
        - Logs shutdown message
    """
    import os

    settings = get_settings()

    logger.info("=" * 60)
    logger.info("CampusAI Backend Starting...")
    logger.info("=" * 60)

    # Create required directories
    os.makedirs(settings.upload_dir, exist_ok=True)
    os.makedirs(settings.chroma_persist_dir, exist_ok=True)
    logger.info("Upload directory: %s", os.path.abspath(settings.upload_dir))
    logger.info("ChromaDB directory: %s", os.path.abspath(settings.chroma_persist_dir))

    # Initialize vector store asynchronously so Uvicorn binds port instantly
    import asyncio
    async def init_vector_store():
        try:
            from app.services import vector_store
            vector_store.initialize()
            logger.info("Vector store initialized successfully")
        except Exception as e:
            logger.error("Failed to initialize vector store: %s", str(e))

    asyncio.create_task(init_vector_store())

    # Log configuration
    logger.info("Embedding model: %s", settings.embedding_model)
    logger.info("LLM model: %s", settings.llm_model)
    logger.info("CORS origins: %s", settings.cors_origins)

    api_key_status = "configured" if (
        settings.gemini_api_key and settings.gemini_api_key != "your-gemini-api-key-here"
    ) else "NOT CONFIGURED"
    logger.info("Gemini API key: %s", api_key_status)

    logger.info("=" * 60)
    logger.info("CampusAI Backend Ready!")
    logger.info("=" * 60)

    yield

    logger.info("CampusAI Backend shutting down...")


# ─── FastAPI Application ─────────────────────────────────────────────────────

app = FastAPI(
    title="CampusAI - Campus Knowledge Navigator",
    description=(
        "AI-powered campus knowledge assistant providing semantic search and "
        "conversational AI over uploaded campus documents. Supports PDF, DOCX, "
        "PPTX, Excel, CSV, and image files with OCR."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware ──────────────────────────────────────────────────────────

settings = get_settings()
cors_origins = [origin.strip() for origin in settings.cors_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────

app.include_router(search.router)
app.include_router(chat.router)
app.include_router(documents.router)


# ─── Health Check ─────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def health_check() -> dict:
    """
    Health check endpoint.

    Returns:
        Service status, version, and current timestamp.
    """
    return {
        "status": "healthy",
        "version": "1.0.0",
        "service": "CampusAI Backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/health", tags=["Health"])
async def detailed_health() -> dict:
    """
    Detailed health check with service component status.

    Returns:
        Status of each service component (vector store, LLM, embeddings).
    """
    from app.services import vector_store as vs

    components = {
        "api": "healthy",
        "vector_store": "unknown",
        "gemini_api_key": "unknown",
    }

    # Check vector store
    try:
        stats = vs.get_collection_stats()
        components["vector_store"] = "healthy"
        components["vector_store_chunks"] = stats["total_chunks"]
    except Exception as e:
        components["vector_store"] = f"unhealthy: {str(e)}"

    # Check API key configuration
    api_key = settings.gemini_api_key
    if api_key and api_key != "your-gemini-api-key-here":
        components["gemini_api_key"] = "configured"
    else:
        components["gemini_api_key"] = "not_configured"

    overall = "healthy" if all(
        v in ("healthy", "configured") or isinstance(v, int)
        for v in components.values()
    ) else "degraded"

    return {
        "status": overall,
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "components": components,
    }


# ─── Global Exception Handler ────────────────────────────────────────────────

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Global exception handler to catch unhandled errors.

    Logs the full exception and returns a sanitised 500 response.
    """
    logger.error("Unhandled exception on %s %s: %s", request.method, request.url, str(exc), exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal server error occurred. Please try again later.",
            "error": str(exc),
        },
    )
