import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Info, ShieldAlert } from 'lucide-react';
import { DimensionComparisonDetail } from '@/types/comparison';
import { useJargonDrawer } from '@/context/JargonDrawerContext';
import { getWhyAmISeeingThisContext } from '@/data/education/contextualReasons';
import { HoldingComparisonDiagram } from '@/components/visuals/HoldingComparisonDiagram';

interface DimensionAccordionCardProps {
  dimension: DimensionComparisonDetail;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const DimensionAccordionCard: React.FC<DimensionAccordionCardProps> = ({
  dimension,
  index,
  isOpen,
  onToggle,
}) => {
  const { openJargon, openWhyAmISeeingThis } = useJargonDrawer();

  return (
    <article className="rounded-3xl bg-surface-card border border-border-default shadow-soft overflow-hidden transition-all">
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`dimension-panel-${dimension.dimensionKey}`}
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 hover:bg-surface-elevated/50 transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none min-h-touch"
      >
        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted">
              Dimension {index + 1} of 8
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-content-primary mt-0.5 leading-snug">
            {dimension.title}
          </h3>
          <p className="text-xs text-content-secondary mt-0.5">
            {dimension.shortQuestion}
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center shrink-0 text-content-secondary mt-1">
          {isOpen ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Accordion Collapsible Body */}
      {isOpen && (
        <div
          id={`dimension-panel-${dimension.dimensionKey}`}
          className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3.5 border-t border-border-default/60 pt-3 motion-safe:animate-in motion-safe:fade-in duration-200"
        >
          {/* Why It Matters Callout + Contextual 'Why am I seeing this?' action */}
          <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
                Why this dimension matters
              </span>

              <button
                type="button"
                onClick={() =>
                  openWhyAmISeeingThis(
                    getWhyAmISeeingThisContext(
                      dimension.dimensionKey,
                      dimension.title,
                      dimension.sideA.categoryName,
                      dimension.sideB.categoryName
                    )
                  )
                }
                aria-label={`Why am I seeing the ${dimension.title} comparison?`}
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border-default text-emerald-700 dark:text-groww-emerald hover:border-groww-emerald focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none transition-colors"
              >
                <span>Why am I seeing this?</span>
              </button>
            </div>
            <p className="text-content-secondary leading-relaxed">
              {dimension.whyItMatters}
            </p>
          </div>

          {/* Interactive Mental Model for Diversification Dimension */}
          {dimension.dimensionKey === 'diversification' && (
            <HoldingComparisonDiagram interactive={true} className="my-2" />
          )}

          {/* Paired Cards (Single Column on phone, 2-column on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Side A */}
            <div className="p-3.5 rounded-2xl bg-surface-elevated border-l-4 border-l-groww-emerald border border-border-default space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider">
                  {dimension.sideA.categoryName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25">
                  Option 1
                </span>
              </div>

              <p className="text-content-primary font-semibold text-xs sm:text-sm leading-snug">
                {dimension.sideA.explanation}
              </p>

              {dimension.sideA.practicalExample && (
                <p className="text-content-secondary italic leading-relaxed pt-0.5">
                  "{dimension.sideA.practicalExample}"
                </p>
              )}

              {/* Clickable Jargon Chips */}
              {dimension.sideA.jargonTerms && dimension.sideA.jargonTerms.length > 0 && (
                <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-content-muted font-medium">Terms:</span>
                  {dimension.sideA.jargonTerms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => openJargon(term)}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-lg bg-surface-card border border-border-default text-emerald-700 dark:text-groww-emerald hover:border-groww-emerald focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none transition-colors"
                    >
                      <Info className="w-2.5 h-2.5" aria-hidden="true" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Side B */}
            <div className="p-3.5 rounded-2xl bg-surface-elevated border-l-4 border-l-sky-500 dark:border-l-sky-400 border border-border-default space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                  {dimension.sideB.categoryName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-sky-400/15 text-sky-700 dark:text-sky-400 border border-sky-400/25">
                  Option 2
                </span>
              </div>

              <p className="text-content-primary font-semibold text-xs sm:text-sm leading-snug">
                {dimension.sideB.explanation}
              </p>

              {dimension.sideB.practicalExample && (
                <p className="text-content-secondary italic leading-relaxed pt-0.5">
                  "{dimension.sideB.practicalExample}"
                </p>
              )}

              {/* Clickable Jargon Chips */}
              {dimension.sideB.jargonTerms && dimension.sideB.jargonTerms.length > 0 && (
                <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-content-muted font-medium">Terms:</span>
                  {dimension.sideB.jargonTerms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => openJargon(term)}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-lg bg-surface-card border border-border-default text-sky-700 dark:text-sky-400 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none transition-colors"
                    >
                      <Info className="w-2.5 h-2.5" aria-hidden="true" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Important Qualifications */}
          {dimension.importantQualifications && (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-content-primary flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">
                <strong>Important Qualification:</strong> {dimension.importantQualifications}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
