"""
Gemini LLM service via LangChain.

Provides synchronous and streaming response generation using Google's
Gemini model through the langchain-google-genai integration.
"""

import logging
from typing import AsyncGenerator, Optional

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

from app.config import get_settings

logger = logging.getLogger(__name__)

# Module-level singleton
_llm: Optional[ChatGoogleGenerativeAI] = None

# System prompt for the campus knowledge assistant
SYSTEM_PROMPT = """You are CampusAI, an intelligent campus knowledge assistant. Your role is to help students, faculty, and staff find accurate information about their campus.

## Core Rules:
1. **Only answer from the provided context.** If the context does not contain the answer, say "I don't have enough information to answer that based on the available documents."
2. **Always cite your sources.** When referencing information, mention the source document name.
3. **Never hallucinate or make up information.** Stick strictly to the provided context.
4. **Provide structured, clear responses.** Use bullet points, numbered lists, or headers when appropriate.
5. **Be multilingual.** Respond in the same language the user asks in:
   - English (en): Default language
   - Telugu (te): Respond in Telugu when asked in Telugu
   - Hindi (hi): Respond in Hindi when asked in Hindi

## Response Format:
- Start with a direct answer to the question
- Provide supporting details from the context
- Cite the source document(s) used
- Keep responses concise but comprehensive

## Context:
{context}
"""


def _get_llm() -> ChatGoogleGenerativeAI:
    """
    Get or create the Gemini LLM instance.

    Returns:
        A ChatGoogleGenerativeAI instance configured with project settings.

    Raises:
        ValueError: If the Gemini API key is not configured.
    """
    global _llm
    if _llm is None:
        settings = get_settings()
        if not settings.gemini_api_key or settings.gemini_api_key == "your-gemini-api-key-here":
            raise ValueError(
                "Gemini API key is not configured. "
                "Set GEMINI_API_KEY in your .env file."
            )

        logger.info("Initializing Gemini LLM: %s", settings.llm_model)
        _llm = ChatGoogleGenerativeAI(
            model=settings.llm_model,
            google_api_key=settings.gemini_api_key,
            temperature=0.3,
            max_output_tokens=2048,
            convert_system_message_to_human=True,
        )
        logger.info("Gemini LLM initialized successfully")
    return _llm


def _build_messages(
    query: str,
    context: str,
    conversation_history: Optional[list[dict]] = None,
    language: str = "en",
) -> list:
    """
    Build the message list for the LLM call.

    Args:
        query: The user's query.
        context: Retrieved context from the vector store.
        conversation_history: Optional list of prior messages.
        language: Target response language.

    Returns:
        A list of LangChain message objects.
    """
    # Build system message with context
    system_content = SYSTEM_PROMPT.format(context=context if context else "No relevant documents found.")

    # Add language instruction
    lang_instructions = {
        "te": "\n\nIMPORTANT: Respond in Telugu (తెలుగు).",
        "hi": "\n\nIMPORTANT: Respond in Hindi (हिंदी).",
    }
    if language in lang_instructions:
        system_content += lang_instructions[language]

    messages = [SystemMessage(content=system_content)]

    # Add conversation history
    if conversation_history:
        for msg in conversation_history[-10:]:  # Keep last 10 messages for context window
            role = msg.get("role", "user") if isinstance(msg, dict) else msg.role
            content = msg.get("content", "") if isinstance(msg, dict) else msg.content
            if role == "user":
                messages.append(HumanMessage(content=content))
            elif role == "assistant":
                messages.append(AIMessage(content=content))

    # Add current query
    messages.append(HumanMessage(content=query))

    return messages


def generate_response(
    query: str,
    context: str,
    conversation_history: Optional[list[dict]] = None,
    language: str = "en",
) -> str:
    """
    Generate a response from the Gemini LLM.

    Args:
        query: The user's query.
        context: Retrieved context from the vector store.
        conversation_history: Optional list of prior chat messages.
        language: Target response language code.

    Returns:
        The generated response text.
    """
    try:
        llm = _get_llm()
        messages = _build_messages(query, context, conversation_history, language)

        response = llm.invoke(messages)
        return response.content

    except Exception as e:
        logger.error("LLM generation failed: %s", str(e))
        raise RuntimeError(f"Failed to generate response: {e}") from e


async def generate_streaming_response(
    query: str,
    context: str,
    conversation_history: Optional[list[dict]] = None,
    language: str = "en",
) -> AsyncGenerator[str, None]:
    """
    Generate a streaming response from the Gemini LLM.

    Yields response tokens as they are generated, suitable for
    Server-Sent Events (SSE) streaming.

    Args:
        query: The user's query.
        context: Retrieved context from the vector store.
        conversation_history: Optional list of prior chat messages.
        language: Target response language code.

    Yields:
        Response text chunks as they are generated.
    """
    try:
        llm = _get_llm()
        messages = _build_messages(query, context, conversation_history, language)

        async for chunk in llm.astream(messages):
            if chunk.content:
                yield chunk.content

    except Exception as e:
        logger.error("Streaming LLM generation failed: %s", str(e))
        yield f"\n\n[Error: {str(e)}]"


def generate_suggested_questions(
    query: str,
    context: str,
    language: str = "en",
) -> list[str]:
    """
    Generate suggested follow-up questions based on the query and context.

    Args:
        query: The original user query.
        context: The retrieved context.
        language: Target language code.

    Returns:
        A list of 3 suggested follow-up questions.
    """
    try:
        llm = _get_llm()

        lang_name = {"en": "English", "te": "Telugu", "hi": "Hindi"}.get(language, "English")

        prompt = (
            f"Based on this query: '{query}' and the available context about campus information, "
            f"generate exactly 3 brief follow-up questions that a user might ask next. "
            f"Respond in {lang_name}. "
            f"Return ONLY the 3 questions, one per line, without numbering or bullet points."
        )

        response = llm.invoke([HumanMessage(content=prompt)])
        questions = [q.strip() for q in response.content.strip().split("\n") if q.strip()]

        return questions[:3]

    except Exception as e:
        logger.warning("Failed to generate suggestions: %s", str(e))
        return [
            "What programs are offered on campus?",
            "Where can I find the academic calendar?",
            "What student services are available?",
        ]
