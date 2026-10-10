import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export const MobileHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface-card/90 backdrop-blur-md border-b border-border-default transition-colors">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none rounded-xl py-1 px-1.5 -ml-1.5"
          aria-label="Groww Compass Home"
        >
          <div className="w-8 h-8 rounded-xl bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald flex items-center justify-center font-bold border border-groww-emerald/20">
            <Compass className="w-5 h-5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-content-primary">Groww</span>
              <span className="font-bold text-xs text-emerald-700 dark:text-groww-emerald uppercase tracking-wider">Compass</span>
            </div>
            <span className="text-[10px] text-content-muted leading-none font-medium">Discovery & Education Layer</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-groww-emerald/10 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/20">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Prototype
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
