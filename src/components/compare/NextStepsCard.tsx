import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ComparisonNextStep } from '@/types/comparison';
import { getCategoryById } from '@/data/education/categories';
import { SecondaryButton } from '@/components/common/SecondaryButton';

interface NextStepsCardProps {
  nextSteps: ComparisonNextStep[];
  onOpenHandoff: (label: string, url: string) => void;
}

export const NextStepsCard: React.FC<NextStepsCardProps> = ({
  nextSteps,
  onOpenHandoff,
}) => {
  if (!nextSteps || nextSteps.length === 0) return null;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-3">
      <div>
        <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
          Next Steps & Exploration
        </span>
        <h3 className="text-sm sm:text-base font-bold text-content-primary mt-0.5">
          Ready to Explore Further?
        </h3>
        <p className="text-xs text-content-secondary mt-0.5 leading-relaxed">
          Follow verified links to explore live schemes and real securities on Groww.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {nextSteps.map((step, idx) => {
          const category = step.targetCategory ? getCategoryById(step.targetCategory) : null;
          const url = category?.growwDestination.path || 'https://groww.in';
          const label = step.label;

          return (
            <SecondaryButton
              key={idx}
              onClick={() => onOpenHandoff(label, url)}
              icon={ExternalLink}
              className="text-xs py-2.5 text-left justify-between"
            >
              <span className="truncate pr-1">{label}</span>
            </SecondaryButton>
          );
        })}
      </div>
    </div>
  );
};
