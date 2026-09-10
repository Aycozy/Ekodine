/**
 * PageMind — API Client
 * Type-safe wrapper for all backend API calls.
 */

const API_BASE = 'http://localhost:8000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `API Error: ${res.status}`);
  }
  return res.json();
}

// ──────────── BOOKS ────────────
export interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string | null;
  genre: string | null;
  total_pages: number;
  current_page: number;
  status: 'want_to_read' | 'reading' | 'finished';
  rating: number | null;
  review: string | null;
  date_started: string | null;
  date_finished: string | null;
  created_at: string;
  notes: BookNote[];
}

export interface BookNote {
  id: number;
  book_id: number;
  content: string;
  note_type: 'note' | 'highlight' | 'takeaway';
  page_number: number | null;
  chapter: string | null;
  color: string;
  created_at: string;
}

export const booksApi = {
  list: (params?: { status?: string; genre?: string; search?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request<Book[]>(`/books${qs ? `?${qs}` : ''}`);
  },
  get: (id: number) => request<Book>(`/books/${id}`),
  create: (data: Partial<Book>) => request<Book>('/books', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Book>) => request<Book>(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/books/${id}`, { method: 'DELETE' }),
  getNotes: (bookId: number) => request<BookNote[]>(`/books/${bookId}/notes`),
  addNote: (bookId: number, data: Partial<BookNote>) => request<BookNote>(`/books/${bookId}/notes`, { method: 'POST', body: JSON.stringify(data) }),
};

// ──────────── READING SESSIONS ────────────
export interface ReadingSession {
  id: number;
  book_id: number;
  start_page: number;
  end_page: number;
  pages_read: number;
  duration_minutes: number;
  notes: string | null;
  mood: string | null;
  started_at: string;
  ended_at: string | null;
}

export const readingApi = {
  list: (bookId?: number) => {
    const qs = bookId ? `?book_id=${bookId}` : '';
    return request<ReadingSession[]>(`/reading/sessions${qs}`);
  },
  start: (bookId: number, startPage: number) => request<ReadingSession>('/reading/sessions', {
    method: 'POST', body: JSON.stringify({ book_id: bookId, start_page: startPage })
  }),
  end: (sessionId: number, data: { end_page: number; duration_minutes: number; notes?: string; mood?: string }) =>
    request<ReadingSession>(`/reading/sessions/${sessionId}`, { method: 'PUT', body: JSON.stringify(data) }),
  getActive: () => request<ReadingSession | null>('/reading/active'),
};

// ──────────── GOALS ────────────
export interface Goal {
  id: number;
  title: string;
  description: string | null;
  category: string;
  target_value: number;
  current_value: number;
  unit: string;
  status: 'active' | 'completed' | 'paused';
  deadline: string | null;
  icon: string;
  color: string;
  created_at: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: number;
  goal_id: number;
  title: string;
  completed: boolean;
  completed_at: string | null;
  order: number;
}

export const goalsApi = {
  list: (status?: string) => {
    const qs = status ? `?status=${status}` : '';
    return request<Goal[]>(`/goals${qs}`);
  },
  get: (id: number) => request<Goal>(`/goals/${id}`),
  create: (data: Partial<Goal>) => request<Goal>('/goals', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Goal>) => request<Goal>(`/goals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/goals/${id}`, { method: 'DELETE' }),
  toggleMilestone: (goalId: number, milestoneId: number) =>
    request<Milestone>(`/goals/${goalId}/milestones/${milestoneId}`, { method: 'PUT' }),
  addMilestone: (goalId: number, data: { title: string; order: number }) =>
    request<Milestone>(`/goals/${goalId}/milestones`, { method: 'POST', body: JSON.stringify(data) }),
};

// ──────────── JOURNAL ────────────
export interface JournalEntry {
  id: number;
  title: string | null;
  content: string;
  mood: string | null;
  tags: string[];
  book_id: number | null;
  created_at: string;
}

export const journalApi = {
  list: () => request<JournalEntry[]>('/journal'),
  get: (id: number) => request<JournalEntry>(`/journal/${id}`),
  create: (data: Partial<JournalEntry>) => request<JournalEntry>('/journal', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<JournalEntry>) => request<JournalEntry>(`/journal/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/journal/${id}`, { method: 'DELETE' }),
};

// ──────────── AI ────────────
export interface AIChatResponse {
  response: string;
  conversation_id: number;
  suggestions: string[];
}

export interface AIInsight {
  title: string;
  content: string;
  icon: string;
  category: string;
}

export interface AIRecommendation {
  title: string;
  author: string;
  genre: string;
  reason: string;
  cover_url: string | null;
  match_score: number;
}

export const aiApi = {
  chat: (message: string, conversationId?: number) =>
    request<AIChatResponse>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversation_id: conversationId })
    }),
  getRecommendations: () => request<AIRecommendation[]>('/ai/recommendations'),
  getInsights: () => request<AIInsight[]>('/ai/insights'),
  getConversations: () => request<Array<{ id: number; topic: string; message_count: number; preview: string }>>('/ai/conversations'),
};

// ──────────── ANALYTICS ────────────
export interface ReadingStats {
  total_books: number;
  books_finished: number;
  books_reading: number;
  total_pages_read: number;
  total_reading_minutes: number;
  current_streak: number;
  longest_streak: number;
  avg_pages_per_day: number;
  books_this_month: number;
  pages_this_week: number;
}

export interface GrowthStats {
  total_goals: number;
  active_goals: number;
  completed_goals: number;
  total_journal_entries: number;
  journal_this_week: number;
  growth_score: number;
  top_categories: Array<{ name: string; count: number }>;
}

export interface HeatmapDay {
  date: string;
  pages_read: number;
  sessions: number;
  level: number;
}

export const analyticsApi = {
  readingStats: () => request<ReadingStats>('/analytics/reading'),
  growthStats: () => request<GrowthStats>('/analytics/growth'),
  heatmap: (days = 365) => request<HeatmapDay[]>(`/analytics/heatmap?days=${days}`),
  weeklyChart: () => request<Array<{ day: string; date: string; pages: number }>>('/analytics/charts/weekly'),
  monthlyChart: () => request<Array<{ month: string; books: number }>>('/analytics/charts/monthly'),
  genreChart: () => request<Array<{ genre: string; count: number }>>('/analytics/charts/genres'),
};
