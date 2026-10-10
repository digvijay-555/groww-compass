import React from 'react';
import { Sparkles, Bookmark, BookmarkCheck, Scale } from 'lucide-react';
import { PairComparison } from '@/types/comparison';
import { useSavedComparisons } from '@/hooks/useSavedComparisons';
import { useToast } from '@/context/ToastContext';

interface ComparisonSummaryCardProps {
  comparison: PairComparison;
}

export const ComparisonSummaryCard: React.FC<ComparisonSummaryCardProps> = ({
  comparison,
}) => {
  const { isSaved, saveComparison, removeComparison, savedItems } = useSavedComparisons();
  const { showToast } = useToast();

  const saved = isSaved(comparison.categoryAId, comparison.categoryBId);

  const catAName =
    comparison.categoryAId === 'index-funds'
      ? 'Index Funds'
      : comparison.categoryAId === 'stocks'
        ? 'Individual Stocks'
        : comparison.dimensions[0]?.sideA.categoryName || comparison.categoryAId;
  const catBName =
    comparison.categoryBId === 'etfs'
      ? 'ETFs'
      : comparison.categoryBId === 'equity-mf'
        ? 'Equity Mutual Funds'
        : comparison.dimensions[0]?.sideB.categoryName || comparison.categoryBId;

  const handleToggleSave = () => {
    if (saved) {
      const existing = savedItems.find(
        (item) =>
          (item.categoryAId === comparison.categoryAId &&
            item.categoryBId === comparison.categoryBId) ||
          (item.categoryAId === comparison.categoryBId &&
            item.categoryBId === comparison.categoryAId)
      );
      if (existing) {
        removeComparison(existing.id);
        showToast('Removed from saved comparisons', 'info');
      }
    } else {
      saveComparison(
        comparison.categoryAId,
        comparison.categoryBId,
        catAName,
        catBName,
        comparison.coreTradeOff || comparison.conciseSummary
      );
      showToast('Saved comparison to your Saved hub!', 'success');
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25 inline-flex items-center gap-1">
            <Scale className="w-3 h-3 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
            Comparison Overview
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-content-primary mt-1.5 leading-snug">
            {comparison.title}
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary mt-1 leading-relaxed">
            {comparison.conciseSummary}
          </p>
        </div>

        {/* Save / Bookmark Button */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={saved ? 'Remove saved comparison' : 'Save this comparison'}
          title={saved ? 'Saved' : 'Save comparison'}
          className={`w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-default flex items-center justify-center shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
            saved
              ? 'bg-groww-emerald text-gray-950 font-bold border-groww-emerald shadow-sm'
              : 'bg-surface-elevated hover:bg-surface-card text-content-secondary'
          }`}
        >
          {saved ? (
            <BookmarkCheck className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Bookmark className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Visual Comparison Cards for the 2 Selected Categories */}
      <div className="grid grid-cols-2 gap-2.5 pt-0.5">
        <div className="p-3 rounded-2xl bg-surface-elevated border-l-4 border-l-groww-emerald border border-border-default space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider">
              Option 1
            </span>
            <span className="w-2 h-2 rounded-full bg-groww-emerald" />
          </div>
          <div className="font-extrabold text-xs sm:text-sm text-content-primary truncate">
            {catAName}
          </div>
          <span className="text-[10px] text-content-muted block">Direct Focus</span>
        </div>

        <div className="p-3 rounded-2xl bg-surface-elevated border-l-4 border-l-sky-500 border border-border-default space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
              Option 2
            </span>
            <span className="w-2 h-2 rounded-full bg-sky-400" />
          </div>
          <div className="font-extrabold text-xs sm:text-sm text-content-primary truncate">
            {catBName}
          </div>
          <span className="text-[10px] text-content-muted block">Pooled Structure</span>
        </div>
      </div>

      {/* Core Trade-Off Banner */}
      <div className="p-3.5 rounded-2xl bg-surface-elevated border border-groww-emerald/25 space-y-1 text-xs">
        <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
          The Fundamental Trade-Off
        </span>
        <p className="text-content-primary font-medium leading-relaxed">
          {comparison.coreTradeOff}
        </p>
      </div>
    </div>
  );
};
