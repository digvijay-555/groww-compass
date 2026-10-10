import React from 'react';

interface MobileDevicePreviewProps {
  children: React.ReactNode;
}

export const MobileDevicePreview: React.FC<MobileDevicePreviewProps> = ({ children }) => {
  return (
    <div className="w-full h-screen h-[100dvh] sm:h-screen sm:max-h-screen flex flex-col items-center justify-start sm:justify-center bg-surface-bg sm:bg-slate-950 dark:bg-surface-bg sm:dark:bg-slate-950 text-content-primary overflow-x-hidden overflow-y-hidden sm:overflow-hidden sm:select-none transition-colors selection:bg-groww-emerald/20 selection:text-content-primary p-0 sm:p-3 md:p-4">
      {/* Subtle Desktop Presentational Header Bar (Desktop Only) */}
      <header
        className="hidden sm:flex items-center justify-between w-full max-w-[420px] mb-2 px-3 text-[11px] text-slate-400 shrink-0"
        aria-label="Desktop Preview Controls"
      >
        <span className="flex items-center gap-1.5 font-bold text-emerald-400 dark:text-groww-emerald tracking-wide">
          <span className="w-2 h-2 rounded-full bg-groww-emerald animate-pulse" aria-hidden="true" />
          Interactive Mobile Prototype
        </span>
        <span className="text-slate-500 font-medium">Scroll inside device</span>
      </header>

      {/* Realistic Smartphone Chassis Frame */}
      <div
        className="relative w-full h-full min-h-0 sm:w-[410px] sm:h-[min(844px,calc(100vh-3.5rem))] sm:rounded-[52px] bg-surface-bg sm:bg-neutral-900 border-0 sm:border-[10px] sm:border-neutral-800 shadow-none sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12),0_0_0_4px_rgba(23,23,23,0.8)] flex flex-col overflow-hidden"
        aria-label="Smartphone frame viewport"
      >
        {/* Physical hardware side buttons (desktop only) */}
        <div
          className="hidden sm:block absolute -left-[14px] top-24 w-1 h-7 bg-neutral-700 rounded-l transition-opacity"
          aria-hidden="true"
        />
        <div
          className="hidden sm:block absolute -left-[14px] top-36 w-1 h-12 bg-neutral-700 rounded-l transition-opacity"
          aria-hidden="true"
        />
        <div
          className="hidden sm:block absolute -left-[14px] top-52 w-1 h-12 bg-neutral-700 rounded-l transition-opacity"
          aria-hidden="true"
        />
        <div
          className="hidden sm:block absolute -right-[14px] top-36 w-1 h-16 bg-neutral-700 rounded-r transition-opacity"
          aria-hidden="true"
        />

        {/* Dynamic Island Notch Pill (desktop only) */}
        <div
          className="hidden sm:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-28 h-6 bg-black rounded-full items-center justify-between px-2.5 shadow-md pointer-events-none"
          aria-hidden="true"
        >
          {/* Camera lens reflection */}
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900/50" />
          </div>
          {/* Micro acoustic / sensor slot */}
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-neutral-700/60" />
          </div>
        </div>

        {/* Phone Screen Area: Containing block for all fixed/absolute elements */}
        <div
          id="phone-screen-container"
          className="relative w-full h-full min-h-0 flex-1 sm:rounded-[42px] overflow-hidden bg-surface-bg text-content-primary flex flex-col [transform:translateZ(0)]"
        >
          {/* Simulated Mobile Status Bar (desktop only) */}
          <div
            className="hidden sm:flex items-center justify-between px-7 pt-3.5 pb-1 text-[11px] font-semibold text-content-secondary shrink-0 select-none pointer-events-none z-40 bg-surface-card/70 backdrop-blur-md border-b border-border-default/40"
            aria-hidden="true"
          >
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-content-secondary">
              <span className="text-[10px] font-bold">5G</span>
              {/* Cellular bars */}
              <svg className="w-3.5 h-3.5 text-current" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="16" width="3" height="6" rx="1" />
                <rect x="7" y="12" width="3" height="10" rx="1" />
                <rect x="12" y="8" width="3" height="14" rx="1" />
                <rect x="17" y="4" width="3" height="18" rx="1" />
              </svg>
              {/* Battery indicator */}
              <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Dedicated Portal Mount for In-Phone Overlays (BottomSheets, Modals, Toasts) */}
          <div
            id="phone-screen-portal"
            className="absolute inset-0 pointer-events-none z-50 overflow-hidden sm:rounded-[42px]"
          />

          {/* Actual Scrollable Content Viewport */}
          <div
            id="phone-scroll-viewport"
            className="flex-1 min-h-0 w-full h-full overflow-y-auto overflow-x-hidden relative overscroll-y-contain focus:outline-none scroll-smooth [-webkit-overflow-scrolling:touch] [touch-action:pan-y]"
            tabIndex={0}
            role="region"
            aria-label="Mobile app screen content"
          >
            {children}
          </div>

          {/* Bottom Home Indicator Bar (desktop only) */}
          <div
            className="hidden sm:flex absolute bottom-1.5 left-1/2 -translate-x-1/2 items-center justify-center pointer-events-none z-50"
            aria-hidden="true"
          >
            <div className="w-32 h-1 bg-content-muted/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
