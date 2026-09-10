import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play, Pause, Square, BookOpen, Clock } from 'lucide-react';
import { booksApi, readingApi } from '../lib/api';
import type { Book, ReadingSession as IReadingSession } from '../lib/api';

export default function ReadingSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state?.bookId as number | undefined;

  const [book, setBook] = useState<Book | null>(null);
  const [session, setSession] = useState<IReadingSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [endPage, setEndPage] = useState<number | string>('');
  const [notes, setNotes] = useState('');
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    async function initSession() {
      // If we don't have a bookId from navigation state, try to find an active session
      let targetBookId = bookId;
      let activeSession = null;

      try {
        activeSession = await readingApi.getActive();
        if (activeSession) {
          targetBookId = activeSession.book_id;
          setSession(activeSession);
          // Calculate elapsed time
          const start = new Date(activeSession.started_at).getTime();
          const now = new Date().getTime();
          setSeconds(Math.floor((now - start) / 1000));
          setIsActive(true);
        }

        if (targetBookId) {
          const bookData = await booksApi.get(targetBookId);
          setBook(bookData);
          if (!activeSession) {
             setEndPage(bookData.current_page);
          } else {
             setEndPage(bookData.current_page); // or start_page if we prefer
          }
        }
      } catch (error) {
        console.error("Failed to init session", error);
      }
    }
    
    initSession();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bookId]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const toggleTimer = async () => {
    if (!isActive && !session && book) {
      // Start a new session in DB
      try {
        const newSession = await readingApi.start(book.id, book.current_page);
        setSession(newSession);
      } catch (e) {
        console.error("Failed to start session", e);
      }
    }
    setIsActive(!isActive);
  };

  const endSession = async () => {
    if (session) {
      try {
        await readingApi.end(session.id, {
          end_page: Number(endPage),
          duration_minutes: Math.round(seconds / 60),
          notes: notes
        });
        navigate(`/books/${session.book_id}`);
      } catch (e) {
        console.error("Failed to end session", e);
      }
    }
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!book && !session) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="card p-12 text-center max-w-md">
          <BookOpen size={48} className="text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif mb-2">No active book</h2>
          <p className="text-gray-400 mb-6">Select a book from your library to start a reading session.</p>
          <button className="btn btn-primary" onClick={() => navigate('/library')}>Go to Library</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-session-overlay">
      <div className="w-full max-w-2xl px-6 flex flex-col items-center">
        {book && (
          <div className="mb-8 text-center animate-slide-up">
            <h2 className="text-2xl font-serif text-white mb-2">{book.title}</h2>
            <p className="text-gray-400">By {book.author}</p>
          </div>
        )}

        <div className="reading-timer">
          {formatTime(seconds)}
        </div>

        <div className="flex gap-4 mb-12">
          <button 
            className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={toggleTimer}
          >
            {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1 text-amber-500" />}
          </button>
          
          <button 
            className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 hover:bg-rose-500/20 transition-colors"
            onClick={endSession}
            disabled={!session}
          >
            <Square size={20} />
          </button>
        </div>

        <div className="w-full card bg-white/5 border-white/10 animate-fade-in">
          <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
            <Clock size={18} className="text-amber-500" /> End Session
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="form-group mb-0">
              <label className="form-label">Started at page</label>
              <input type="number" className="input bg-white/5" value={session?.start_page || book?.current_page || 0} disabled />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Ended at page</label>
              <input 
                type="number" 
                className="input" 
                value={endPage} 
                onChange={(e) => setEndPage(e.target.value)} 
                min={session?.start_page || book?.current_page || 0} 
              />
            </div>
          </div>
          
          <div className="form-group mb-0">
            <label className="form-label">Quick Notes (Optional)</label>
            <textarea 
              className="input textarea bg-white/5" 
              placeholder="Jot down any key takeaways or thoughts..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="btn btn-primary" onClick={endSession} disabled={!session}>Save & End</button>
          </div>
        </div>
      </div>
    </div>
  );
}
