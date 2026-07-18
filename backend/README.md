# CampusAI Backend

AI-powered campus knowledge navigator backend built with FastAPI, LangChain, ChromaDB, and Google Gemini.

## Features

- **Semantic Search** — RAG-based search over campus documents with AI-generated answers
- **Conversational AI** — Chat interface with streaming SSE responses and conversation history
- **Document Processing** — Upload and process PDF, DOCX, PPTX, Excel, CSV, and images
- **OCR Support** — Extract text from images using EasyOCR (English, Telugu, Hindi)
- **Multilingual** — Supports English, Telugu, and Hindi queries and responses

## Tech Stack

| Component | Technology |
|-----------|------------|
| API Framework | FastAPI + Uvicorn |
| LLM | Google Gemini 2.0 Flash (via LangChain) |
| Embeddings | Sentence Transformers (all-MiniLM-L6-v2) |
| Vector Store | ChromaDB (persistent) |
| OCR | EasyOCR |
| Document Parsing | pypdf, python-docx, python-pptx, pandas |

## Setup

### 1. Create a virtual environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

**Required:** Set your `GEMINI_API_KEY` in the `.env` file.

### 4. Run the server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Basic health check |
| GET | `/health` | Detailed health with component status |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/search` | Semantic search with AI answer |
| GET | `/api/search/suggestions` | Get suggested queries |
| GET | `/api/search/trending` | Get trending searches |

### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Streaming chat (SSE) |
| POST | `/api/chat/sync` | Non-streaming chat |
| POST | `/api/chat/clear` | Clear conversation |
| GET | `/api/chat/suggestions` | Get suggested prompts |

### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/documents/upload` | Upload and process document |
| GET | `/api/documents/status/{id}` | Get processing status |
| DELETE | `/api/documents/{id}` | Delete document and embeddings |
| GET | `/api/documents/stats` | Collection statistics |
| GET | `/api/documents/list` | List all documents |

## API Documentation

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py             # Settings & environment config
│   ├── routers/
│   │   ├── search.py         # Search endpoints
│   │   ├── chat.py           # Chat endpoints (SSE streaming)
│   │   └── documents.py      # Document upload/management
│   ├── services/
│   │   ├── rag_service.py    # RAG orchestration
│   │   ├── embedding_service.py  # Sentence Transformer embeddings
│   │   ├── document_processor.py # Multi-format text extraction
│   │   ├── vector_store.py   # ChromaDB operations
│   │   └── llm_service.py    # Gemini LLM integration
│   ├── models/
│   │   └── schemas.py        # Pydantic v2 schemas
│   └── utils/
│       ├── ocr.py            # EasyOCR utilities
│       └── text_processing.py # Text chunking & cleaning
├── chroma_data/              # ChromaDB persistent storage
├── uploads/                  # Uploaded document storage
├── requirements.txt
├── .env                      # Environment configuration
└── README.md
```

## License

MIT
