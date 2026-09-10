"""
Reading session API routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..database import get_db, ReadingSession, Book
from ..models.schemas import (
    ReadingSessionCreate, ReadingSessionEnd, ReadingSessionResponse
)

router = APIRouter(prefix="/api/reading", tags=["Reading Sessions"])


@router.get("/sessions", response_model=List[ReadingSessionResponse])
def list_sessions(
    book_id: Optional[int] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(ReadingSession)
    if book_id:
        query = query.filter(ReadingSession.book_id == book_id)
    return query.order_by(ReadingSession.started_at.desc()).limit(limit).all()


@router.post("/sessions", response_model=ReadingSessionResponse)
def start_session(session: ReadingSessionCreate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == session.book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    # Auto-set book to "reading" if it wasn't
    if book.status == "want_to_read":
        book.status = "reading"
        from datetime import date as d
        book.date_started = d.today()

    db_session = ReadingSession(
        book_id=session.book_id,
        start_page=session.start_page or book.current_page,
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.put("/sessions/{session_id}", response_model=ReadingSessionResponse)
def end_session(session_id: int, update: ReadingSessionEnd, db: Session = Depends(get_db)):
    session = db.query(ReadingSession).filter(ReadingSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    session.end_page = update.end_page
    session.pages_read = update.end_page - session.start_page
    session.duration_minutes = update.duration_minutes
    session.notes = update.notes
    session.mood = update.mood
    session.ended_at = datetime.utcnow()

    # Update the book's current page
    book = db.query(Book).filter(Book.id == session.book_id).first()
    if book:
        book.current_page = update.end_page
        if update.end_page >= book.total_pages and book.total_pages > 0:
            book.status = "finished"
            from datetime import date as d
            book.date_finished = d.today()

    db.commit()
    db.refresh(session)
    return session


@router.get("/active", response_model=Optional[ReadingSessionResponse])
def get_active_session(db: Session = Depends(get_db)):
    """Get the currently active reading session (not yet ended)."""
    session = db.query(ReadingSession).filter(
        ReadingSession.ended_at == None
    ).order_by(ReadingSession.started_at.desc()).first()
    return session
