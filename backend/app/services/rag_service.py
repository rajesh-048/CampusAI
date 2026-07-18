"""
RAG (Retrieval-Augmented Generation) orchestration service.

Coordinates the embedding, retrieval, and generation pipeline for
both search and chat endpoints. This is the primary business logic
layer that ties all services together.
"""

import logging
from typing import Optional

from app.services import embedding_service, vector_store, llm_service
from app.models.schemas import SearchResult, SearchResponse, ChatResponse

logger = logging.getLogger(__name__)


def _build_context_from_results(results: dict) -> tuple[str, list[SearchResult]]:
    """
    Build a context string and SearchResult list from ChromaDB query results.

    Args:
        results: ChromaDB query results dict.

    Returns:
        A tuple of (context_string, list_of_SearchResult).
    """
    context_parts = []
    search_results = []

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    for i, (doc, meta, dist) in enumerate(zip(documents, metadatas, distances)):
        if not doc:
            continue

        source = meta.get("source", "Unknown")
        source_type = meta.get("source_type", "unknown")

        # ChromaDB returns L2 distances; convert to a 0–1 similarity score.
        # L2 distance of 0 = perfect match. We cap the transform at 0.
        relevance_score = max(0.0, 1.0 - (dist / 2.0))
        relevance_score = round(min(1.0, relevance_score), 4)

        # Build context block for the LLM
        context_parts.append(
            f"[Source: {source}]\n{doc}"
        )

        search_results.append(SearchResult(
            content=doc,
            source=source,
            source_type=source_type,
            upload_date=meta.get("upload_date", ""),
            last_updated=meta.get("last_updated", ""),
            download_url=None,
            relevance_score=relevance_score,
        ))

    context = "\n\n---\n\n".join(context_parts) if context_parts else ""
    return context, search_results


async def search(
    query: str,
    filters: Optional[dict] = None,
    language: str = "en",
    limit: int = 5,
) -> SearchResponse:
    """
    Perform RAG-based semantic search.

    Pipeline:
        1. Embed the query
        2. Search the vector store
        3. Build context from results
        4. Generate an answer with the LLM
        5. Generate suggested follow-up questions

    Args:
        query: The user's search query.
        filters: Optional metadata filters for ChromaDB.
        language: Target response language code.
        limit: Maximum number of results to return.

    Returns:
        A SearchResponse with results, AI answer, and suggestions.
    """
    try:
        # 1. Embed the query
        query_embedding = embedding_service.embed_text(query)

        # 2. Search vector store
        raw_results = vector_store.search(
            query_embedding=query_embedding,
            n_results=limit,
            filters=filters,
        )

        # 3. Build context and search results
        context, search_results = _build_context_from_results(raw_results)

        # 4. Generate AI answer
        if context:
            answer = llm_service.generate_response(
                query=query,
                context=context,
                language=language,
            )
        else:
            answer = (
                "I couldn't find any relevant documents matching your query. "
                "Try uploading relevant documents or rephrasing your search."
            )

        # 5. Generate suggested follow-up questions
        suggested_questions = llm_service.generate_suggested_questions(
            query=query,
            context=context,
            language=language,
        )

        return SearchResponse(
            results=search_results,
            answer=answer,
            suggested_questions=suggested_questions,
        )

    except Exception as e:
        logger.error("Search failed: %s", str(e))
        return SearchResponse(
            results=[],
            answer=f"An error occurred while searching: {str(e)}",
            suggested_questions=[],
        )


async def chat(
    message: str,
    conversation_history: Optional[list[dict]] = None,
    language: str = "en",
) -> ChatResponse:
    """
    Handle a chat message with RAG context.

    Pipeline:
        1. Embed the user message
        2. Search vector store for relevant context
        3. Generate response with conversation history
        4. Return with sources and suggestions

    Args:
        message: The user's chat message.
        conversation_history: List of prior messages (role/content dicts).
        language: Target response language code.

    Returns:
        A ChatResponse with the AI response, sources, and suggestions.
    """
    conversation_history = conversation_history or []

    try:
        # 1. Embed the user message
        query_embedding = embedding_service.embed_text(message)

        # 2. Search for relevant context
        raw_results = vector_store.search(
            query_embedding=query_embedding,
            n_results=5,
        )

        # 3. Build context
        context, search_results = _build_context_from_results(raw_results)

        # 4. Generate response with conversation history
        response = llm_service.generate_response(
            query=message,
            context=context,
            conversation_history=conversation_history,
            language=language,
        )

        # 5. Generate suggested follow-up questions
        suggested_questions = llm_service.generate_suggested_questions(
            query=message,
            context=context,
            language=language,
        )

        return ChatResponse(
            response=response,
            sources=search_results,
            suggested_questions=suggested_questions,
        )

    except Exception as e:
        logger.error("Chat failed: %s", str(e))
        return ChatResponse(
            response=f"I encountered an error while processing your message: {str(e)}",
            sources=[],
            suggested_questions=[],
        )


async def chat_stream(
    message: str,
    conversation_history: Optional[list[dict]] = None,
    language: str = "en",
):
    """
    Handle a chat message with streaming RAG response.

    Yields SSE-formatted chunks for real-time streaming to the client.
    After the response stream completes, yields sources and suggestions
    as a final JSON event.

    Args:
        message: The user's chat message.
        conversation_history: List of prior messages.
        language: Target response language code.

    Yields:
        SSE-formatted strings: "data: <chunk>\\n\\n" for content,
        and a final JSON event with sources and suggestions.
    """
    import json

    conversation_history = conversation_history or []

    try:
        # 1. Embed and search
        query_embedding = embedding_service.embed_text(message)
        raw_results = vector_store.search(
            query_embedding=query_embedding,
            n_results=5,
        )

        context, search_results = _build_context_from_results(raw_results)

        # 2. Stream the LLM response
        full_response = ""
        async for chunk in llm_service.generate_streaming_response(
            query=message,
            context=context,
            conversation_history=conversation_history,
            language=language,
        ):
            full_response += chunk
            yield f"data: {json.dumps({'type': 'content', 'content': chunk})}\n\n"

        # 3. Generate suggestions (non-streaming)
        suggested_questions = llm_service.generate_suggested_questions(
            query=message,
            context=context,
            language=language,
        )

        # 4. Send final metadata event
        sources_data = [sr.model_dump() for sr in search_results]
        final_event = {
            "type": "done",
            "sources": sources_data,
            "suggested_questions": suggested_questions,
        }
        yield f"data: {json.dumps(final_event)}\n\n"

    except Exception as e:
        logger.error("Chat stream failed: %s", str(e))
        error_event = {"type": "error", "content": str(e)}
        yield f"data: {json.dumps(error_event)}\n\n"
