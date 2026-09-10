import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, BookOpen, Brain, Clock, ChevronRight, Play, Target } from 'lucide-react';
import { analyticsApi, aiApi, booksApi, goalsApi } from '../lib/api';
import type { ReadingStats, AIInsight, Book, Goal } from '../lib/api';
import { StatsCard } from '../components/Common/StatsCard';
import { ProgressRing } from '../components/Common/ProgressRing';
import { BookCard } from '../components/Books/BookCard';
import { GoalCard } from '../components/Growth/GoalCard';

export default function Dashboard() {
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [readingBooks, setReadingBooks] = useState<Book[]>([]);
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, insightsData, booksData, goalsData] = await Promise.all([
          analyticsApi.readingStats(),
          aiApi.getInsights(),
          booksApi.list({ status: 'reading' }),
          goalsApi.list('active')
        ]);
        setStats(statsData);
        setInsights(insightsData);
        setReadingBooks(booksData);
        setActiveGoals(goalsData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading dashboard...</div>;
  }

  const currentBook = readingBooks.length > 0 ? readingBooks[0] : null;
  const currentInsight = insights.length > 0 ? insights[0] : null;

  return (
    <div className="animate-fade-in">
      <div className="page-header flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            Welcome back, Alex <span className="text-2xl animate-pulse">👋</span>
          </h1>
          <p className="mt-2 text-gray-400">Here's a snapshot of your reading and growth journey.</p>
        </div>
        
        {stats && (
          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-flame">
            <Flame size={20} className="fill-amber-500" />
            <span className="font-bold">{stats.current_streak} Day Streak</span>
          </div>
        )}
      </div>

      {/* Top Stats Row */}
      <div className="grid-4 mb-8">
        <StatsCard 
          title="Books Finished" 
          value={stats?.books_finished || 0} 
          icon={BookOpen} 
          trend={12} 
          trendLabel="vs last month"
          colorClass="emerald"
        />
        <StatsCard 
          title="Pages Read" 
          value={stats?.total_pages_read || 0} 
          icon={BookOpen} 
          colorClass="amber"
        />
        <StatsCard 
          title="Reading Minutes" 
          value={stats?.total_reading_minutes || 0} 
          icon={Clock} 
          colorClass="cyan"
        />
        <StatsCard 
          title="Active Goals" 
          value={activeGoals.length} 
          icon={Target} 
          colorClass="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Currently Reading (takes 2 columns) */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-serif">Currently Reading</h2>
            <Link to="/library" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          {currentBook ? (
            <div className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-32 h-48 rounded-md overflow-hidden shadow-lg flex-shrink-0">
                {currentBook.cover_url ? (
                  <img src={currentBook.cover_url} alt={currentBook.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 text-center text-sm font-serif">
                    {currentBook.title}
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold mb-1">{currentBook.title}</h3>
                <p className="text-gray-400 mb-4">{currentBook.author}</p>
                
                <div className="flex items-center gap-6 mb-6">
                  <ProgressRing 
                    radius={30} 
                    stroke={4} 
                    progress={currentBook.total_pages > 0 ? (currentBook.current_page / currentBook.total_pages) * 100 : 0} 
                    colorClass="amber" 
                  />
                  <div>
                    <div className="text-sm text-gray-400">Progress</div>
                    <div className="font-semibold text-lg">{currentBook.current_page} <span className="text-gray-500 text-sm font-normal">/ {currentBook.total_pages} pages</span></div>
                  </div>
                </div>
                
                <div className="mt-auto flex gap-3">
                  <Link to="/reading/session" className="btn btn-primary">
                    <Play size={16} /> Continue Reading
                  </Link>
                  <Link to={`/books/${currentBook.id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center flex flex-col items-center">
              <BookOpen size={48} className="text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">You aren't reading anything right now</h3>
              <Link to="/library" className="btn btn-primary mt-2">Browse Library</Link>
            </div>
          )}
        </div>

        {/* AI Insight of the Day */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2">
            <Brain className="text-violet-500" /> AI Insight
          </h2>
          
          <div className="card border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)] flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain size={120} />
            </div>
            
            {currentInsight ? (
              <div className="relative z-10 flex flex-col h-full">
                <div className="badge badge-violet w-max mb-4">Daily Insight</div>
                <h3 className="text-lg font-bold mb-3">{currentInsight.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                  {currentInsight.content}
                </p>
                <Link to="/ai-coach" className="btn btn-secondary w-full justify-center">
                  Chat with Coach
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No insights available yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-serif">Growth Goals</h2>
          <Link to="/goals" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid-3">
          {activeGoals.slice(0, 3).map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
          {activeGoals.length === 0 && (
            <div className="col-span-3 card p-8 text-center text-gray-400">
              No active goals right now. <Link to="/goals" className="text-amber-500 hover:underline">Set a goal</Link> to start growing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
