import React, { useEffect, useState } from 'react';
import { Calendar, Plus, Tag } from 'lucide-react';
import { journalApi } from '../lib/api';
import type { JournalEntry } from '../lib/api';

const MOOD_EMOJIS: Record<string, string> = {
  great: '🤩',
  good: '🙂',
  neutral: '😐',
  low: '😔',
  bad: '😫'
};

export default function GrowthJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    setLoading(true);
    try {
      const data = await journalApi.list();
      setEntries(data);
    } catch (error) {
      console.error("Failed to load journal entries", error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="page-header flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-2">Growth Journal</h1>
          <p className="text-gray-400">Reflect on what you read, track your mood, and record your insights.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> New Entry
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading journal...</div>
      ) : entries.length > 0 ? (
        <div className="journal-timeline mt-8">
          {entries.map((entry, i) => (
            <div key={entry.id} className={`journal-entry stagger-${(i % 5) + 1} animate-slide-up`}>
              <div className="journal-date">{formatDate(entry.created_at)}</div>
              
              <div className="card mt-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-xl font-bold">{entry.title || 'Untitled Entry'}</h3>
                  {entry.mood && (
                    <div className="text-2xl" title={`Mood: ${entry.mood}`}>
                      {MOOD_EMOJIS[entry.mood] || '😐'}
                    </div>
                  )}
                </div>
                
                <div className="journal-content whitespace-pre-wrap">
                  {entry.content}
                </div>
                
                {(entry.tags && entry.tags.length > 0) && (
                  <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-2">
                    <Tag size={14} className="text-gray-500 mt-1 shrink-0" />
                    {entry.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="badge bg-white/5 text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state card mt-8">
          <div className="empty-state-icon">
            <Calendar size={40} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Blank canvas</h3>
          <p className="mb-6">
            You haven't written any journal entries yet. Reflection is key to retaining what you read.
          </p>
          <button className="btn btn-primary">Write First Entry</button>
        </div>
      )}
    </div>
  );
}
