"""
Pydantic v2 schemas for API request and response models.

Defines all data transfer objects used across the CampusAI API endpoints
for search, chat, and document management operations.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


# ─── Enums ────────────────────────────────────────────────────────────────────


class ProcessingStatusEnum(str, Enum):
    """Document processing status values."""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class SupportedLanguage(str, Enum):
    """Supported languages for queries and responses."""
    ENGLISH = "en"
    TELUGU = "te"
    HINDI = "hi"


# ─── Search Schemas ──────────────────────────────────────────────────────────


class SearchRequest(BaseModel):
    """Request body for semantic search."""
    query: str = Field(..., min_length=1, max_length=1000, description="Search query string")
    filters: Optional[dict] = Field(default=None, description="Optional metadata filters")
    language: str = Field(default="en", description="Response language (en, te, hi)")
    limit: int = Field(default=5, ge=1, le=20, description="Maximum number of results")


class SearchResult(BaseModel):
    """A single search result with metadata and relevance score."""
    content: str = Field(..., description="Retrieved text content")
    source: str = Field(..., description="Source document filename")
    source_type: str = Field(..., description="File type (pdf, docx, etc.)")
    upload_date: str = Field(..., description="Document upload date")
    last_updated: str = Field(..., description="Last update timestamp")
    download_url: Optional[str] = Field(default=None, description="URL to download original document")
    relevance_score: float = Field(..., ge=0.0, le=1.0, description="Relevance score from 0 to 1")


class SearchResponse(BaseModel):
    """Complete search response with results, answer, and suggestions."""
    results: list[SearchResult] = Field(default_factory=list, description="List of search results")
    answer: str = Field(..., description="AI-generated answer based on results")
    suggested_questions: list[str] = Field(
        default_factory=list, description="Suggested follow-up questions"
    )


# ─── Chat Schemas ────────────────────────────────────────────────────────────


class ChatMessage(BaseModel):
    """A single message in a conversation."""
    role: str = Field(..., description="Message role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Request body for the chat endpoint."""
    message: str = Field(..., min_length=1, max_length=2000, description="User message")
    conversation_history: list[ChatMessage] = Field(
        default_factory=list, description="Previous messages in the conversation"
    )
    language: str = Field(default="en", description="Response language (en, te, hi)")


class ChatResponse(BaseModel):
    """Complete chat response with sources and suggestions."""
    response: str = Field(..., description="AI-generated response")
    sources: list[SearchResult] = Field(
        default_factory=list, description="Source documents used for the response"
    )
    suggested_questions: list[str] = Field(
        default_factory=list, description="Suggested follow-up questions"
    )


# ─── Document Schemas ────────────────────────────────────────────────────────


class DocumentUpload(BaseModel):
    """Metadata for a document upload."""
    filename: str = Field(..., description="Original filename")
    file_type: str = Field(..., description="File extension/type")
    category: str = Field(default="general", description="Document category")
    title: str = Field(default="", description="Document title")
    description: str = Field(default="", description="Document description")


class ProcessingStatus(BaseModel):
    """Status of a document processing job."""
    document_id: str = Field(..., description="Unique document identifier")
    status: ProcessingStatusEnum = Field(..., description="Current processing status")
    message: str = Field(default="", description="Status message or error details")
    chunks_created: int = Field(default=0, ge=0, description="Number of text chunks created")


class DocumentStats(BaseModel):
    """Collection statistics for stored documents."""
    total_documents: int = Field(default=0, description="Total number of source documents")
    total_chunks: int = Field(default=0, description="Total number of text chunks")
    collection_name: str = Field(default="", description="ChromaDB collection name")


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = Field(default="healthy", description="Service health status")
    version: str = Field(default="1.0.0", description="API version")
    timestamp: str = Field(
        default_factory=lambda: datetime.utcnow().isoformat(),
        description="Current server timestamp",
    )
