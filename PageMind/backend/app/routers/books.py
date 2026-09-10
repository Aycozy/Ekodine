"""
Book CRUD API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from ..database import get_db, Book, BookNote
from ..models.schemas import (
    BookCreate, BookUpdate, BookResponse,
    BookNoteCreate, BookNoteResponse
)

router = APIRouter(prefix="/api/books", tags=["Books"])


@router.get("", response_model=List[BookResponse])
def list_books(
    status: Optional[str] = None,
    genre: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Book)
    if status:
        query = query.filter(Book.status == status)
    if genre:
        query = query.filter(Book.genre == genre)
    if search:
        query = query.filter(
            (Book.title.ilike(f"%{search}%")) | (Book.author.ilike(f"%{search}%"))
        )
    return query.order_by(Book.updated_at.desc()).all()


@router.post("", response_model=BookResponse)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Book(**book.model_dump())
    if book.status == "reading":
        db_book.date_started = date.today()
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


@router.get("/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.put("/{book_id}", response_model=BookResponse)
def update_book(book_id: int, update: BookUpdate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    update_data = update.model_dump(exclude_unset=True)

    # Auto-set dates based on status changes
    if "status" in update_data:
        if update_data["status"] == "reading" and not book.date_started:
            update_data["date_started"] = date.today()
        elif update_data["status"] == "finished" and not book.date_finished:
            update_data["date_finished"] = date.today()

    for key, value in update_data.items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)
    return book


@router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book)
    db.commit()
    return {"message": "Book deleted"}


# ──────────────── NOTES & HIGHLIGHTS ────────────────

@router.get("/{book_id}/notes", response_model=List[BookNoteResponse])
def get_notes(book_id: int, db: Session = Depends(get_db)):
    return db.query(BookNote).filter(BookNote.book_id == book_id).order_by(BookNote.created_at.desc()).all()


@router.post("/{book_id}/notes", response_model=BookNoteResponse)
def create_note(book_id: int, note: BookNoteCreate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db_note = BookNote(book_id=book_id, **note.model_dump())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


@router.delete("/{book_id}/notes/{note_id}")
def delete_note(book_id: int, note_id: int, db: Session = Depends(get_db)):
    note = db.query(BookNote).filter(BookNote.id == note_id, BookNote.book_id == book_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": "Note deleted"}
