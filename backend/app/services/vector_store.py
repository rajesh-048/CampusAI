"""
ChromaDB vector store service.

Manages the persistent ChromaDB collection for storing and retrieving
document embeddings. Provides CRUD operations and semantic search.
"""

import logging
from typing import Optional

import chromadb
from chromadb.config import Settings as ChromaSettings

from app.config import get_settings

logger = logging.getLogger(__name__)

# Module-level singleton instances
_client: Optional[chromadb.ClientAPI] = None
_collection: Optional[chromadb.Collection] = None

COLLECTION_NAME = "campus_knowledge"


def get_client() -> chromadb.ClientAPI:
    """
    Get or create the ChromaDB persistent client.

    Returns:
        A ChromaDB PersistentClient instance.
    """
    global _client
    if _client is None:
        settings = get_settings()
        logger.info("Initializing ChromaDB client at: %s", settings.chroma_persist_dir)
        _client = chromadb.PersistentClient(
            path=settings.chroma_persist_dir,
            settings=ChromaSettings(anonymized_telemetry=False),
        )
        logger.info("ChromaDB client initialized successfully")
    return _client


def get_collection() -> chromadb.Collection:
    """
    Get or create the campus_knowledge collection.

    Returns:
        The ChromaDB Collection instance.
    """
    global _collection
    if _collection is None:
        client = get_client()
        _collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"description": "Campus Knowledge Navigator document embeddings"},
            embedding_function=None,
        )
        logger.info(
            "Collection '%s' ready with %d documents",
            COLLECTION_NAME,
            _collection.count(),
        )
    return _collection


def initialize() -> None:
    """Initialize the vector store on application startup."""
    get_collection()
    logger.info("Vector store initialized")


def add_documents(
    texts: list[str],
    metadatas: list[dict],
    ids: list[str],
    embeddings: list[list[float]],
) -> None:
    """
    Add documents with pre-computed embeddings to the collection.

    Args:
        texts: List of document text chunks.
        metadatas: List of metadata dictionaries for each chunk.
        ids: List of unique IDs for each chunk.
        embeddings: List of embedding vectors for each chunk.

    Raises:
        ValueError: If input list lengths don't match.
    """
    if not (len(texts) == len(metadatas) == len(ids) == len(embeddings)):
        raise ValueError("All input lists must have the same length")

    if not texts:
        logger.warning("add_documents called with empty input")
        return

    collection = get_collection()

    # ChromaDB has a batch size limit; process in batches of 100
    batch_size = 100
    for i in range(0, len(texts), batch_size):
        batch_end = min(i + batch_size, len(texts))
        collection.add(
            documents=texts[i:batch_end],
            metadatas=metadatas[i:batch_end],
            ids=ids[i:batch_end],
            embeddings=embeddings[i:batch_end],
        )

    logger.info("Added %d documents to collection '%s'", len(texts), COLLECTION_NAME)


def search(
    query_embedding: list[float],
    n_results: int = 5,
    filters: Optional[dict] = None,
) -> dict:
    """
    Perform semantic search in the collection.

    Args:
        query_embedding: The query embedding vector.
        n_results: Maximum number of results to return.
        filters: Optional ChromaDB where-clause filters.

    Returns:
        ChromaDB query results dict with keys: ids, documents, metadatas, distances.
    """
    collection = get_collection()
    count = collection.count()

    if count == 0:
        logger.warning("Search called on empty collection")
        return {"ids": [[]], "documents": [[]], "metadatas": [[]], "distances": [[]]}

    # Don't request more results than exist
    n_results = min(n_results, count)

    query_params = {
        "query_embeddings": [query_embedding],
        "n_results": n_results,
        "include": ["documents", "metadatas", "distances"],
    }

    if filters:
        query_params["where"] = filters

    try:
        results = collection.query(**query_params)
        logger.info("Search returned %d results", len(results.get("ids", [[]])[0]))
        return results
    except Exception as e:
        logger.error("Search failed: %s", str(e))
        # If filter causes error, retry without filters
        if filters:
            logger.info("Retrying search without filters")
            query_params.pop("where", None)
            return collection.query(**query_params)
        raise


def delete_documents(ids: list[str]) -> None:
    """
    Delete documents from the collection by their IDs.

    Args:
        ids: List of document chunk IDs to delete.
    """
    if not ids:
        return

    collection = get_collection()
    collection.delete(ids=ids)
    logger.info("Deleted %d documents from collection '%s'", len(ids), COLLECTION_NAME)


def get_documents_by_source(source: str) -> list[str]:
    """
    Get all chunk IDs for a given source document.

    Args:
        source: The source document filename.

    Returns:
        List of chunk IDs belonging to the source document.
    """
    collection = get_collection()
    try:
        results = collection.get(
            where={"source": source},
            include=[],
        )
        return results.get("ids", [])
    except Exception as e:
        logger.error("Failed to get documents by source '%s': %s", source, str(e))
        return []


def get_collection_stats() -> dict:
    """
    Get collection statistics.

    Returns:
        Dictionary with total_chunks, collection_name, and unique source count.
    """
    collection = get_collection()
    count = collection.count()

    # Get unique sources
    unique_sources = set()
    if count > 0:
        try:
            all_meta = collection.get(include=["metadatas"])
            for meta in all_meta.get("metadatas", []):
                if meta and "source" in meta:
                    unique_sources.add(meta["source"])
        except Exception as e:
            logger.warning("Could not retrieve source metadata: %s", str(e))

    return {
        "total_chunks": count,
        "total_documents": len(unique_sources),
        "collection_name": COLLECTION_NAME,
    }
