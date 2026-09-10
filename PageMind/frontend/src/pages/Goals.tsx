import React, { useEffect, useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { goalsApi } from '../lib/api';
import type { Goal } from '../lib/api';
import { GoalCard } from '../components/Growth/GoalCard';

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    loadGoals();
  }, [activeTab]);

  async function loadGoals() {
    setLoading(true);
    try {
      const data = await goalsApi.list(activeTab);
      setGoals(data);
    } catch (error) {
      console.error("Failed to load goals", error);
    } finally {
      setLoading(false);
    }
  }

  const handleMilestoneToggle = async (goalId: number, milestoneId: number) => {
    try {
      await goalsApi.toggleMilestone(goalId, milestoneId);
      // Reload goals to reflect updated milestone and potentially completed goal status
      loadGoals();
    } catch (error) {
      console.error("Failed to toggle milestone", error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-2">Growth Goals</h1>
          <p className="text-gray-400">Track your personal development and turn reading into action.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> New Goal
        </button>
      </div>

      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Goals
        </div>
        <div 
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading goals...</div>
      ) : goals.length > 0 ? (
        <div className="grid-3">
          {goals.map((goal, i) => (
            <div key={goal.id} className={`stagger-${(i % 3) + 1} animate-slide-up`}>
              <GoalCard 
                goal={goal} 
                onMilestoneToggle={(mId) => handleMilestoneToggle(goal.id, mId)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <Target size={40} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">No goals found</h3>
          <p className="mb-6">
            {activeTab === 'active' 
              ? "You haven't set any growth goals yet. Goals help you apply what you read." 
              : "You haven't completed any goals yet. Keep going!"}
          </p>
          {activeTab === 'active' && (
            <button className="btn btn-primary">Create Your First Goal</button>
          )}
        </div>
      )}
    </div>
  );
}
