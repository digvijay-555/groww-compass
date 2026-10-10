import React from 'react';
import { BookmarkX } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = BookmarkX,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 my-6 rounded-2xl border border-dashed border-border-default bg-surface-card/50 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-border-default text-content-muted flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 stroke-[1.5]" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-content-primary mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-content-secondary max-w-xs mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="w-full max-w-xs">
          <PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>
        </div>
      )}
    </div>
  );
};
