"""
PageMind — FastAPI Backend
Book Reading & Personal Growth Platform
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .routers import books, reading, goals, journal, ai, analytics

app = FastAPI(
    title="PageMind API",
    description="AI-Powered Book Reading & Personal Growth Platform",
    version="1.0.0"
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(books.router)
app.include_router(reading.router)
app.include_router(goals.router)
app.include_router(journal.router)
app.include_router(ai.router)
app.include_router(analytics.router)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def root():
    return {
        "name": "PageMind API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/api/health")
def health():
    return {"status": "healthy"}
