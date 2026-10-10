import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon: Icon,
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 min-h-touch rounded-2xl text-sm font-semibold tracking-wide border border-border-default bg-surface-card hover:bg-surface-elevated text-content-primary transition-all motion-safe:active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-visible:ring-2 focus-visible:ring-groww-emerald focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-card focus:outline-none ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0 stroke-[2.2]" aria-hidden="true" />}
      <span className="truncate">{children}</span>
    </button>
  );
};
