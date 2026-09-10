import { Target, CheckCircle2, Circle } from 'lucide-react';
import type { Goal } from '../../lib/api';
import React from 'react';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
  onMilestoneToggle?: (milestoneId: number) => void;
}

export function GoalCard({ goal, onClick, onMilestoneToggle }: GoalCardProps) {
  const progress = goal.target_value > 0 ? (goal.current_value / goal.target_value) * 100 : 0;
  
  // Icon mapping placeholder (can be expanded based on the actual icon string from backend)
  const renderIcon = () => {
    return <Target size={20} />;
  };

  return (
    <div 
      className={`card goal-card border-l-4`}
      style={{ borderLeftColor: goal.color }}
      onClick={onClick}
    >
      <div className="goal-header">
        <div 
          className="goal-icon" 
          style={{ background: `${goal.color}20`, color: goal.color }}
        >
          {renderIcon()}
        </div>
        <div>
          <h3 className="font-semibold">{goal.title}</h3>
          <p className="text-xs text-gray-400 capitalize">{goal.category}</p>
        </div>
      </div>
      
      {goal.description && (
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{goal.description}</p>
      )}

      <div className="goal-progress">
        <div className="goal-progress-bar">
          <div 
            className="goal-progress-fill"
            style={{ width: `${progress}%`, background: goal.color }}
          />
        </div>
        <div className="goal-progress-text" style={{ color: goal.color }}>
          {goal.current_value} / {goal.target_value} {goal.unit === 'percent' ? '%' : goal.unit}
        </div>
      </div>

      {goal.milestones && goal.milestones.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Milestones</h4>
          <div className="space-y-2">
            {goal.milestones.slice(0, 3).map(milestone => (
              <div 
                key={milestone.id} 
                className="flex items-start gap-2 text-sm cursor-pointer hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onMilestoneToggle?.(milestone.id);
                }}
              >
                {milestone.completed ? (
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <Circle size={16} className="text-gray-500 mt-0.5 shrink-0" />
                )}
                <span className={milestone.completed ? 'text-gray-500 line-through' : 'text-gray-300'}>
                  {milestone.title}
                </span>
              </div>
            ))}
            {goal.milestones.length > 3 && (
              <div className="text-xs text-gray-500 italic pl-6">
                + {goal.milestones.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
