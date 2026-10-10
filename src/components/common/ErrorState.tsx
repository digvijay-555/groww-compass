import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { SecondaryButton } from './SecondaryButton';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-content-primary my-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-rose-400">{title}</h4>
          <p className="mt-1 text-xs text-content-secondary leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <SecondaryButton
                onClick={onRetry}
                icon={RotateCcw}
                fullWidth={false}
                className="text-xs py-2 px-3 min-h-0"
              >
                Try Again
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
