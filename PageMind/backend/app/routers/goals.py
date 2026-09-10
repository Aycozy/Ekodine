"""
Growth Goals API routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..database import get_db, Goal, GoalMilestone, GoalBook
from ..models.schemas import (
    GoalCreate, GoalUpdate, GoalResponse,
    MilestoneCreate, MilestoneResponse
)

router = APIRouter(prefix="/api/goals", tags=["Goals"])


@router.get("", response_model=List[GoalResponse])
def list_goals(
    status: str = None,
    category: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Goal)
    if status:
        query = query.filter(Goal.status == status)
    if category:
        query = query.filter(Goal.category == category)
    return query.order_by(Goal.created_at.desc()).all()


@router.post("", response_model=GoalResponse)
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    db_goal = Goal(**goal.model_dump())
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal


@router.get("/{goal_id}", response_model=GoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal


@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal(goal_id: int, update: GoalUpdate, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    update_data = update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(goal, key, value)

    # Auto-complete if target reached
    if goal.current_value >= goal.target_value and goal.status == "active":
        goal.status = "completed"

    db.commit()
    db.refresh(goal)
    return goal


@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    db.delete(goal)
    db.commit()
    return {"message": "Goal deleted"}


# ──────────────── MILESTONES ────────────────

@router.get("/{goal_id}/milestones", response_model=List[MilestoneResponse])
def get_milestones(goal_id: int, db: Session = Depends(get_db)):
    return db.query(GoalMilestone).filter(
        GoalMilestone.goal_id == goal_id
    ).order_by(GoalMilestone.order).all()


@router.post("/{goal_id}/milestones", response_model=MilestoneResponse)
def create_milestone(goal_id: int, milestone: MilestoneCreate, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    db_ms = GoalMilestone(goal_id=goal_id, **milestone.model_dump())
    db.add(db_ms)
    db.commit()
    db.refresh(db_ms)
    return db_ms


@router.put("/{goal_id}/milestones/{milestone_id}", response_model=MilestoneResponse)
def toggle_milestone(goal_id: int, milestone_id: int, db: Session = Depends(get_db)):
    ms = db.query(GoalMilestone).filter(
        GoalMilestone.id == milestone_id, GoalMilestone.goal_id == goal_id
    ).first()
    if not ms:
        raise HTTPException(status_code=404, detail="Milestone not found")
    ms.completed = not ms.completed
    ms.completed_at = datetime.utcnow() if ms.completed else None
    db.commit()
    db.refresh(ms)
    return ms


# ──────────────── LINK BOOKS TO GOALS ────────────────

@router.post("/{goal_id}/books/{book_id}")
def link_book(goal_id: int, book_id: int, db: Session = Depends(get_db)):
    existing = db.query(GoalBook).filter(
        GoalBook.goal_id == goal_id, GoalBook.book_id == book_id
    ).first()
    if existing:
        return {"message": "Already linked"}
    link = GoalBook(goal_id=goal_id, book_id=book_id)
    db.add(link)
    db.commit()
    return {"message": "Book linked to goal"}


@router.delete("/{goal_id}/books/{book_id}")
def unlink_book(goal_id: int, book_id: int, db: Session = Depends(get_db)):
    link = db.query(GoalBook).filter(
        GoalBook.goal_id == goal_id, GoalBook.book_id == book_id
    ).first()
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    db.delete(link)
    db.commit()
    return {"message": "Book unlinked from goal"}
