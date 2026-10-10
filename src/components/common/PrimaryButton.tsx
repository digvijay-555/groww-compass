import React from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon: Icon,
  isLoading = false,
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 min-h-touch rounded-2xl text-sm font-bold tracking-wide bg-groww-emerald hover:bg-groww-emerald-hover text-gray-950 shadow-soft transition-all motion-safe:active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-visible:ring-2 focus-visible:ring-groww-emerald focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-card focus:outline-none ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0 stroke-[2.4]" aria-hidden="true" />
      ) : null}
      <span className="truncate">{children}</span>
    </button>
  );
};
