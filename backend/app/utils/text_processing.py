"""
Text processing utilities for the CampusAI backend.

Provides functions for splitting text into chunks, cleaning text content,
and performing basic language detection.
"""

import re
import logging
from langchain_text_splitters import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)


def chunk_text(
    text: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> list[str]:
    """
    Split text into overlapping chunks using LangChain's RecursiveCharacterTextSplitter.

    Args:
        text: The input text to split.
        chunk_size: Maximum number of characters per chunk.
        chunk_overlap: Number of overlapping characters between consecutive chunks.

    Returns:
        A list of text chunks.
    """
    if not text or not text.strip():
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    chunks = splitter.split_text(text)
    logger.info("Split text into %d chunks (size=%d, overlap=%d)", len(chunks), chunk_size, chunk_overlap)
    return chunks


def clean_text(text: str) -> str:
    """
    Clean text by removing excessive whitespace and special characters.

    Args:
        text: Raw text to clean.

    Returns:
        Cleaned text string.
    """
    if not text:
        return ""

    # Replace multiple whitespace (including tabs, newlines) with a single space
    text = re.sub(r"\s+", " ", text)

    # Remove control characters except newlines
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)

    # Remove excessive special characters (more than 3 consecutive)
    text = re.sub(r"([^\w\s])\1{3,}", r"\1\1\1", text)

    # Normalize unicode whitespace
    text = text.replace("\u00a0", " ")  # non-breaking space
    text = text.replace("\u200b", "")   # zero-width space

    return text.strip()


def detect_language(text: str) -> str:
    """
    Perform basic language detection based on Unicode character ranges.

    Detects Telugu, Hindi/Devanagari, and defaults to English.
    This is a lightweight heuristic — not a full NLP language detector.

    Args:
        text: Input text to analyze.

    Returns:
        Language code: "te" (Telugu), "hi" (Hindi), or "en" (English).
    """
    if not text:
        return "en"

    # Count characters in different script ranges
    telugu_count = len(re.findall(r"[\u0C00-\u0C7F]", text))
    devanagari_count = len(re.findall(r"[\u0900-\u097F]", text))
    total_alpha = len(re.findall(r"\w", text))

    if total_alpha == 0:
        return "en"

    telugu_ratio = telugu_count / total_alpha
    devanagari_ratio = devanagari_count / total_alpha

    if telugu_ratio > 0.3:
        return "te"
    elif devanagari_ratio > 0.3:
        return "hi"

    return "en"
