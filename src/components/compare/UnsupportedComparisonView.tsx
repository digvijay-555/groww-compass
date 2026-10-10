import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Compass } from 'lucide-react';
import { UnsupportedAlternative } from '@/types/comparison';
import { SecondaryButton } from '@/components/common/SecondaryButton';

interface UnsupportedComparisonViewProps {
  alternative?: UnsupportedAlternative;
  unsupportedInfo?: UnsupportedAlternative;
  onSelectPair: (catA: string, catB: string) => void;
  onBrowseCategories?: () => void;
}

export const UnsupportedComparisonView: React.FC<UnsupportedComparisonViewProps> = ({
  alternative,
  unsupportedInfo,
  onSelectPair,
  onBrowseCategories,
}) => {
  const navigate = useNavigate();
  const data = unsupportedInfo || alternative;

  if (!data) return null;

  const handleBrowse = onBrowseCategories || (() => navigate('/explore'));

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-surface-card border border-amber-500/30 shadow-soft space-y-4">
      {/* Alert Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
            Pedagogical Notice
          </span>
          <h3 className="text-base sm:text-lg font-bold text-content-primary leading-tight mt-0.5">
            Unsupported Comparison Pair
          </h3>
        </div>
      </div>

      {/* Honest Limitation Explanation */}
      <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default text-xs sm:text-sm text-content-secondary leading-relaxed">
        {data.reason}
      </div>

      {/* Recommended Supported Alternatives */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-content-primary uppercase tracking-wider block">
          Recommended Supported Alternatives:
        </span>

        <div className="space-y-2">
          {data.suggestedPairs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPair(item.pair[0], item.pair[1])}
              className="w-full text-left p-3.5 rounded-2xl bg-surface-elevated border border-border-default hover:border-groww-emerald transition-all flex items-center justify-between gap-3 group focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
            >
              <div className="min-w-0 pr-2">
                <span className="text-xs sm:text-sm font-bold text-content-primary group-hover:text-emerald-700 dark:group-hover:text-groww-emerald transition-colors block">
                  {item.label}
                </span>
                <p className="text-xs text-content-secondary mt-0.5 line-clamp-1">
                  {item.description}
                </p>
              </div>

              <div className="w-8 h-8 rounded-xl bg-surface-card border border-border-default flex items-center justify-center shrink-0 text-emerald-700 dark:text-groww-emerald motion-safe:group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Return to Discovery button */}
      <div className="pt-2">
        <SecondaryButton onClick={handleBrowse} icon={Compass}>
          Browse All 5 Categories in Discovery
        </SecondaryButton>
      </div>
    </div>
  );
};
