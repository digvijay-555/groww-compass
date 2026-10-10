import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-default bg-surface-card hover:bg-surface-elevated text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 motion-safe:transition-transform motion-safe:hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500 motion-safe:transition-transform motion-safe:hover:-rotate-12" aria-hidden="true" />
      )}
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );
};
