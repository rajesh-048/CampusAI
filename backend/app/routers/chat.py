"""
Chat router with streaming SSE support.

Provides endpoints for conversational AI interaction with the campus
knowledge base, including streaming responses and conversation management.
"""

import json
import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.models.schemas import ChatRequest, ChatResponse
from app.services import rag_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["Chat"])


@router.post("")
async def chat(request: ChatRequest):
    """
    Chat endpoint with streaming SSE response.

    Accepts a user message and conversation history, performs RAG retrieval,
    and streams the LLM response as Server-Sent Events. The final event
    includes source citations and suggested follow-up questions.

    SSE Event Format:
        - Content chunks: `data: {"type": "content", "content": "..."}`
        - Final metadata:  `data: {"type": "done", "sources": [...], "suggested_questions": [...]}`
        - Errors:          `data: {"type": "error", "content": "..."}`

    Args:
        request: ChatRequest with message, conversation_history, and language.

    Returns:
        A StreamingResponse with text/event-stream content type.
    """
    logger.info("Chat request: message='%s', history_length=%d, language=%s",
                request.message, len(request.conversation_history), request.language)

    try:
        # Convert Pydantic models to dicts for the service layer
        history = [msg.model_dump() for msg in request.conversation_history]

        return StreamingResponse(
            rag_service.chat_stream(
                message=request.message,
                conversation_history=history,
                language=request.language,
            ),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    except Exception as e:
        logger.error("Chat endpoint error: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")


@router.post("/sync", response_model=ChatResponse)
async def chat_sync(request: ChatRequest) -> ChatResponse:
    """
    Synchronous (non-streaming) chat endpoint.

    Returns the complete response at once, useful for clients that
    don't support SSE streaming.

    Args:
        request: ChatRequest with message, conversation_history, and language.

    Returns:
        ChatResponse with the full AI response, sources, and suggestions.
    """
    logger.info("Sync chat request: message='%s'", request.message)

    try:
        history = [msg.model_dump() for msg in request.conversation_history]

        response = await rag_service.chat(
            message=request.message,
            conversation_history=history,
            language=request.language,
        )
        return response

    except Exception as e:
        logger.error("Sync chat endpoint error: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")


@router.post("/clear")
async def clear_conversation() -> dict:
    """
    Clear the current conversation.

    In a stateless API, conversation history is managed client-side.
    This endpoint signals the client to reset its stored history.

    Returns:
        A confirmation message.
    """
    return {
        "status": "success",
        "message": "Conversation cleared. Start a new conversation.",
    }


@router.get("/suggestions")
async def get_chat_suggestions() -> dict:
    """
    Get suggested chat prompts for the chat interface.

    Returns:
        A dict containing a list of suggested chat prompt strings.
    """
    return {
        "suggestions": [
            "Tell me about the campus facilities",
            "What programs does the university offer?",
            "How can I apply for admission?",
            "What are the library timings?",
            "Explain the fee structure",
            "What placement opportunities are available?",
        ]
    }
