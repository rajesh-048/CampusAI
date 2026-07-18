"""
Search router for semantic search endpoints.

Provides endpoints for performing RAG-based semantic search over
the campus knowledge base, with suggestions and trending queries.
"""

import logging
from fastapi import APIRouter, HTTPException

from app.models.schemas import SearchRequest, SearchResponse
from app.services import rag_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/search", tags=["Search"])


@router.post("", response_model=SearchResponse)
async def semantic_search(request: SearchRequest) -> SearchResponse:
    """
    Perform semantic search over the campus knowledge base.

    Embeds the query, searches the vector store, and generates an
    AI-powered answer with source citations.

    Args:
        request: SearchRequest with query, optional filters, language, and limit.

    Returns:
        SearchResponse with results, answer, and suggested follow-up questions.
    """
    logger.info("Search request: query='%s', language=%s, limit=%d",
                request.query, request.language, request.limit)

    try:
        response = await rag_service.search(
            query=request.query,
            filters=request.filters,
            language=request.language,
            limit=request.limit,
        )
        return response

    except Exception as e:
        logger.error("Search endpoint error: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")


@router.get("/suggestions")
async def get_suggestions() -> dict:
    """
    Get suggested search queries for the search interface.

    Returns:
        A dict containing a list of suggested query strings.
    """
    return {
        "suggestions": [
            "What courses are offered in Computer Science?",
            "Where is the library located?",
            "What are the admission requirements?",
            "Tell me about campus facilities",
            "What scholarships are available?",
            "What is the academic calendar?",
            "How do I contact the administration?",
            "What extracurricular activities are available?",
        ]
    }


@router.get("/trending")
async def get_trending() -> dict:
    """
    Get trending search queries.

    Returns:
        A dict containing a list of trending query strings.
    """
    # In a production system, this would be backed by analytics.
    # For now, return static trending topics.
    return {
        "trending": [
            "Exam schedule",
            "Fee structure",
            "Placement statistics",
            "Hostel facilities",
            "Department contacts",
        ]
    }
