import React from 'react';

interface HeatmapDay {
  date: string;
  pages_read: number;
  sessions: number;
  level: number;
}

interface ReadingHeatmapProps {
  data: HeatmapDay[];
}

export function ReadingHeatmap({ data }: ReadingHeatmapProps) {
  // Ensure we have exactly 365 days of data, or pad if necessary
  const processedData = [...data].reverse(); // Usually comes latest first, we want oldest first for left-to-right

  return (
    <div className="heatmap-container">
      <div className="flex gap-2 items-end mb-2 text-xs text-gray-500">
        <div className="w-8">Mon</div>
        <div className="w-8">Wed</div>
        <div className="w-8">Fri</div>
        <div className="flex-1 text-right">Activity over the last year</div>
      </div>
      
      <div className="heatmap-grid">
        {processedData.map((day, idx) => (
          <div 
            key={idx}
            className="heatmap-cell"
            data-level={day.level}
            title={`${new Date(day.date).toLocaleDateString()}: ${day.pages_read} pages`}
          />
        ))}
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="heatmap-cell" data-level="0"></div>
        <div className="heatmap-cell" data-level="1"></div>
        <div className="heatmap-cell" data-level="2"></div>
        <div className="heatmap-cell" data-level="3"></div>
        <div className="heatmap-cell" data-level="4"></div>
        <span>More</span>
      </div>
    </div>
  );
}
