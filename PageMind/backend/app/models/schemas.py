"""
PageMind — Pydantic Schemas for request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date


# ──────────────────── BOOK SCHEMAS ────────────────────

class BookCreate(BaseModel):
    title: str
    author: str
    cover_url: Optional[str] = None
    genre: Optional[str] = None
    total_pages: int = 0
    status: str = "want_to_read"


class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    cover_url: Optional[str] = None
    genre: Optional[str] = None
    total_pages: Optional[int] = None
    current_page: Optional[int] = None
    status: Optional[str] = None
    rating: Optional[float] = None
    review: Optional[str] = None
    date_started: Optional[date] = None
    date_finished: Optional[date] = None


class BookNoteCreate(BaseModel):
    content: str
    note_type: str = "note"
    page_number: Optional[int] = None
    chapter: Optional[str] = None
    color: str = "#f59e0b"


class BookNoteResponse(BaseModel):
    id: int
    book_id: int
    content: str
    note_type: str
    page_number: Optional[int]
    chapter: Optional[str]
    color: str
    created_at: datetime

    class Config:
        from_attributes = True


class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    cover_url: Optional[str]
    genre: Optional[str]
    total_pages: int
    current_page: int
    status: str
    rating: Optional[float]
    review: Optional[str]
    date_started: Optional[date]
    date_finished: Optional[date]
    created_at: datetime
    notes: List[BookNoteResponse] = []

    class Config:
        from_attributes = True


# ──────────────────── READING SESSION SCHEMAS ────────────────────

class ReadingSessionCreate(BaseModel):
    book_id: int
    start_page: int = 0


class ReadingSessionEnd(BaseModel):
    end_page: int
    duration_minutes: int = 0
    notes: Optional[str] = None
    mood: Optional[str] = None


class ReadingSessionResponse(BaseModel):
    id: int
    book_id: int
    start_page: int
    end_page: int
    pages_read: int
    duration_minutes: int
    notes: Optional[str]
    mood: Optional[str]
    started_at: datetime
    ended_at: Optional[datetime]

    class Config:
        from_attributes = True


# ──────────────────── GOAL SCHEMAS ────────────────────

class GoalCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str = "personal"
    target_value: int = 100
    unit: str = "percent"
    deadline: Optional[date] = None
    icon: str = "target"
    color: str = "#8b5cf6"


class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    target_value: Optional[int] = None
    current_value: Optional[int] = None
    unit: Optional[str] = None
    status: Optional[str] = None
    deadline: Optional[date] = None
    icon: Optional[str] = None
    color: Optional[str] = None


class MilestoneCreate(BaseModel):
    title: str
    order: int = 0


class MilestoneResponse(BaseModel):
    id: int
    goal_id: int
    title: str
    completed: bool
    completed_at: Optional[datetime]
    order: int

    class Config:
        from_attributes = True


class GoalResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: str
    target_value: int
    current_value: int
    unit: str
    status: str
    deadline: Optional[date]
    icon: str
    color: str
    created_at: datetime
    milestones: List[MilestoneResponse] = []

    class Config:
        from_attributes = True


# ──────────────────── JOURNAL SCHEMAS ────────────────────

class JournalCreate(BaseModel):
    title: Optional[str] = None
    content: str
    mood: Optional[str] = None
    tags: List[str] = []
    book_id: Optional[int] = None


class JournalResponse(BaseModel):
    id: int
    title: Optional[str]
    content: str
    mood: Optional[str]
    tags: list
    book_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────── AI SCHEMAS ────────────────────

class AIChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None


class AIChatResponse(BaseModel):
    response: str
    conversation_id: int
    suggestions: List[str] = []


class AIInsight(BaseModel):
    title: str
    content: str
    icon: str
    category: str


class AIRecommendation(BaseModel):
    title: str
    author: str
    genre: str
    reason: str
    cover_url: Optional[str] = None
    match_score: float = 0.0


# ──────────────────── ANALYTICS SCHEMAS ────────────────────

class ReadingStats(BaseModel):
    total_books: int
    books_finished: int
    books_reading: int
    total_pages_read: int
    total_reading_minutes: int
    current_streak: int
    longest_streak: int
    avg_pages_per_day: float
    books_this_month: int
    pages_this_week: int


class GrowthStats(BaseModel):
    total_goals: int
    active_goals: int
    completed_goals: int
    total_journal_entries: int
    journal_this_week: int
    growth_score: float
    top_categories: list


class HeatmapDay(BaseModel):
    date: str
    pages_read: int
    sessions: int
    level: int  # 0-4 intensity
