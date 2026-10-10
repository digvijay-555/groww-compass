import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  label,
  onClick,
  className = '',
  size = 'md',
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={`Learn more about ${label}`}
      title={`Explain ${label}`}
      className={`inline-flex items-center justify-center rounded-full text-content-muted hover:text-groww-emerald focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none transition-colors group p-2 -m-2 ${className}`}
    >
      <HelpCircle
        className={`${
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
        } transition-transform group-hover:scale-110`}
        aria-hidden="true"
      />
      <span className="sr-only">Learn more about {label}</span>
    </button>
  );
};
