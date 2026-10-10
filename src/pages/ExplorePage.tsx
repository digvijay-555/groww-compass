import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Scale,
  BookOpen,
  ShieldAlert,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PageHeading } from '@/components/common/PageHeading';
import { INVESTMENT_CATEGORIES } from '@/data/education/categories';
import { InvestmentCategory } from '@/types/investment';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { useIntent } from '@/context/IntentContext';
import { USER_INTENTS, EXPERIENCE_LEVELS } from '@/data/intent/options';
import { CategoryDetailSheet } from '@/components/explore/CategoryDetailSheet';
import { ComparePairPickerSheet } from '@/components/explore/ComparePairPickerSheet';
import { PrototypeHandoffModal } from '@/components/common/PrototypeHandoffModal';
import { CategoryConceptDiagram } from '@/components/visuals/CategoryConceptDiagram';
import { HoldingComparisonDiagram } from '@/components/visuals/HoldingComparisonDiagram';

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const { intent, experienceLevel } = useIntent();

  const [selectedCategoryForDetail, setSelectedCategoryForDetail] =
    useState<InvestmentCategory | null>(null);
  const [selectedCategoryForCompare, setSelectedCategoryForCompare] =
    useState<InvestmentCategory | null>(null);
  const [handoffTarget, setHandoffTarget] = useState<{ label: string; url: string } | null>(null);
  const [showHoldingModel, setShowHoldingModel] = useState<boolean>(false);

  const selectedIntentObj = USER_INTENTS.find((i) => i.id === intent);
  const selectedExpObj = EXPERIENCE_LEVELS.find((l) => l.id === experienceLevel);

  const handleStartComparison = (sourceId: string, targetId: string) => {
    setSelectedCategoryForCompare(null);
    setSelectedCategoryForDetail(null);
    navigate(`/compare?a=${sourceId}&b=${targetId}`);
  };

  return (
    <div className="space-y-5">
      {/* Active User Intent Banner with Change / Back action */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-elevated border border-border-default flex items-center justify-between gap-3 text-xs">
        <div className="min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-groww-emerald font-bold uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Your Selected Intent</span>
          </div>
          <p className="text-content-primary font-bold truncate mt-0.5">
            {selectedIntentObj?.label || 'Exploring Investment Options'}
          </p>
          <span className="text-[11px] text-content-muted">
            Depth: {selectedExpObj?.label || 'New to investing'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border-default bg-surface-card hover:bg-surface-elevated text-emerald-700 dark:text-groww-emerald focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none transition-colors"
        >
          Change
        </button>
      </div>

      <PageHeading
        badge="Investment Discovery"
        title="5 Core Asset Categories"
        subtitle="Explore what you own, key considerations, and how they contrast. No option is universally best—each fits different goals."
      />

      {/* Visual Mental Model Accordion Toggle */}
      <div className="rounded-2xl border border-border-default bg-surface-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowHoldingModel(!showHoldingModel)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-surface-elevated transition-colors text-xs font-semibold focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
        >
          <span className="flex items-center gap-2 text-emerald-700 dark:text-groww-emerald font-bold">
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>See Core Difference: Single Stock vs. Diversified Fund</span>
          </span>
          {showHoldingModel ? (
            <ChevronUp className="w-4 h-4 text-content-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-content-muted" />
          )}
        </button>
        {showHoldingModel && (
          <div className="p-3 border-t border-border-default bg-surface-elevated">
            <HoldingComparisonDiagram interactive={true} />
          </div>
        )}
      </div>

      {/* 5 Visual Category Cards */}
      <div className="space-y-4 pb-8">
        {INVESTMENT_CATEGORIES.map((category) => {
          return (
            <article
              key={category.id}
              className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-3.5 transition-all hover:border-border-default/80"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25">
                    {category.badge}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-content-primary mt-1.5 leading-tight">
                    {category.name}
                  </h2>
                  <p className="text-xs text-content-muted mt-0.5 font-medium">
                    {category.tagline}
                  </p>
                </div>
              </div>

              {/* One-Sentence Plain-English Definition */}
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                {category.shortDescription}
              </p>

              {/* Concept Diagram (Visual Explanation) */}
              <CategoryConceptDiagram categoryId={category.id} />

              {/* What The Investor Generally Owns */}
              <div className="p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-content-muted block tracking-wider">
                  What You Own:
                </span>
                <p className="text-content-primary font-medium leading-relaxed">
                  {category.ownership}
                </p>
              </div>

              {/* One Important Consideration (Key Thing to Know) */}
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Key Thing to Know:
                </span>
                <p className="text-content-primary leading-relaxed font-medium">
                  {category.importantConsideration}
                </p>
              </div>

              {/* Provider Dependency Notice */}
              <p className="text-[11px] text-content-muted italic leading-relaxed">
                * Note: Specific metrics (charges, minimums, exit loads, tracking error) depend on the
                specific scheme, security, or provider chosen.
              </p>

              {/* Actions Row: Learn More & Compare */}
              <div className="pt-1 grid grid-cols-2 gap-2.5">
                <SecondaryButton
                  onClick={() => setSelectedCategoryForDetail(category)}
                  icon={BookOpen}
                  className="text-xs py-2.5 font-semibold"
                >
                  Learn More
                </SecondaryButton>

                <PrimaryButton
                  onClick={() => setSelectedCategoryForCompare(category)}
                  icon={Scale}
                  className="text-xs py-2.5 font-bold"
                >
                  Compare
                </PrimaryButton>
              </div>
            </article>
          );
        })}
      </div>

      {/* Category Detail Sheet (Learn More) */}
      {selectedCategoryForDetail && (
        <CategoryDetailSheet
          category={selectedCategoryForDetail}
          onClose={() => setSelectedCategoryForDetail(null)}
          onStartComparison={(targetId) =>
            handleStartComparison(selectedCategoryForDetail.id, targetId)
          }
          onOpenHandoff={(label, url) => {
            setSelectedCategoryForDetail(null);
            setHandoffTarget({ label, url });
          }}
        />
      )}

      {/* Compare Pair Picker Sheet */}
      {selectedCategoryForCompare && (
        <ComparePairPickerSheet
          sourceCategory={selectedCategoryForCompare}
          isOpen={!!selectedCategoryForCompare}
          onClose={() => setSelectedCategoryForCompare(null)}
          onSelectPair={(sourceId, targetId) => handleStartComparison(sourceId, targetId)}
        />
      )}

      {/* Prototype Handoff Modal */}
      {handoffTarget && (
        <PrototypeHandoffModal
          isOpen={!!handoffTarget}
          onClose={() => setHandoffTarget(null)}
          targetLabel={handoffTarget.label}
          targetUrl={handoffTarget.url}
        />
      )}
    </div>
  );
};
