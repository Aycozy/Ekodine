import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Edit3, Trash2, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { booksApi } from '../lib/api';
import type { Book, BookNote } from '../lib/api';
import { ProgressRing } from '../components/Common/ProgressRing';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<BookNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'details'>('notes');

  useEffect(() => {
    async function fetchBookDetails() {
      if (!id) return;
      try {
        setLoading(true);
        const bookData = await booksApi.get(parseInt(id, 10));
        setBook(bookData);
        const notesData = await booksApi.getNotes(parseInt(id, 10));
        setNotes(notesData);
      } catch (error) {
        console.error("Failed to load book details", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Loading book details...</div>;
  }

  if (!book) {
    return (
      <div className="empty-state">
        <h3 className="text-xl font-medium mb-2">Book not found</h3>
        <button className="btn btn-secondary mt-4" onClick={() => navigate('/library')}>
          Return to Library
        </button>
      </div>
    );
  }

  const progress = book.total_pages > 0 ? (book.current_page / book.total_pages) * 100 : 0;

  return (
    <div className="animate-fade-in pb-12">
      <button 
        className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="glass-card mb-8 relative overflow-hidden">
        {/* Decorative background blur based on cover color (simulated with amber/violet gradient) */}
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-gradient-to-br from-amber-500/10 to-violet-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl flex-shrink-0 border border-white/10">
            {book.cover_url ? (
              <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4 text-center text-lg font-serif">
                {book.title}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
              <h1 className="text-4xl font-serif font-bold text-white leading-tight">{book.title}</h1>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-icon" title="Edit book"><Edit3 size={18} /></button>
                <button className="btn btn-secondary btn-icon text-rose-400 hover:text-rose-500 hover:border-rose-500/50" title="Delete book"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 mb-6">{book.author}</p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3">
                <ProgressRing radius={28} stroke={4} progress={progress} colorClass={book.status === 'finished' ? 'emerald' : 'amber'} />
                <div>
                  <div className="text-sm text-gray-400">Progress</div>
                  <div className="font-semibold">{book.current_page} / {book.total_pages}</div>
                </div>
              </div>
              
              <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
              
              <div className="flex gap-6">
                <div>
                  <div className="text-sm text-gray-400 flex items-center gap-1 mb-1"><BookOpen size={14} /> Status</div>
                  <div className="font-medium capitalize">{book.status.replace('_', ' ')}</div>
                </div>
                {book.genre && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Genre</div>
                    <div className="font-medium bg-white/5 px-2 py-0.5 rounded text-sm">{book.genre}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/reading/session" state={{ bookId: book.id }} className="btn btn-primary shadow-glow-amber">
                <Play size={18} /> Start Session
              </Link>
              <button className="btn btn-secondary">Log Manual Progress</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes & Highlights ({notes.length})
        </div>
        <div 
          className={`tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details & Review
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl">Your Insights</h3>
            <button className="btn btn-secondary btn-sm">Add Note</button>
          </div>
          
          {notes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {notes.map((note) => (
                <div key={note.id} className="card hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`badge`} style={{ backgroundColor: `${note.color}20`, color: note.color }}>
                      {note.note_type}
                    </span>
                    {note.page_number && (
                      <span className="text-xs text-gray-500">Page {note.page_number}</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center text-gray-400 border-dashed">
              <p className="mb-4">You haven't added any notes or highlights for this book yet.</p>
              <button className="btn btn-secondary">Create First Note</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'details' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-serif text-xl mb-4">Reading Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-300">Added to Library</div>
                  <div className="text-xs text-gray-500">{new Date(book.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              
              {book.date_started && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Play size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-300">Started Reading</div>
                    <div className="text-xs text-gray-500">{new Date(book.date_started).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
              
              {book.date_finished && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-300">Finished Reading</div>
                    <div className="text-xs text-gray-500">{new Date(book.date_finished).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-serif text-xl mb-4">Review & Rating</h3>
            {book.rating ? (
              <div className="mb-4 flex gap-1 text-amber-500">
                {[1,2,3,4,5].map(star => (
                  <span key={star}>{star <= book.rating! ? '★' : '☆'}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic mb-4">No rating yet.</p>
            )}
            
            {book.review ? (
              <p className="text-sm text-gray-300 italic">"{book.review}"</p>
            ) : (
              <p className="text-sm text-gray-500 italic">No review written.</p>
            )}
            
            <button className="btn btn-secondary btn-sm mt-4">Write Review</button>
          </div>
        </div>
      )}
    </div>
  );
}
