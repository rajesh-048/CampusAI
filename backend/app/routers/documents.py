"""
Document management router.

Provides endpoints for uploading, processing, deleting, and monitoring
documents in the campus knowledge base.
"""

import os
import uuid
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.models.schemas import ProcessingStatus, ProcessingStatusEnum, DocumentStats
from app.services import document_processor, vector_store

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/documents", tags=["Documents"])

# In-memory processing status tracker
# In production, this would be backed by a database or Redis
_processing_status: dict[str, dict] = {}


@router.post("/upload", response_model=ProcessingStatus)
async def upload_document(
    file: UploadFile = File(...),
    category: str = Form(default="general"),
    title: str = Form(default=""),
    description: str = Form(default=""),
) -> ProcessingStatus:
    """
    Upload and process a document for the knowledge base.

    Accepts a file upload along with optional metadata. The document is
    saved to the uploads directory, then processed (text extraction,
    chunking, embedding, and storage in the vector store).

    Supported file types: PDF, DOCX, PPTX, XLSX, CSV, PNG, JPG, etc.

    Args:
        file: The uploaded file.
        category: Document category (e.g., 'academic', 'administrative').
        title: Optional document title.
        description: Optional document description.

    Returns:
        ProcessingStatus with the document ID, status, and chunk count.
    """
    settings = get_settings()
    document_id = str(uuid.uuid4())

    # Validate file
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    # Check file extension
    ext = os.path.splitext(file.filename)[1].lower()
    try:
        document_processor.detect_file_type(file.filename)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {ext}. Supported: "
                   f"{', '.join(document_processor.SUPPORTED_EXTENSIONS.keys())}",
        )

    # Update status to processing
    _processing_status[document_id] = {
        "document_id": document_id,
        "status": ProcessingStatusEnum.PROCESSING,
        "message": "Processing document...",
        "chunks_created": 0,
    }

    try:
        # Ensure upload directory exists
        os.makedirs(settings.upload_dir, exist_ok=True)

        # Save file to disk
        file_path = os.path.join(settings.upload_dir, f"{document_id}_{file.filename}")
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        logger.info("File saved: %s (%d bytes)", file_path, len(contents))

        # Process the document
        metadata = {
            "document_id": document_id,
            "category": category,
            "title": title or file.filename,
            "description": description,
            "original_filename": file.filename,
        }

        result = document_processor.process_document(
            file_path=file_path,
            metadata=metadata,
        )

        # Update status
        status = ProcessingStatusEnum.COMPLETED if result["status"] == "completed" else ProcessingStatusEnum.FAILED
        _processing_status[document_id] = {
            "document_id": document_id,
            "status": status,
            "message": result["message"],
            "chunks_created": result["chunks_created"],
        }

        return ProcessingStatus(
            document_id=document_id,
            status=status,
            message=result["message"],
            chunks_created=result["chunks_created"],
        )

    except Exception as e:
        logger.error("Document upload failed: %s", str(e))
        _processing_status[document_id] = {
            "document_id": document_id,
            "status": ProcessingStatusEnum.FAILED,
            "message": str(e),
            "chunks_created": 0,
        }
        raise HTTPException(status_code=500, detail=f"Document processing failed: {str(e)}")


@router.get("/status/{doc_id}", response_model=ProcessingStatus)
async def get_processing_status(doc_id: str) -> ProcessingStatus:
    """
    Get the processing status of a document.

    Args:
        doc_id: The document ID returned from the upload endpoint.

    Returns:
        ProcessingStatus with current status information.
    """
    status = _processing_status.get(doc_id)
    if status is None:
        raise HTTPException(status_code=404, detail=f"Document not found: {doc_id}")

    return ProcessingStatus(**status)


@router.delete("/{doc_id}")
async def delete_document(doc_id: str) -> dict:
    """
    Delete a document and all its embeddings from the knowledge base.

    Removes the document chunks from ChromaDB and deletes the uploaded
    file from disk.

    Args:
        doc_id: The document ID to delete.

    Returns:
        A confirmation message.
    """
    try:
        # Get all chunk IDs for this document
        collection = vector_store.get_collection()
        results = collection.get(
            where={"document_id": doc_id},
            include=["metadatas"],
        )

        chunk_ids = results.get("ids", [])

        if not chunk_ids:
            raise HTTPException(
                status_code=404,
                detail=f"No document found with ID: {doc_id}",
            )

        # Delete from vector store
        vector_store.delete_documents(chunk_ids)

        # Try to delete the uploaded file
        settings = get_settings()
        try:
            for fname in os.listdir(settings.upload_dir):
                if fname.startswith(doc_id):
                    file_path = os.path.join(settings.upload_dir, fname)
                    os.remove(file_path)
                    logger.info("Deleted file: %s", file_path)
        except OSError as e:
            logger.warning("Could not delete uploaded file: %s", str(e))

        # Remove from status tracker
        _processing_status.pop(doc_id, None)

        logger.info("Document %s deleted (%d chunks removed)", doc_id, len(chunk_ids))

        return {
            "status": "success",
            "message": f"Document deleted successfully. {len(chunk_ids)} chunks removed.",
            "document_id": doc_id,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Document deletion failed: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")


@router.get("/stats", response_model=DocumentStats)
async def get_document_stats() -> DocumentStats:
    """
    Get collection statistics for stored documents.

    Returns:
        DocumentStats with total documents, chunks, and collection name.
    """
    try:
        stats = vector_store.get_collection_stats()
        return DocumentStats(
            total_documents=stats["total_documents"],
            total_chunks=stats["total_chunks"],
            collection_name=stats["collection_name"],
        )
    except Exception as e:
        logger.error("Failed to get stats: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Failed to retrieve stats: {str(e)}")


@router.get("/list")
async def list_documents() -> dict:
    """
    List all documents in the knowledge base with their metadata.

    Returns:
        A dict containing a list of document summaries.
    """
    try:
        collection = vector_store.get_collection()
        count = collection.count()

        if count == 0:
            return {"documents": [], "total": 0}

        # Get all unique documents by source
        all_data = collection.get(include=["metadatas"])
        documents_map: dict[str, dict] = {}

        for meta in all_data.get("metadatas", []):
            if not meta:
                continue
            doc_id = meta.get("document_id", "")
            if doc_id and doc_id not in documents_map:
                documents_map[doc_id] = {
                    "document_id": doc_id,
                    "source": meta.get("source", ""),
                    "source_type": meta.get("source_type", ""),
                    "category": meta.get("category", "general"),
                    "title": meta.get("title", ""),
                    "description": meta.get("description", ""),
                    "upload_date": meta.get("upload_date", ""),
                    "total_chunks": meta.get("total_chunks", 0),
                }

        documents = list(documents_map.values())

        return {"documents": documents, "total": len(documents)}

    except Exception as e:
        logger.error("Failed to list documents: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Failed to list documents: {str(e)}")
