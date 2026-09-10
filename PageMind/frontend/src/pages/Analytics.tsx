import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { BookOpen, Target, Brain, Calendar, TrendingUp } from 'lucide-react';
import { analyticsApi } from '../lib/api';
import type { ReadingStats, GrowthStats, HeatmapDay } from '../lib/api';
import { StatsCard } from '../components/Common/StatsCard';
import { ReadingHeatmap } from '../components/Common/ReadingHeatmap';

export default function Analytics() {
  const [readingStats, setReadingStats] = useState<ReadingStats | null>(null);
  const [growthStats, setGrowthStats] = useState<GrowthStats | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [rStats, gStats, heatmap, weekly, monthly] = await Promise.all([
          analyticsApi.readingStats(),
          analyticsApi.growthStats(),
          analyticsApi.heatmap(),
          analyticsApi.weeklyChart(),
          analyticsApi.monthlyChart()
        ]);
        setReadingStats(rStats);
        setGrowthStats(gStats);
        setHeatmapData(heatmap);
        
        // Reverse weekly and monthly to be chronological (assuming API returns latest first)
        setWeeklyData([...weekly].reverse());
        setMonthlyData([...monthly].reverse());
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading analytics...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold font-serif mb-2">Analytics</h1>
        <p className="text-gray-400">Deep dive into your reading habits and personal growth trajectory.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card border-t-4 border-t-amber-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
              <BookOpen size={24} />
            </div>
            <h2 className="text-xl font-bold">Reading Profile</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Average Pace</div>
              <div className="text-2xl font-bold">{readingStats?.avg_pages_per_day} <span className="text-base font-normal text-gray-400">pg/day</span></div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Longest Streak</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                {readingStats?.longest_streak} <span className="text-base font-normal text-gray-400">days</span>
                <TrendingUp size={16} className="text-amber-500" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Books This Month</div>
              <div className="text-2xl font-bold">{readingStats?.books_this_month}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Completion Rate</div>
              <div className="text-2xl font-bold">
                {readingStats?.total_books ? Math.round((readingStats.books_finished / readingStats.total_books) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="card border-t-4 border-t-emerald-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500">
              <Brain size={24} />
            </div>
            <h2 className="text-xl font-bold">Growth Metrics</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Growth Score</div>
              <div className="text-3xl font-bold text-emerald-500">{growthStats?.growth_score}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Goals Completed</div>
              <div className="text-2xl font-bold">{growthStats?.completed_goals} <span className="text-base font-normal text-gray-400">/ {growthStats?.total_goals}</span></div>
            </div>
            <div className="col-span-2 mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <div className="text-sm text-gray-400 mb-2">Top Focus Areas</div>
              <div className="flex flex-wrap gap-2">
                {growthStats?.top_categories.map((cat, idx) => (
                  <span key={idx} className="badge bg-white/5 text-gray-300 capitalize">{cat.name} ({cat.count})</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="font-serif text-xl mb-6">Reading Activity (365 Days)</h3>
        <ReadingHeatmap data={heatmapData} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="font-serif text-xl mb-6">Pages Read (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b6b80', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b6b80', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="pages" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === weeklyData.length - 1 ? 'var(--accent-amber)' : 'var(--accent-amber-glow)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="font-serif text-xl mb-6">Books Finished (Last 6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b6b80', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b6b80', fontSize: 12 }} allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="books" fill="var(--accent-violet)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
