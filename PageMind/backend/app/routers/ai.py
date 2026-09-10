"""
AI Agent routes — Chat interface, recommendations, and insights.
Uses a pluggable AI backend with context-aware memory system.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random

from ..database import get_db, AIConversation, AIMemory, Book, Goal, ReadingSession, JournalEntry
from ..models.schemas import AIChatRequest, AIChatResponse, AIInsight, AIRecommendation

router = APIRouter(prefix="/api/ai", tags=["AI Coach"])


# ──────────────── AI KNOWLEDGE BASE ────────────────

GROWTH_INSIGHTS = [
    {
        "title": "Consistency Over Intensity",
        "content": "Your reading pattern shows you're most productive when reading 20-30 pages daily rather than marathon sessions. Small consistent efforts compound into remarkable results.",
        "icon": "trending-up",
        "category": "reading_pattern"
    },
    {
        "title": "Cross-Pollinate Your Reading",
        "content": "You've been focused on business books lately. Research shows that reading across diverse genres — psychology, philosophy, fiction — creates unexpected connections that fuel creativity.",
        "icon": "shuffle",
        "category": "recommendation"
    },
    {
        "title": "The Reflection Gap",
        "content": "You're reading at a great pace, but your journaling is falling behind. Studies show that reflecting on what you read increases retention by 40%. Try writing 3 key takeaways after each reading session.",
        "icon": "brain",
        "category": "growth"
    },
    {
        "title": "Your Growth Trajectory",
        "content": "Based on your goals and reading history, you're building strong foundations in leadership and emotional intelligence. Consider adding books on communication to round out your skillset.",
        "icon": "rocket",
        "category": "growth"
    },
    {
        "title": "Reading Streak Power",
        "content": "You're on a reading streak! Research from James Clear's Atomic Habits shows that maintaining streaks creates identity-level change. You're not just reading — you're becoming a reader.",
        "icon": "flame",
        "category": "motivation"
    },
    {
        "title": "Deep Work Reading",
        "content": "Your most impactful reading sessions happen in the morning. Consider blocking 30 minutes before your day starts as a 'Deep Reading' ritual.",
        "icon": "clock",
        "category": "optimization"
    }
]

BOOK_RECOMMENDATIONS = [
    {
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self-Help",
        "reason": "Based on your goal to build better habits, this book provides a proven framework for making small changes that yield remarkable results.",
        "cover_url": None,
        "match_score": 0.95
    },
    {
        "title": "Deep Work",
        "author": "Cal Newport",
        "genre": "Productivity",
        "reason": "Your reading sessions show you value focused work. This book will help you cultivate the ability to perform deep, meaningful work.",
        "cover_url": None,
        "match_score": 0.92
    },
    {
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "genre": "Psychology",
        "reason": "To complement your business reading, this explores the two systems that drive how we think — essential for better decision-making.",
        "cover_url": None,
        "match_score": 0.88
    },
    {
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "genre": "Finance",
        "reason": "Your interest in personal growth naturally extends to financial wisdom. This book reframes money as a tool for freedom.",
        "cover_url": None,
        "match_score": 0.85
    },
    {
        "title": "Man's Search for Meaning",
        "author": "Viktor Frankl",
        "genre": "Philosophy",
        "reason": "A profound exploration of finding purpose in any circumstance — aligns with your personal growth journey.",
        "cover_url": None,
        "match_score": 0.90
    },
    {
        "title": "The Almanack of Naval Ravikant",
        "author": "Eric Jorgenson",
        "genre": "Business",
        "reason": "Combines wealth creation with happiness philosophy — a perfect intersection of your career and personal growth goals.",
        "cover_url": None,
        "match_score": 0.87
    }
]

COACHING_RESPONSES = {
    "greeting": [
        "Hey there! 📚 I've been looking at your reading journey, and I'm impressed by your consistency. What would you like to explore today?",
        "Welcome back! I noticed you made great progress on your current book. Ready to dive deeper into your growth?",
        "Good to see you! Based on your reading patterns, I have some interesting insights to share. What's on your mind?"
    ],
    "recommendation": [
        "Based on your reading history and growth goals, I think you'd love **'{title}'** by {author}. {reason}",
        "Here's a book that connects perfectly to what you've been exploring: **'{title}'** by {author}. {reason}",
        "I've been thinking about your goals, and **'{title}'** by {author} could be a game-changer. {reason}"
    ],
    "motivation": [
        "Remember: every page you read is an investment in your future self. You've already read {pages} pages — that's incredible! Keep going. 🔥",
        "You're building something powerful with your reading habit. {books} books and counting — each one has added a new lens through which you see the world.",
        "The fact that you're here, actively working on yourself through reading, puts you ahead of 95% of people. Your growth journey is inspiring! 💪"
    ],
    "reflection": [
        "That's a great observation. Let me connect that to something you highlighted in **{book}**: \"{highlight}\". See how these ideas are building on each other?",
        "I love how you're connecting the dots across your reading. Your journal entries show a pattern of deeper thinking — that's real growth happening in real-time.",
        "What you just shared reminds me of a key concept from your recent reads. The beauty of wide reading is exactly this — unexpected connections emerge."
    ],
    "default": [
        "That's a thoughtful question. Based on what I know about your reading journey and goals, here's my take:\n\nYour reading list tells me you're someone who values both practical skills and deeper wisdom. The key insight I see is that you're not just accumulating knowledge — you're transforming it into action through your goals and journal reflections.\n\nWould you like me to suggest some specific actions based on your recent reading?",
        "I appreciate you sharing that. Looking at your growth trajectory, I can see you're at an exciting inflection point. Your recent books and journal entries suggest you're ready for more challenging material that pushes your thinking further.\n\nShall I recommend some books that would stretch you in new directions?",
        "Great question! Let me think about this in the context of your journey...\n\nYour reading pattern shows you're someone who goes deep rather than wide — which is powerful. Combined with your growth goals, I think the next step is to start applying more of what you're reading. The gap between knowledge and wisdom is practice.\n\nWhat if we set up a weekly reflection where you identify one actionable insight from your reading?"
    ]
}


def generate_ai_response(message: str, db: Session) -> dict:
    """Generate a context-aware AI response based on user's reading history."""
    msg_lower = message.lower()

    # Gather context from database
    total_books = db.query(Book).count()
    books_reading = db.query(Book).filter(Book.status == "reading").count()
    books_finished = db.query(Book).filter(Book.status == "finished").count()
    total_sessions = db.query(ReadingSession).count()
    total_goals = db.query(Goal).filter(Goal.status == "active").count()

    # Get a currently reading book for context
    current_book = db.query(Book).filter(Book.status == "reading").first()
    book_title = current_book.title if current_book else "your current book"

    # Determine response type
    if any(word in msg_lower for word in ["hello", "hi", "hey", "start", "begin"]):
        response = random.choice(COACHING_RESPONSES["greeting"])
    elif any(word in msg_lower for word in ["recommend", "suggest", "read next", "what should i read", "book suggestion"]):
        rec = random.choice(BOOK_RECOMMENDATIONS)
        template = random.choice(COACHING_RESPONSES["recommendation"])
        response = template.format(title=rec["title"], author=rec["author"], reason=rec["reason"])
    elif any(word in msg_lower for word in ["motivate", "motivation", "encourage", "struggling", "hard", "difficult"]):
        template = random.choice(COACHING_RESPONSES["motivation"])
        response = template.format(pages=total_sessions * 25, books=books_finished)
    elif any(word in msg_lower for word in ["reflect", "think", "insight", "learned", "takeaway"]):
        template = random.choice(COACHING_RESPONSES["reflection"])
        response = template.format(book=book_title, highlight="The key to change is not willpower, but systems")
    else:
        response = random.choice(COACHING_RESPONSES["default"])

    # Add context-aware footer
    if total_books > 0:
        response += f"\n\n---\n📊 *Your stats: {books_finished} books finished, {books_reading} currently reading, {total_goals} active goals*"

    suggestions = [
        "What should I read next?",
        "Give me a growth insight",
        "How am I progressing?",
        "Recommend a book for my goals"
    ]

    return {
        "response": response,
        "suggestions": random.sample(suggestions, 3)
    }


@router.post("/chat", response_model=AIChatResponse)
def chat(request: AIChatRequest, db: Session = Depends(get_db)):
    # Get or create conversation
    if request.conversation_id:
        conversation = db.query(AIConversation).filter(
            AIConversation.id == request.conversation_id
        ).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = AIConversation(messages=[], topic="General")
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # Add user message to conversation
    messages = conversation.messages or []
    messages.append({
        "role": "user",
        "content": request.message,
        "timestamp": datetime.utcnow().isoformat()
    })

    # Generate AI response
    ai_result = generate_ai_response(request.message, db)

    messages.append({
        "role": "assistant",
        "content": ai_result["response"],
        "timestamp": datetime.utcnow().isoformat()
    })

    conversation.messages = messages
    conversation.updated_at = datetime.utcnow()
    db.commit()

    # Store in memory
    memory = AIMemory(
        memory_type="episodic",
        key=f"chat_{conversation.id}_{len(messages)}",
        value=request.message,
        memory_metadata={"response": ai_result["response"][:200]},
        importance=0.5
    )
    db.add(memory)
    db.commit()

    return AIChatResponse(
        response=ai_result["response"],
        conversation_id=conversation.id,
        suggestions=ai_result["suggestions"]
    )


@router.get("/recommendations", response_model=List[AIRecommendation])
def get_recommendations(db: Session = Depends(get_db)):
    """Get personalized book recommendations."""
    # In production, this would use the AI agent with memory context
    # For MVP, return curated recommendations
    recs = random.sample(BOOK_RECOMMENDATIONS, min(4, len(BOOK_RECOMMENDATIONS)))
    return [AIRecommendation(**r) for r in recs]


@router.get("/insights", response_model=List[AIInsight])
def get_insights(db: Session = Depends(get_db)):
    """Get personalized growth insights."""
    insights = random.sample(GROWTH_INSIGHTS, min(3, len(GROWTH_INSIGHTS)))
    return [AIInsight(**i) for i in insights]


@router.get("/conversations")
def list_conversations(db: Session = Depends(get_db)):
    """List all AI conversations."""
    convos = db.query(AIConversation).order_by(
        AIConversation.updated_at.desc()
    ).limit(20).all()
    return [
        {
            "id": c.id,
            "topic": c.topic,
            "message_count": len(c.messages) if c.messages else 0,
            "updated_at": c.updated_at.isoformat() if c.updated_at else None,
            "preview": c.messages[-1]["content"][:80] if c.messages else ""
        }
        for c in convos
    ]
