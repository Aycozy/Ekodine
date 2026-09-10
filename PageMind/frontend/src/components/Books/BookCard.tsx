import { Book as BookIcon, CheckCircle, Clock } from 'lucide-react';
import type { Book } from '../../lib/api';
import React from 'react';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  const progress = book.total_pages > 0 ? (book.current_page / book.total_pages) * 100 : 0;
  
  return (
    <div className="card book-card card-glow-amber" onClick={onClick}>
      <div className="book-cover">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} />
        ) : (
          <div className="book-cover-placeholder bg-gradient-to-br from-gray-800 to-gray-900">
            {book.title}
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <div className="book-author">{book.author}</div>
        
        <div className="book-meta">
          {book.status === 'reading' && (
            <span className="badge badge-amber">
              <Clock size={12} /> Reading
            </span>
          )}
          {book.status === 'finished' && (
            <span className="badge badge-emerald">
              <CheckCircle size={12} /> Finished
            </span>
          )}
          {book.status === 'want_to_read' && (
            <span className="badge badge-violet">
              <BookIcon size={12} /> Want to Read
            </span>
          )}
          
          {book.genre && <span>{book.genre}</span>}
        </div>
        
        {(book.status === 'reading' || book.status === 'finished') && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{book.current_page} / {book.total_pages} pages</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="book-progress-bar">
              <div 
                className="book-progress-fill" 
                style={{ 
                  width: `${progress}%`,
                  background: book.status === 'finished' ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
