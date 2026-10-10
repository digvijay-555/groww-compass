import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '@/types/common';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true" />;
    }
  };

  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-surface-elevated border border-border-default shadow-elevated text-content-primary motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 duration-200"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {getIcon()}
        <span className="text-xs sm:text-sm font-semibold leading-snug break-words">{toast.message}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="p-1 -mr-1 rounded-lg hover:bg-surface-card text-content-muted hover:text-content-primary focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none shrink-0"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
