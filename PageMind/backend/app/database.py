"""
PageMind Database Setup — SQLAlchemy + SQLite
All models for the Book Reading & Personal Growth platform.
"""
import os
from datetime import datetime, date
from sqlalchemy import (
    create_engine, Column, Integer, String, Text, Float, Boolean,
    DateTime, Date, ForeignKey, JSON, Enum as SAEnum
)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./pagemind.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ──────────────────────────── MODELS ────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="Reader")
    email = Column(String(255), unique=True, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    daily_page_goal = Column(Integer, default=30)
    preferred_genres = Column(JSON, default=list)
    coaching_style = Column(String(50), default="encouraging")
    theme = Column(String(20), default="dark")
    created_at = Column(DateTime, default=datetime.utcnow)

    books = relationship("Book", back_populates="user", cascade="all, delete-orphan")
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    journal_entries = relationship("JournalEntry", back_populates="user", cascade="all, delete-orphan")
    ai_conversations = relationship("AIConversation", back_populates="user", cascade="all, delete-orphan")


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), default=1)
    title = Column(String(300), nullable=False)
    author = Column(String(200), nullable=False)
    cover_url = Column(String(500), nullable=True)
    genre = Column(String(100), nullable=True)
    total_pages = Column(Integer, default=0)
    current_page = Column(Integer, default=0)
    status = Column(String(20), default="want_to_read")  # want_to_read, reading, finished
    rating = Column(Float, nullable=True)
    review = Column(Text, nullable=True)
    date_started = Column(Date, nullable=True)
    date_finished = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="books")
    notes = relationship("BookNote", back_populates="book", cascade="all, delete-orphan")
    reading_sessions = relationship("ReadingSession", back_populates="book", cascade="all, delete-orphan")
    goal_links = relationship("GoalBook", back_populates="book", cascade="all, delete-orphan")


class BookNote(Base):
    __tablename__ = "book_notes"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    content = Column(Text, nullable=False)
    note_type = Column(String(20), default="note")  # note, highlight, takeaway
    page_number = Column(Integer, nullable=True)
    chapter = Column(String(200), nullable=True)
    color = Column(String(20), default="#f59e0b")
    created_at = Column(DateTime, default=datetime.utcnow)

    book = relationship("Book", back_populates="notes")


class ReadingSession(Base):
    __tablename__ = "reading_sessions"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), default=1)
    start_page = Column(Integer, default=0)
    end_page = Column(Integer, default=0)
    pages_read = Column(Integer, default=0)
    duration_minutes = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    mood = Column(String(20), nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)

    book = relationship("Book", back_populates="reading_sessions")


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), default=1)
    title = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(50), default="personal")  # career, health, relationships, mindset, skills, creativity
    target_value = Column(Integer, default=100)
    current_value = Column(Integer, default=0)
    unit = Column(String(50), default="percent")
    status = Column(String(20), default="active")  # active, completed, paused
    deadline = Column(Date, nullable=True)
    icon = Column(String(50), default="target")
    color = Column(String(20), default="#8b5cf6")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="goals")
    milestones = relationship("GoalMilestone", back_populates="goal", cascade="all, delete-orphan")
    book_links = relationship("GoalBook", back_populates="goal", cascade="all, delete-orphan")


class GoalMilestone(Base):
    __tablename__ = "goal_milestones"

    id = Column(Integer, primary_key=True, index=True)
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=False)
    title = Column(String(300), nullable=False)
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    order = Column(Integer, default=0)

    goal = relationship("Goal", back_populates="milestones")


class GoalBook(Base):
    __tablename__ = "goal_books"

    id = Column(Integer, primary_key=True, index=True)
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    goal = relationship("Goal", back_populates="book_links")
    book = relationship("Book", back_populates="goal_links")


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), default=1)
    title = Column(String(300), nullable=True)
    content = Column(Text, nullable=False)
    mood = Column(String(20), nullable=True)  # great, good, neutral, low, bad
    tags = Column(JSON, default=list)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="journal_entries")


class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), default=1)
    messages = Column(JSON, default=list)  # [{role, content, timestamp}]
    topic = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="ai_conversations")


class AIMemory(Base):
    __tablename__ = "ai_memory"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, default=1)
    memory_type = Column(String(30), nullable=False)  # semantic, episodic, preference
    key = Column(String(200), nullable=False)
    value = Column(Text, nullable=False)
    memory_metadata = Column(JSON, default=dict)
    importance = Column(Float, default=0.5)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_accessed = Column(DateTime, default=datetime.utcnow)


# ──────────────────────────── INIT ────────────────────────────

def init_db():
    Base.metadata.create_all(bind=engine)
