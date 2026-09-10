"""
PageMind — Seed data for demo.
Run: python seed_data.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from datetime import datetime, date, timedelta
from app.database import init_db, SessionLocal, User, Book, BookNote, ReadingSession, Goal, GoalMilestone, JournalEntry, AIMemory
import random


def seed():
    init_db()
    db = SessionLocal()

    # Check if already seeded
    if db.query(Book).count() > 0:
        print("Database already seeded. Skipping.")
        db.close()
        return

    # ──────────── USER ────────────
    user = User(
        name="Alex Reader",
        email="alex@pagemind.app",
        daily_page_goal=30,
        preferred_genres=["Self-Help", "Psychology", "Business", "Philosophy"],
        coaching_style="encouraging"
    )
    db.add(user)
    db.commit()

    # ──────────── BOOKS ────────────
    books_data = [
        {
            "title": "Atomic Habits",
            "author": "James Clear",
            "genre": "Self-Help",
            "total_pages": 320,
            "current_page": 320,
            "status": "finished",
            "rating": 5.0,
            "review": "A masterpiece on habit formation. The 1% better every day concept changed how I approach personal growth.",
            "date_started": date.today() - timedelta(days=45),
            "date_finished": date.today() - timedelta(days=20),
        },
        {
            "title": "Deep Work",
            "author": "Cal Newport",
            "genre": "Productivity",
            "total_pages": 296,
            "current_page": 180,
            "status": "reading",
            "rating": None,
            "date_started": date.today() - timedelta(days=10),
        },
        {
            "title": "Thinking, Fast and Slow",
            "author": "Daniel Kahneman",
            "genre": "Psychology",
            "total_pages": 499,
            "current_page": 120,
            "status": "reading",
            "rating": None,
            "date_started": date.today() - timedelta(days=14),
        },
        {
            "title": "The Psychology of Money",
            "author": "Morgan Housel",
            "genre": "Finance",
            "total_pages": 256,
            "current_page": 256,
            "status": "finished",
            "rating": 4.5,
            "review": "Beautiful short stories about the quirks of human behavior around money.",
            "date_started": date.today() - timedelta(days=60),
            "date_finished": date.today() - timedelta(days=40),
        },
        {
            "title": "Man's Search for Meaning",
            "author": "Viktor Frankl",
            "genre": "Philosophy",
            "total_pages": 184,
            "current_page": 184,
            "status": "finished",
            "rating": 5.0,
            "review": "Profound and life-changing. The idea that we can find meaning in any situation is powerful.",
            "date_started": date.today() - timedelta(days=90),
            "date_finished": date.today() - timedelta(days=80),
        },
        {
            "title": "The Almanack of Naval Ravikant",
            "author": "Eric Jorgenson",
            "genre": "Business",
            "total_pages": 242,
            "current_page": 0,
            "status": "want_to_read",
        },
        {
            "title": "Meditations",
            "author": "Marcus Aurelius",
            "genre": "Philosophy",
            "total_pages": 256,
            "current_page": 0,
            "status": "want_to_read",
        },
        {
            "title": "The 7 Habits of Highly Effective People",
            "author": "Stephen Covey",
            "genre": "Self-Help",
            "total_pages": 381,
            "current_page": 381,
            "status": "finished",
            "rating": 4.0,
            "date_started": date.today() - timedelta(days=120),
            "date_finished": date.today() - timedelta(days=95),
        },
        {
            "title": "Sapiens",
            "author": "Yuval Noah Harari",
            "genre": "Science",
            "total_pages": 498,
            "current_page": 0,
            "status": "want_to_read",
        },
        {
            "title": "The Power of Now",
            "author": "Eckhart Tolle",
            "genre": "Spirituality",
            "total_pages": 236,
            "current_page": 80,
            "status": "reading",
            "date_started": date.today() - timedelta(days=5),
        },
        {
            "title": "Daring Greatly",
            "author": "Brené Brown",
            "genre": "Psychology",
            "total_pages": 320,
            "current_page": 0,
            "status": "want_to_read",
        },
        {
            "title": "Start with Why",
            "author": "Simon Sinek",
            "genre": "Business",
            "total_pages": 256,
            "current_page": 256,
            "status": "finished",
            "rating": 4.0,
            "date_started": date.today() - timedelta(days=150),
            "date_finished": date.today() - timedelta(days=130),
        },
    ]

    book_objects = []
    for bd in books_data:
        book = Book(**bd)
        db.add(book)
        book_objects.append(book)
    db.commit()

    # ──────────── BOOK NOTES ────────────
    notes_data = [
        {"book_id": 1, "content": "The 1% rule: get 1% better every day. Small improvements compound into remarkable results.", "note_type": "highlight", "page_number": 15, "color": "#f59e0b"},
        {"book_id": 1, "content": "You do not rise to the level of your goals. You fall to the level of your systems.", "note_type": "highlight", "page_number": 27, "color": "#ef4444"},
        {"book_id": 1, "content": "Habit stacking: pair a new habit with an existing one. After [CURRENT HABIT], I will [NEW HABIT].", "note_type": "takeaway", "page_number": 74},
        {"book_id": 1, "content": "The four laws of behavior change: make it obvious, attractive, easy, and satisfying.", "note_type": "takeaway", "page_number": 54},
        {"book_id": 2, "content": "Deep work = professional activities performed in a state of distraction-free concentration.", "note_type": "highlight", "page_number": 3, "color": "#8b5cf6"},
        {"book_id": 2, "content": "Schedule every minute of your day. This forces intentionality.", "note_type": "note", "page_number": 110},
        {"book_id": 3, "content": "System 1 thinking is fast, intuitive, and emotional. System 2 is slow, deliberate, and logical.", "note_type": "highlight", "page_number": 20, "color": "#10b981"},
        {"book_id": 5, "content": "Everything can be taken from a man but one thing: the last of the human freedoms — to choose one's attitude in any given set of circumstances.", "note_type": "highlight", "page_number": 66, "color": "#f59e0b"},
    ]
    for nd in notes_data:
        db.add(BookNote(**nd))
    db.commit()

    # ──────────── READING SESSIONS ────────────
    for i in range(30):
        session_date = datetime.utcnow() - timedelta(days=i)
        if random.random() > 0.3:  # 70% of days had reading sessions
            book_id = random.choice([1, 2, 3, 4, 5, 10])
            pages = random.randint(10, 50)
            duration = pages * random.uniform(1.5, 3.0)
            session = ReadingSession(
                book_id=book_id,
                user_id=1,
                start_page=random.randint(0, 200),
                end_page=random.randint(10, 250),
                pages_read=pages,
                duration_minutes=int(duration),
                mood=random.choice(["great", "good", "neutral", "good", "great"]),
                started_at=session_date,
                ended_at=session_date + timedelta(minutes=duration),
            )
            db.add(session)
    db.commit()

    # ──────────── GOALS ────────────
    goals_data = [
        {
            "title": "Read 24 Books This Year",
            "description": "A book every two weeks to expand my knowledge and perspective.",
            "category": "personal",
            "target_value": 24,
            "current_value": 5,
            "unit": "books",
            "icon": "book-open",
            "color": "#8b5cf6",
        },
        {
            "title": "Build a Daily Reading Habit",
            "description": "Read for at least 30 minutes every day, no exceptions.",
            "category": "mindset",
            "target_value": 100,
            "current_value": 65,
            "unit": "percent",
            "icon": "flame",
            "color": "#f59e0b",
        },
        {
            "title": "Develop Leadership Skills",
            "description": "Read 5 leadership books and apply one key concept from each.",
            "category": "career",
            "target_value": 5,
            "current_value": 2,
            "unit": "books",
            "icon": "crown",
            "color": "#10b981",
        },
        {
            "title": "Practice Mindfulness",
            "description": "Explore meditation and mindfulness through reading and daily journaling.",
            "category": "health",
            "target_value": 100,
            "current_value": 40,
            "unit": "percent",
            "icon": "heart",
            "color": "#ec4899",
        },
        {
            "title": "Master Personal Finance",
            "description": "Understand investing, budgeting, and wealth building through reading.",
            "category": "skills",
            "target_value": 4,
            "current_value": 1,
            "unit": "books",
            "icon": "trending-up",
            "color": "#06b6d4",
        },
    ]

    goal_objects = []
    for gd in goals_data:
        goal = Goal(**gd)
        db.add(goal)
        goal_objects.append(goal)
    db.commit()

    # Goal milestones
    milestones_data = [
        {"goal_id": 1, "title": "Finish first 5 books", "completed": True, "completed_at": datetime.utcnow() - timedelta(days=10), "order": 1},
        {"goal_id": 1, "title": "Reach 12 books (halfway)", "completed": False, "order": 2},
        {"goal_id": 1, "title": "Read a book outside comfort zone", "completed": True, "completed_at": datetime.utcnow() - timedelta(days=30), "order": 3},
        {"goal_id": 1, "title": "Complete all 24 books", "completed": False, "order": 4},
        {"goal_id": 2, "title": "7-day reading streak", "completed": True, "completed_at": datetime.utcnow() - timedelta(days=15), "order": 1},
        {"goal_id": 2, "title": "30-day reading streak", "completed": False, "order": 2},
        {"goal_id": 2, "title": "Read before bed routine", "completed": True, "completed_at": datetime.utcnow() - timedelta(days=20), "order": 3},
        {"goal_id": 3, "title": "Read 'Start with Why'", "completed": True, "completed_at": datetime.utcnow() - timedelta(days=130), "order": 1},
        {"goal_id": 3, "title": "Read 'The 7 Habits'", "completed": True, "completed_at": datetime.utcnow() - timedelta(days=95), "order": 2},
        {"goal_id": 3, "title": "Apply one leadership concept at work", "completed": False, "order": 3},
    ]
    for md in milestones_data:
        db.add(GoalMilestone(**md))
    db.commit()

    # ──────────── JOURNAL ENTRIES ────────────
    journal_data = [
        {
            "title": "Reflections on Atomic Habits",
            "content": "Just finished Atomic Habits and I'm blown away. The idea that we don't rise to our goals but fall to our systems is so powerful. I've been thinking about my own systems — morning routine, reading habit, journaling — and I can see how they shape who I'm becoming.\n\nKey insight: I need to focus less on WHAT I want to achieve and more on WHO I want to become. Identity-based habits. I'm not trying to read more books; I'm becoming a reader.",
            "mood": "great",
            "tags": ["atomic-habits", "systems", "identity"],
            "book_id": 1,
        },
        {
            "title": "The Power of Deep Focus",
            "content": "Cal Newport's ideas about deep work are challenging my assumptions about productivity. I realized I spend most of my day in 'shallow work' — emails, meetings, quick tasks. The real value comes from concentrated, uninterrupted thinking.\n\nAction item: Block 2 hours each morning for deep work. No phone, no email, just focused thinking.",
            "mood": "good",
            "tags": ["deep-work", "productivity", "focus"],
            "book_id": 2,
        },
        {
            "title": "Weekly Reflection",
            "content": "This week was a solid reading week. I managed to read every day, even if some days were just 10 pages. The consistency feels good. I noticed that reading in the morning sets a better tone for my day than scrolling social media.\n\nGrowth areas:\n- Need to journal more consistently (this is only my 3rd entry this month)\n- Want to start applying more of what I read rather than just consuming\n- Should connect my reading more explicitly to my goals",
            "mood": "good",
            "tags": ["weekly-review", "consistency", "growth"],
        },
        {
            "title": "Finding Meaning in Daily Life",
            "content": "Viktor Frankl's words keep echoing in my mind: 'Those who have a why to live can bear almost any how.' I've been thinking about my own 'why' — why do I read? Why do I set goals?\n\nI think the answer is becoming: I want to understand the human experience more deeply, and I want to use that understanding to live a more intentional life. Reading is my tool for that.",
            "mood": "great",
            "tags": ["meaning", "purpose", "philosophy"],
            "book_id": 5,
        },
        {
            "title": "Struggling with Consistency",
            "content": "Had a rough few days. Didn't read at all over the weekend. It's interesting how quickly the momentum can slip. But I'm not beating myself up — James Clear would say that missing once is an accident, missing twice is the start of a new habit.\n\nGetting back on track today. Even 5 pages counts.",
            "mood": "low",
            "tags": ["struggle", "consistency", "self-compassion"],
        },
    ]

    for i, jd in enumerate(journal_data):
        entry = JournalEntry(
            **jd,
            created_at=datetime.utcnow() - timedelta(days=len(journal_data) - i) * 3,
        )
        db.add(entry)
    db.commit()

    # ──────────── AI MEMORY ────────────
    memory_data = [
        {"memory_type": "semantic", "key": "preferred_genres", "value": "Self-Help, Psychology, Business, Philosophy", "importance": 0.9},
        {"memory_type": "semantic", "key": "reading_style", "value": "Prefers reading in the morning, usually 20-30 pages per session", "importance": 0.8},
        {"memory_type": "semantic", "key": "growth_focus", "value": "Currently focused on building habits and developing leadership skills", "importance": 0.9},
        {"memory_type": "preference", "key": "coaching_style", "value": "Responds well to encouragement and actionable insights rather than abstract advice", "importance": 0.7},
        {"memory_type": "episodic", "key": "breakthrough_moment", "value": "Had a major insight about identity-based habits after reading Atomic Habits", "importance": 0.85},
    ]
    for md in memory_data:
        db.add(AIMemory(**md))
    db.commit()

    print("✅ Database seeded successfully!")
    print(f"   📚 {len(books_data)} books")
    print(f"   📝 {len(notes_data)} notes")
    print(f"   🎯 {len(goals_data)} goals")
    print(f"   📔 {len(journal_data)} journal entries")
    print(f"   🧠 {len(memory_data)} AI memory entries")

    db.close()


if __name__ == "__main__":
    seed()
