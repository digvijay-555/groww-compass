import React from 'react';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  badge,
  action,
  className = '',
}) => {
  return (
    <div className={`mb-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {badge && (
            <span className="inline-block px-2.5 py-0.5 mb-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25">
              {badge}
            </span>
          )}
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-content-primary">
            {title}
          </h1>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {subtitle && (
        <p className="mt-1.5 text-xs sm:text-sm text-content-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
