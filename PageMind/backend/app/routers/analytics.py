"""
Analytics API routes — Reading stats, growth metrics, and heatmap data.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from datetime import datetime, timedelta, date
import random

from ..database import get_db, Book, ReadingSession, Goal, JournalEntry
from ..models.schemas import ReadingStats, GrowthStats, HeatmapDay

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/reading", response_model=ReadingStats)
def reading_stats(db: Session = Depends(get_db)):
    total_books = db.query(Book).count()
    books_finished = db.query(Book).filter(Book.status == "finished").count()
    books_reading = db.query(Book).filter(Book.status == "reading").count()

    total_pages = db.query(func.sum(ReadingSession.pages_read)).scalar() or 0
    total_minutes = db.query(func.sum(ReadingSession.duration_minutes)).scalar() or 0

    # Pages this week
    week_ago = datetime.utcnow() - timedelta(days=7)
    pages_this_week = db.query(func.sum(ReadingSession.pages_read)).filter(
        ReadingSession.started_at >= week_ago
    ).scalar() or 0

    # Books this month
    month_ago = datetime.utcnow() - timedelta(days=30)
    books_this_month = db.query(Book).filter(
        Book.date_finished >= month_ago.date()
    ).count()

    # Calculate streak
    today = date.today()
    current_streak = 0
    longest_streak = 0
    temp_streak = 0

    for i in range(365):
        check_date = today - timedelta(days=i)
        session = db.query(ReadingSession).filter(
            func.date(ReadingSession.started_at) == check_date
        ).first()
        if session:
            temp_streak += 1
            if i == current_streak:
                current_streak += 1
        else:
            if i == 0:
                pass  # Today might not have a session yet
            else:
                longest_streak = max(longest_streak, temp_streak)
                temp_streak = 0
                if current_streak < i:
                    break

    longest_streak = max(longest_streak, temp_streak, current_streak)

    # Average pages per day (last 30 days)
    month_pages = db.query(func.sum(ReadingSession.pages_read)).filter(
        ReadingSession.started_at >= month_ago
    ).scalar() or 0
    avg_pages = round(month_pages / 30, 1)

    return ReadingStats(
        total_books=total_books,
        books_finished=books_finished,
        books_reading=books_reading,
        total_pages_read=total_pages,
        total_reading_minutes=total_minutes,
        current_streak=current_streak,
        longest_streak=longest_streak,
        avg_pages_per_day=avg_pages,
        books_this_month=books_this_month,
        pages_this_week=pages_this_week
    )


@router.get("/growth", response_model=GrowthStats)
def growth_stats(db: Session = Depends(get_db)):
    total_goals = db.query(Goal).count()
    active_goals = db.query(Goal).filter(Goal.status == "active").count()
    completed_goals = db.query(Goal).filter(Goal.status == "completed").count()
    total_journal = db.query(JournalEntry).count()

    week_ago = datetime.utcnow() - timedelta(days=7)
    journal_this_week = db.query(JournalEntry).filter(
        JournalEntry.created_at >= week_ago
    ).count()

    # Growth score (0-100): composite of reading consistency, goal progress, journaling
    reading_score = min(30, db.query(ReadingSession).filter(
        ReadingSession.started_at >= week_ago
    ).count() * 5)

    goal_score = min(40, (completed_goals / max(total_goals, 1)) * 40)
    journal_score = min(30, journal_this_week * 10)
    growth_score = round(reading_score + goal_score + journal_score, 1)

    # Top categories
    categories = db.query(Goal.category, func.count(Goal.id)).group_by(Goal.category).all()
    top_categories = [{"name": c[0], "count": c[1]} for c in categories]

    return GrowthStats(
        total_goals=total_goals,
        active_goals=active_goals,
        completed_goals=completed_goals,
        total_journal_entries=total_journal,
        journal_this_week=journal_this_week,
        growth_score=growth_score,
        top_categories=top_categories
    )


@router.get("/heatmap", response_model=List[HeatmapDay])
def heatmap_data(days: int = 365, db: Session = Depends(get_db)):
    """Generate reading activity heatmap data."""
    today = date.today()
    heatmap = []

    for i in range(days):
        check_date = today - timedelta(days=days - 1 - i)
        sessions = db.query(ReadingSession).filter(
            func.date(ReadingSession.started_at) == check_date
        ).all()

        pages = sum(s.pages_read for s in sessions)
        session_count = len(sessions)

        # Calculate intensity level (0-4)
        if pages == 0:
            level = 0
        elif pages < 10:
            level = 1
        elif pages < 25:
            level = 2
        elif pages < 50:
            level = 3
        else:
            level = 4

        heatmap.append(HeatmapDay(
            date=check_date.isoformat(),
            pages_read=pages,
            sessions=session_count,
            level=level
        ))

    return heatmap


@router.get("/charts/weekly")
def weekly_chart(db: Session = Depends(get_db)):
    """Get pages read per day for the last 7 days."""
    today = date.today()
    data = []
    for i in range(7):
        check_date = today - timedelta(days=6 - i)
        pages = db.query(func.sum(ReadingSession.pages_read)).filter(
            func.date(ReadingSession.started_at) == check_date
        ).scalar() or 0
        data.append({
            "day": check_date.strftime("%a"),
            "date": check_date.isoformat(),
            "pages": pages
        })
    return data


@router.get("/charts/monthly")
def monthly_chart(db: Session = Depends(get_db)):
    """Get books finished per month for the last 6 months."""
    today = date.today()
    data = []
    for i in range(6):
        month_start = (today.replace(day=1) - timedelta(days=30 * (5 - i))).replace(day=1)
        if i < 5:
            month_end = (today.replace(day=1) - timedelta(days=30 * (4 - i))).replace(day=1)
        else:
            month_end = today + timedelta(days=1)

        count = db.query(Book).filter(
            Book.date_finished >= month_start,
            Book.date_finished < month_end
        ).count()

        data.append({
            "month": month_start.strftime("%b"),
            "books": count
        })
    return data


@router.get("/charts/genres")
def genre_chart(db: Session = Depends(get_db)):
    """Get book count by genre."""
    genres = db.query(Book.genre, func.count(Book.id)).filter(
        Book.genre != None
    ).group_by(Book.genre).all()
    return [{"genre": g[0], "count": g[1]} for g in genres]
