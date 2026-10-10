import React from 'react';

export const LoadingState: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="space-y-4 animate-pulse w-full py-2"
    >
      <div className="h-6 w-1/3 bg-surface-elevated rounded-lg" />
      <div className="h-4 w-2/3 bg-surface-elevated/70 rounded-md" />

      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-border-default bg-surface-card space-y-2.5"
          >
            <div className="h-4 w-1/4 bg-surface-elevated rounded" />
            <div className="h-3 w-5/6 bg-surface-elevated/70 rounded" />
            <div className="h-3 w-1/2 bg-surface-elevated/50 rounded" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};
