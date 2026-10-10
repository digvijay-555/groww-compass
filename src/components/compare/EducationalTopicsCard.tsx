import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { EducationalTopicLink } from '@/types/comparison';
import { useJargonDrawer } from '@/context/JargonDrawerContext';

interface EducationalTopicsCardProps {
  topics: EducationalTopicLink[];
}

export const EducationalTopicsCard: React.FC<EducationalTopicsCardProps> = ({ topics }) => {
  const { openJargon } = useJargonDrawer();

  if (!topics || topics.length === 0) return null;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-groww-emerald/15 border border-groww-emerald/25">
          <BookOpen className="w-3 h-3 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
          Related Learning Topics
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-bold text-content-primary">
        Deepen Your Understanding
      </h3>

      <div className="space-y-2">
        {topics.map((topic, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => topic.termKey && openJargon(topic.termKey)}
            className="w-full text-left p-3 rounded-2xl bg-surface-elevated border border-border-default hover:border-groww-emerald/40 transition-colors flex items-center justify-between gap-3 group focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
          >
            <div className="min-w-0 pr-1">
              <span className="text-xs font-bold text-content-primary group-hover:text-emerald-700 dark:group-hover:text-groww-emerald transition-colors block">
                {topic.title}
              </span>
              <p className="text-[11px] text-content-secondary mt-0.5 line-clamp-1">
                {topic.description}
              </p>
            </div>

            <ChevronRight
              className="w-4 h-4 text-content-muted group-hover:text-emerald-700 dark:group-hover:text-groww-emerald shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
