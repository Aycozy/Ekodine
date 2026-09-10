import { TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  trendLabel?: string;
  colorClass?: string; // e.g. 'amber', 'emerald', 'violet'
}

export function StatsCard({ title, value, icon: Icon, trend, trendLabel, colorClass = 'amber' }: StatsCardProps) {
  return (
    <div className={`card card-glow-${colorClass} stats-card`}>
      <div className={`stats-icon bg-${colorClass}-500/10 text-${colorClass}-500`}>
        <Icon size={24} style={{ color: `var(--accent-${colorClass})` }} />
      </div>
      <div>
        <div className="stats-value">{value}</div>
        <div className="stats-label">{title}</div>
        {trend !== undefined && (
          <div className={`stats-trend ${trend >= 0 ? 'up' : 'down'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(trend)}% {trendLabel || 'vs last week'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
