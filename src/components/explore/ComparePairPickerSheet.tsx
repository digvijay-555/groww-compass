import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InvestmentCategory } from '@/types/investment';
import { INVESTMENT_CATEGORIES } from '@/data/education/categories';
import { BottomSheet } from '@/components/common/BottomSheet';
import { SecondaryButton } from '@/components/common/SecondaryButton';

interface ComparePairPickerSheetProps {
  sourceCategory: InvestmentCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPair: (sourceId: string, targetId: string) => void;
}

export const ComparePairPickerSheet: React.FC<ComparePairPickerSheetProps> = ({
  sourceCategory,
  isOpen,
  onClose,
  onSelectPair,
}) => {
  if (!sourceCategory) return null;

  const otherCategories = INVESTMENT_CATEGORIES.filter(
    (cat) => cat.id !== sourceCategory.id
  );

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={`Compare ${sourceCategory.name}`}
      subtitle="Select another asset category to contrast side-by-side"
    >
      <div className="space-y-3">
        <p className="text-xs text-content-secondary leading-relaxed">
          Select which asset category you want to contrast against{' '}
          <strong>{sourceCategory.name}</strong> across all 8 dimensions:
        </p>

        <div className="space-y-2">
          {otherCategories.map((target) => {
            const supported = sourceCategory.supportedComparisons.find(
              (c) => c.targetId === target.id
            );

            return (
              <button
                key={target.id}
                type="button"
                onClick={() => onSelectPair(sourceCategory.id, target.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                  supported
                    ? 'bg-surface-elevated border-groww-emerald/30 hover:border-groww-emerald'
                    : 'bg-surface-card border-border-default hover:bg-surface-elevated'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-content-primary">
                      {target.name}
                    </span>
                    {supported && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25">
                        Popular Match
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-content-secondary line-clamp-1">
                    {supported ? supported.reason : target.shortDescription}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-surface-card border border-border-default flex items-center justify-center shrink-0 text-emerald-700 dark:text-groww-emerald motion-safe:hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </div>
      </div>
    </BottomSheet>
  );
};
