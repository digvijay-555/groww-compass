import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Compass, Scale, BookOpen, Bookmark } from 'lucide-react';
import { useSavedComparisons } from '@/hooks/useSavedComparisons';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { savedItems } = useSavedComparisons();

  const isExploreActive = location.pathname === '/' || location.pathname === '/explore';

  const navItems = [
    {
      id: 'explore',
      label: 'Explore',
      path: '/explore',
      icon: Compass,
      isActive: isExploreActive,
    },
    {
      id: 'compare',
      label: 'Compare',
      path: '/compare',
      icon: Scale,
      isActive: location.pathname.startsWith('/compare'),
    },
    {
      id: 'learn',
      label: 'Learn',
      path: '/learn',
      icon: BookOpen,
      isActive: location.pathname.startsWith('/learn'),
    },
    {
      id: 'saved',
      label: 'Saved',
      path: '/saved',
      icon: Bookmark,
      badge: savedItems.length > 0 ? savedItems.length.toString() : undefined,
      isActive: location.pathname.startsWith('/saved'),
    },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-card/95 backdrop-blur-lg border-t border-border-default pb-safe transition-colors shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-touch min-w-touch py-1 px-1 rounded-2xl transition-all select-none relative focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                active
                  ? 'text-emerald-700 dark:text-groww-emerald font-bold'
                  : 'text-content-muted hover:text-content-primary'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 motion-safe:transition-transform ${
                    active ? 'motion-safe:scale-105 stroke-[2.4]' : 'stroke-2'
                  }`}
                  aria-hidden="true"
                />
                {item.badge && (
                  <span
                    aria-label={`${item.badge} saved comparisons`}
                    className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold bg-groww-emerald text-gray-950 shadow-sm"
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight leading-tight">{item.label}</span>
              {active && (
                <span
                  className="absolute bottom-1 w-5 h-0.5 rounded-full bg-emerald-600 dark:bg-groww-emerald motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-50 duration-150"
                  aria-hidden="true"
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
