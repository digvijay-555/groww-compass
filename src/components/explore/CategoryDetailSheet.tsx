import React from 'react';
import {
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Scale,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { InvestmentCategory } from '@/types/investment';
import { BottomSheet } from '@/components/common/BottomSheet';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { useIntent } from '@/context/IntentContext';

interface CategoryDetailSheetProps {
  category: InvestmentCategory | null;
  onClose: () => void;
  onStartComparison: (targetId: string) => void;
  onOpenHandoff: (label: string, url: string) => void;
}

export const CategoryDetailSheet: React.FC<CategoryDetailSheetProps> = ({
  category,
  onClose,
  onStartComparison,
  onOpenHandoff,
}) => {
  const { experienceLevel } = useIntent();

  if (!category) return null;

  const experienceNote = category.experienceLevelNotes[experienceLevel];

  return (
    <BottomSheet
      isOpen={!!category}
      onClose={onClose}
      title={category.name}
      subtitle={category.tagline}
    >
      <div className="space-y-4">
        {/* Tailored Experience Note */}
        <div className="p-3.5 rounded-2xl bg-groww-emerald/10 border border-groww-emerald/25 space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
            Tailored for your experience ({experienceLevel})
          </span>
          <p className="text-xs sm:text-sm text-content-primary leading-relaxed font-semibold">
            {experienceNote}
          </p>
        </div>

        {/* Structural Anatomy Details */}
        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
            <span className="font-bold text-content-muted uppercase tracking-wider text-[10px] block">
              What You Actually Own
            </span>
            <p className="text-content-primary font-medium leading-relaxed">
              {category.ownership}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              One Critical Consideration
            </span>
            <p className="text-content-secondary leading-relaxed font-medium">
              {category.importantConsideration}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
            <span className="font-bold text-content-muted uppercase tracking-wider text-[10px] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-content-muted" aria-hidden="true" />
              What Depends on the Provider or Product
            </span>
            <p className="text-content-secondary leading-relaxed">
              {category.dependsOnProviderNotice}
            </p>
          </div>
        </div>

        {/* Key Questions Checklist */}
        <div className="p-3.5 rounded-2xl bg-surface-card border border-border-default space-y-2">
          <span className="font-bold text-content-muted uppercase tracking-wider text-[10px] flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            Questions to Ask Before Choosing
          </span>
          <ul className="space-y-1.5 text-xs text-content-secondary">
            {category.keyQuestionsToAsk.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-700 dark:text-groww-emerald font-bold shrink-0">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Supported Comparison Suggestions */}
        {category.supportedComparisons.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="font-bold text-content-muted uppercase tracking-wider text-[10px] block">
              Compare this against another category
            </span>
            <div className="space-y-2">
              {category.supportedComparisons.map((comp) => (
                <button
                  key={comp.targetId}
                  type="button"
                  onClick={() => onStartComparison(comp.targetId)}
                  className="w-full text-left p-3 rounded-2xl bg-surface-elevated border border-border-default hover:border-groww-emerald/50 transition-colors flex items-center justify-between gap-2 group focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-bold text-content-primary group-hover:text-emerald-700 dark:group-hover:text-groww-emerald transition-colors block">
                      Compare with {comp.targetName}
                    </span>
                    <span className="text-[11px] text-content-muted line-clamp-1">
                      {comp.reason}
                    </span>
                  </div>
                  <Scale className="w-4 h-4 text-emerald-700 dark:text-groww-emerald shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex flex-col gap-2">
          <PrimaryButton
            onClick={() =>
              onOpenHandoff(category.growwDestination.label, category.growwDestination.path)
            }
            icon={ExternalLink}
          >
            {category.growwDestination.label}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close Overview</SecondaryButton>
        </div>
      </div>
    </BottomSheet>
  );
};
