import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';
import { booksApi } from '../lib/api';
import type { Book } from '../lib/api';
import { BookCard } from '../components/Books/BookCard';

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'want_to_read' | 'finished'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, [activeTab]);

  async function loadBooks() {
    setLoading(true);
    try {
      const statusParam = activeTab === 'all' ? undefined : activeTab;
      const data = await booksApi.list({ status: statusParam });
      setBooks(data);
    } catch (error) {
      console.error("Failed to load books", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-2">My Library</h1>
          <p className="text-gray-400">Manage your reading collection and discover new perspectives.</p>
        </div>
        <button className="btn btn-primary" onClick={() => console.log('Open add book modal')}>
          <Plus size={18} /> Add Book
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8 justify-between items-center">
        <div className="tabs w-full md:w-auto mb-0">
          <div 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Books
          </div>
          <div 
            className={`tab ${activeTab === 'reading' ? 'active' : ''}`}
            onClick={() => setActiveTab('reading')}
          >
            Currently Reading
          </div>
          <div 
            className={`tab ${activeTab === 'want_to_read' ? 'active' : ''}`}
            onClick={() => setActiveTab('want_to_read')}
          >
            Want to Read
          </div>
          <div 
            className={`tab ${activeTab === 'finished' ? 'active' : ''}`}
            onClick={() => setActiveTab('finished')}
          >
            Finished
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="input-group flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              className="input pl-10" 
              placeholder="Search library..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary btn-icon" title="Filter options">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading library...</div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid-books">
          {filteredBooks.map((book, i) => (
            <div key={book.id} className={`stagger-${(i % 6) + 1} animate-slide-up`}>
              <BookCard 
                book={book} 
                onClick={() => navigate(`/books/${book.id}`)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <BookOpen size={40} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="mb-6">
            {searchQuery 
              ? "We couldn't find any books matching your search." 
              : activeTab === 'all'
                ? "Your library is empty. Add a book to get started."
                : `You don't have any books in the '${activeTab.replace('_', ' ')}' shelf.`
            }
          </p>
          {!searchQuery && activeTab === 'all' && (
            <button className="btn btn-primary">Add Your First Book</button>
          )}
        </div>
      )}
    </div>
  );
}
