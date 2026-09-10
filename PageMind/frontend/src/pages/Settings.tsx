import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Sparkles, BookOpen } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [dailyGoal, setDailyGoal] = useState('30');
  
  // Fake toggle states
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    notifications: true,
    weekly_summary: true,
    daily_reminder: false,
    dark_mode: true,
    ai_proactive: true
  });

  const handleToggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold font-serif mb-2">Settings</h1>
        <p className="text-gray-400">Manage your preferences and personalize your experience.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="card p-2 flex flex-col gap-1">
            <button 
              className={`flex items-center gap-3 w-full p-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-amber-500/10 text-amber-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Profile & Goals
            </button>
            <button 
              className={`flex items-center gap-3 w-full p-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'ai' ? 'bg-amber-500/10 text-amber-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={18} /> AI Coach
            </button>
            <button 
              className={`flex items-center gap-3 w-full p-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-amber-500/10 text-amber-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              className={`flex items-center gap-3 w-full p-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-amber-500/10 text-amber-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Palette size={18} /> Appearance
            </button>
            <button 
              className={`flex items-center gap-3 w-full p-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-amber-500/10 text-amber-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => setActiveTab('account')}
            >
              <Shield size={18} /> Account & Data
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card animate-slide-up">
              <h2 className="text-xl font-bold font-serif mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">Profile & Reading Goals</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                  AR
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm mb-2">Change Avatar</button>
                  <p className="text-xs text-gray-400">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="form-group mb-0">
                  <label className="form-label">Display Name</label>
                  <input type="text" className="input" defaultValue="Alex Reader" />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="input" defaultValue="alex@pagemind.app" disabled />
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4">Reading Preferences</h3>
              
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <BookOpen size={16} className="text-amber-500" /> Daily Reading Goal (Pages)
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    step="5" 
                    className="flex-1 accent-amber-500" 
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                  />
                  <span className="font-bold text-xl w-12 text-center">{dailyGoal}</span>
                </div>
              </div>

              <div className="form-actions border-t border-[rgba(255,255,255,0.06)] pt-6 mt-6">
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="card animate-slide-up">
              <h2 className="text-xl font-bold font-serif mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
                <Sparkles size={20} className="text-violet-500" /> AI Coach Preferences
              </h2>
              
              <div className="form-group mb-6">
                <label className="form-label">Coaching Style</label>
                <select className="input select text-white">
                  <option value="encouraging">Encouraging & Supportive</option>
                  <option value="direct">Direct & Action-Oriented</option>
                  <option value="philosophical">Deep & Philosophical</option>
                  <option value="socratic">Socratic (Asks questions)</option>
                </select>
                <p className="text-xs text-gray-400 mt-2">This determines how the AI agent responds to your journal entries and chats.</p>
              </div>

              <div className="settings-section mt-8">
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Proactive Insights</div>
                    <div className="settings-row-desc">Allow the AI to generate insights without you asking.</div>
                  </div>
                  <div 
                    className={`toggle ${toggles.ai_proactive ? 'active' : ''}`}
                    onClick={() => handleToggle('ai_proactive')}
                  />
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <h4 className="font-bold text-violet-400 mb-2 flex items-center gap-2">
                  <Shield size={16} /> Privacy & Memory
                </h4>
                <p className="text-sm text-gray-300 mb-4">
                  The AI Coach remembers your reading history, goals, and conversations to provide better context. 
                  You can clear this memory at any time.
                </p>
                <button className="btn btn-secondary btn-sm text-rose-400 hover:text-rose-500 hover:border-rose-500/50">
                  Clear AI Memory
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card animate-slide-up">
              <h2 className="text-xl font-bold font-serif mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">Notifications</h2>
              
              <div className="settings-section">
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Push Notifications</div>
                    <div className="settings-row-desc">Enable notifications in this browser.</div>
                  </div>
                  <div 
                    className={`toggle ${toggles.notifications ? 'active' : ''}`}
                    onClick={() => handleToggle('notifications')}
                  />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Daily Reading Reminder</div>
                    <div className="settings-row-desc">Remind you to read if you haven't by 8:00 PM.</div>
                  </div>
                  <div 
                    className={`toggle ${toggles.daily_reminder ? 'active' : ''}`}
                    onClick={() => handleToggle('daily_reminder')}
                  />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Weekly Growth Summary</div>
                    <div className="settings-row-desc">Receive an AI-generated summary of your week.</div>
                  </div>
                  <div 
                    className={`toggle ${toggles.weekly_summary ? 'active' : ''}`}
                    onClick={() => handleToggle('weekly_summary')}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card animate-slide-up">
              <h2 className="text-xl font-bold font-serif mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">Appearance</h2>
              
              <div className="settings-section">
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Dark Mode</div>
                    <div className="settings-row-desc">PageMind looks best in dark mode.</div>
                  </div>
                  <div 
                    className={`toggle ${toggles.dark_mode ? 'active' : ''}`}
                    onClick={() => handleToggle('dark_mode')}
                  />
                </div>
                
                <div className="mt-8">
                  <label className="form-label mb-4">Accent Color</label>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-amber-500 ring-2 ring-amber-500 ring-offset-2 ring-offset-bg-card"></button>
                    <button className="w-10 h-10 rounded-full bg-emerald-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    <button className="w-10 h-10 rounded-full bg-violet-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    <button className="w-10 h-10 rounded-full bg-rose-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    <button className="w-10 h-10 rounded-full bg-cyan-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="card animate-slide-up">
              <h2 className="text-xl font-bold font-serif mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">Account & Data</h2>
              
              <div className="mb-8">
                <h3 className="font-bold mb-2">Export Data</h3>
                <p className="text-sm text-gray-400 mb-4">Download all your reading history, notes, and journal entries as a JSON file.</p>
                <button className="btn btn-secondary">Export My Data</button>
              </div>

              <div className="pt-6 border-t border-rose-500/20">
                <h3 className="font-bold text-rose-500 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
