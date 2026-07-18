"""
Sentence Transformer embedding service.

Provides text embedding functionality using the all-MiniLM-L6-v2 model
with lazy loading to minimize startup time.
"""

import logging
from typing import Optional

from app.config import get_settings

logger = logging.getLogger(__name__)

# Module-level singleton for the embedding model
_model: Optional[object] = None


def _get_model():
    """
    Lazy-load the SentenceTransformer model.

    Returns:
        A SentenceTransformer model instance.
    """
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer

        settings = get_settings()
        model_name = settings.embedding_model
        logger.info("Loading embedding model: %s", model_name)
        _model = SentenceTransformer(model_name)
        logger.info("Embedding model loaded successfully")
    return _model


def embed_text(text: str) -> list[float]:
    """
    Generate an embedding vector for a single text string.

    Args:
        text: The input text to embed.

    Returns:
        A list of floats representing the embedding vector.

    Raises:
        ValueError: If the input text is empty.
    """
    if not text or not text.strip():
        raise ValueError("Cannot embed empty text")

    model = _get_model()
    embedding = model.encode(text, show_progress_bar=False)
    return embedding.tolist()


def embed_batch(texts: list[str]) -> list[list[float]]:
    """
    Generate embedding vectors for a batch of texts.

    More efficient than calling embed_text() in a loop because the model
    processes all texts in a single forward pass.

    Args:
        texts: List of text strings to embed.

    Returns:
        A list of embedding vectors (each a list of floats).

    Raises:
        ValueError: If the input list is empty.
    """
    if not texts:
        raise ValueError("Cannot embed empty text list")

    # Filter out empty strings but keep track of indices
    valid_pairs = [(i, t) for i, t in enumerate(texts) if t and t.strip()]
    if not valid_pairs:
        raise ValueError("All texts in batch are empty")

    model = _get_model()
    valid_texts = [t for _, t in valid_pairs]

    logger.info("Embedding batch of %d texts", len(valid_texts))
    embeddings = model.encode(valid_texts, show_progress_bar=False, batch_size=32)

    # Reconstruct full list with zero vectors for empty texts
    dim = len(embeddings[0])
    result = [[0.0] * dim] * len(texts)
    for idx, (original_idx, _) in enumerate(valid_pairs):
        result[original_idx] = embeddings[idx].tolist()

    return result


def get_embedding_dimension() -> int:
    """
    Get the dimensionality of the embedding vectors.

    Returns:
        The number of dimensions in the embedding space (e.g., 384 for MiniLM).
    """
    model = _get_model()
    return model.get_sentence_embedding_dimension()
