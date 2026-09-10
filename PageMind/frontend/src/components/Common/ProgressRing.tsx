import React from 'react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  colorClass?: string;
}

export function ProgressRing({ radius, stroke, progress, colorClass = 'amber' }: ProgressRingProps) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring">
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          className="progress-ring-track"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="progress-ring-fill"
          stroke={`var(--accent-${colorClass})`}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="progress-ring-text" style={{ color: `var(--accent-${colorClass})` }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
