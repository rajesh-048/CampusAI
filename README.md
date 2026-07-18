# 🎓 CampusAI — AI Campus Knowledge Navigator

> A production-ready, AI-powered campus information platform that centralizes all official campus data into one intelligent system with semantic search and conversational AI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139-009688?logo=fastapi)
![ChromaDB](https://img.shields.io/badge/ChromaDB-1.5-orange)
![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

- **🔍 AI Semantic Search** — Find any campus information instantly using natural language
- **🤖 AI Chatbot** — Conversational assistant powered by Gemini 2.0 Flash + RAG
- **📚 Knowledge Hub** — Centralized repository for timetables, notices, faculty, events, and more
- **🔐 Role-Based Auth** — Separate Student and Admin dashboards with JWT authentication
- **📄 Document Processing** — Upload PDFs, Word docs, Excel, PowerPoint, images with OCR
- **🌐 Multilingual** — Supports English, Telugu, Hindi
- **🎨 Premium UI** — Dark mode glassmorphism design with Framer Motion animations

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│  Next.js 16 Frontend (localhost:3000)         │
│  TypeScript · Tailwind CSS · shadcn/ui        │
│  Framer Motion · Prisma ORM → SQLite          │
└───────────────────┬──────────────────────────┘
                    │ REST API
┌───────────────────▼──────────────────────────┐
│  FastAPI AI Microservice (localhost:8000)      │
│  Python 3.13 · ChromaDB · Sentence Transformers│
│  LangChain · Google Gemini 2.0 Flash (RAG)    │
│  EasyOCR · pypdf · python-docx                │
└──────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+ (Anaconda recommended)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/rajesh-048/CampusAI.git
cd CampusAI
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
cp .env.example .env.local
# Edit .env.local with your settings
npm run dev
```

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
python run.py
```

### 4. Get a Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a free API key
3. Add it to `backend/.env`: `GEMINI_API_KEY=your-key-here`
4. Restart the backend

---

## 🔑 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@campusai.com` | `admin123` |
| **Student** | `student@campusai.com` | `student123` |

---

## 📁 Project Structure

```
CampusAI/
├── frontend/                    # Next.js 16 App
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── student/         # Student dashboard
│   │   │   ├── admin/           # Admin dashboard
│   │   │   └── api/             # API routes (auth, data)
│   │   ├── components/          # Reusable UI components
│   │   └── lib/                 # Utilities & helpers
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Demo data seeder
│   └── package.json
│
├── backend/                     # FastAPI AI Microservice
│   ├── app/
│   │   ├── main.py              # FastAPI app entry
│   │   ├── config.py            # Settings management
│   │   ├── routers/             # API route handlers
│   │   │   ├── search.py        # Semantic search
│   │   │   ├── chat.py          # AI chat (SSE streaming)
│   │   │   └── documents.py     # Document upload/processing
│   │   └── services/
│   │       ├── rag_service.py   # RAG orchestration
│   │       ├── embedding_service.py  # Sentence Transformers
│   │       ├── vector_store.py  # ChromaDB operations
│   │       ├── llm_service.py   # Gemini LLM integration
│   │       └── document_processor.py  # PDF/DOCX/OCR
│   ├── requirements.txt
│   └── run.py                   # Server entry point
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2 | React framework with App Router |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| shadcn/ui | Latest | Premium UI components |
| Framer Motion | 12 | Animations |
| Prisma | 6 | ORM with SQLite |
| jose | Latest | JWT authentication |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| FastAPI | 0.139 | High-performance API framework |
| ChromaDB | 1.5 | Vector database for embeddings |
| Sentence Transformers | 5.6 | Text embeddings (all-MiniLM-L6-v2) |
| LangChain | 1.4 | RAG pipeline orchestration |
| Google Gemini | 2.0 Flash | LLM for AI answers |
| EasyOCR | 1.7 | Image text extraction |
| pypdf | 6 | PDF processing |

---

## 📸 Screenshots

### Landing Page
Premium dark-mode landing page with glassmorphism design

### Student Dashboard
- Timetable viewer
- Exam schedule
- AI Search with semantic understanding
- AI Chatbot
- Notices, Events, Faculty directory

### Admin Dashboard
- Content management
- Document upload & processing
- Knowledge base management
- Analytics

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**RAJESH_08** — [@rajesh-048](https://github.com/rajesh-048)

Built with ❤️ using Next.js, FastAPI, and Google Gemini AI
