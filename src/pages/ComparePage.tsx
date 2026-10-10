import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronDown,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight,
  Scale,
  LineChart,
  Coins,
  ShieldAlert,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import { PageHeading } from '@/components/common/PageHeading';
import { INVESTMENT_CATEGORIES } from '@/data/education/categories';
import {
  SUPPORTED_PAIR_OPTIONS,
  getComparisonPair,
  getUnsupportedAlternative,
} from '@/data/comparison/pairRegistry';
import { ComparisonSummaryCard } from '@/components/compare/ComparisonSummaryCard';
import { DimensionAccordionCard } from '@/components/compare/DimensionAccordionCard';
import { UnsupportedComparisonView } from '@/components/compare/UnsupportedComparisonView';
import { EducationalTopicsCard } from '@/components/compare/EducationalTopicsCard';
import { NextStepsCard } from '@/components/compare/NextStepsCard';
import { PrototypeHandoffModal } from '@/components/common/PrototypeHandoffModal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { useIntent } from '@/context/IntentContext';
import { USER_INTENTS } from '@/data/intent/options';

export const ComparePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { intent } = useIntent();

  const stepParam = searchParams.get('step');
  const catAParam = searchParams.get('a');
  const catBParam = searchParams.get('b');

  // Step state: 'goal' (Screen 2), 'categories' (Screen 3), or undefined (Screen 4 Comparison View)
  const isGoalStep = stepParam === 'goal';
  const isCategoriesStep = stepParam === 'categories';

  // Pair state
  const [categoryAId, setCategoryAId] = useState<string>(catAParam || 'index-funds');
  const [categoryBId, setCategoryBId] = useState<string>(catBParam || 'equity-mf');

  // Step 1: Selected comparison option
  const [selectedGoalOption, setSelectedGoalOption] = useState<string>(
    catAParam && catBParam ? `${catAParam}-vs-${catBParam}` : 'stocks-vs-equity-mf'
  );

  // Step 2 & 3: Selected categories when customizing
  const [customCatA, setCustomCatA] = useState<string>(catAParam || 'stocks');
  const [customCatB, setCustomCatB] = useState<string>(catBParam || 'equity-mf');
  const [categorySubStep, setCategorySubStep] = useState<1 | 2>(1);

  // Expanded dimension keys for Screen 4
  const [openDimensions, setOpenDimensions] = useState<Record<string, boolean>>({
    whatYouOwn: true,
    diversification: true,
    mainRisks: true,
    costsAndFees: true,
    liquidityAndRestrictions: true,
  });

  const [handoffTarget, setHandoffTarget] = useState<{ label: string; url: string } | null>(null);

  // Sync state if URL query params change
  useEffect(() => {
    const qA = searchParams.get('a');
    const qB = searchParams.get('b');
    if (qA && qA !== categoryAId) setCategoryAId(qA);
    if (qB && qB !== categoryBId) setCategoryBId(qB);
  }, [searchParams]);

  const updatePair = (newA: string, newB: string) => {
    setCategoryAId(newA);
    setCategoryBId(newB);
    setSearchParams({ a: newA, b: newB });
  };

  const currentIntent = USER_INTENTS.find((i) => i.id === intent);
  const comparison = getComparisonPair(categoryAId, categoryBId);
  const unsupportedInfo = !comparison ? getUnsupportedAlternative(categoryAId, categoryBId) : null;

  const toggleDimension = (key: string) => {
    setOpenDimensions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExpandAll = () => {
    if (!comparison) return;
    const allOpen: Record<string, boolean> = {};
    comparison.dimensions.forEach((d) => {
      allOpen[d.dimensionKey] = true;
    });
    setOpenDimensions(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenDimensions({});
  };

  const allAreOpen =
    comparison &&
    comparison.dimensions.every((d) => openDimensions[d.dimensionKey]);

  // Goal Options for Step 1
  const goalCards = [
    {
      id: 'stocks-vs-equity-mf',
      catA: 'stocks',
      catB: 'equity-mf',
      title: 'Stocks vs. Equity Mutual Funds',
      description: 'Direct company shares vs. a professionally managed basket of 40+ stocks.',
      icon: Scale,
      badge: 'Popular',
    },
    {
      id: 'index-funds-vs-equity-mf',
      catA: 'index-funds',
      catB: 'equity-mf',
      title: 'Index Funds vs. Active Funds',
      description: 'Low-cost passive market tracking vs. fund manager stock-picking.',
      icon: LineChart,
      badge: 'Fee Focus',
    },
    {
      id: 'index-funds-vs-etfs',
      catA: 'index-funds',
      catB: 'etfs',
      title: 'Index Funds vs. ETFs',
      description: 'Automated bank SIPs at end-of-day NAV vs. live exchange trading via Demat.',
      icon: Coins,
      badge: 'Mechanics',
    },
    {
      id: 'equity-mf-vs-debt-mf',
      catA: 'equity-mf',
      catB: 'debt-mf',
      title: 'Equity vs. Debt Mutual Funds',
      description: 'Long-term inflation-beating growth vs. lower-volatility capital preservation.',
      icon: ShieldAlert,
      badge: 'Risk Profile',
    },
    {
      id: 'custom',
      catA: 'stocks',
      catB: 'debt-mf',
      title: 'Custom Pair Selection',
      description: 'Choose any two investment categories from scratch.',
      icon: Layers,
      badge: 'Custom',
    },
  ];

  // =========================================================================
  // SCREEN 2: Choose Your Goal (Step 1 of Flow)
  // =========================================================================
  if (isGoalStep) {
    const handleContinueFromGoal = () => {
      if (selectedGoalOption === 'custom') {
        setSearchParams({ step: 'categories' });
      } else {
        const found = goalCards.find((g) => g.id === selectedGoalOption);
        if (found) {
          updatePair(found.catA, found.catB);
        }
      }
    };

    return (
      <div className="space-y-5">
        {/* Step Progress & Back Header */}
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-content-secondary hover:text-emerald-700 dark:hover:text-groww-emerald font-semibold py-1.5 px-2.5 rounded-xl hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none -ml-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-groww-emerald bg-groww-emerald/10 px-2 py-0.5 rounded-full border border-groww-emerald/20">
            Step 1 of 2
          </span>
        </div>

        {/* Screen 2 Heading */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-content-primary tracking-tight">
            What do you want to compare?
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary">
            Pick a curated comparison pair or build a custom comparison.
          </p>
        </div>

        {/* Selectable Cards: One short description per card */}
        <div role="radiogroup" aria-label="Comparison goal options" className="space-y-2.5">
          {goalCards.map((card) => {
            const isSelected = selectedGoalOption === card.id;
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedGoalOption(card.id)}
                className={`w-full text-left p-4 min-h-touch rounded-2xl border transition-all flex items-start justify-between gap-3 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                  isSelected
                    ? 'bg-surface-elevated border-groww-emerald shadow-soft ring-1 ring-groww-emerald'
                    : 'bg-surface-card border-border-default hover:bg-surface-elevated'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 pr-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-groww-emerald text-gray-950 font-bold'
                        : 'bg-surface-elevated text-content-secondary'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm sm:text-base text-content-primary leading-tight">
                        {card.title}
                      </span>
                      {card.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-groww-emerald/10 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/20">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-content-secondary leading-snug">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isSelected
                      ? 'border-groww-emerald bg-groww-emerald text-gray-950 font-bold'
                      : 'border-border-default bg-transparent'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* In-Flow Primary Continue Button (immune to nav overlap) */}
        <div className="pt-3">
          <PrimaryButton
            onClick={handleContinueFromGoal}
            disabled={!selectedGoalOption}
            icon={ArrowRight}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCREEN 3: Choose Investment Categories (Custom 2-Step Flow)
  // =========================================================================
  if (isCategoriesStep) {
    const handleContinueToCompare = () => {
      updatePair(customCatA, customCatB);
    };

    return (
      <div className="space-y-5">
        {/* Step Progress & Back Header */}
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              if (categorySubStep === 2) {
                setCategorySubStep(1);
              } else {
                setSearchParams({ step: 'goal' });
              }
            }}
            className="inline-flex items-center gap-1.5 text-content-secondary hover:text-emerald-700 dark:hover:text-groww-emerald font-semibold py-1.5 px-2.5 rounded-xl hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none -ml-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{categorySubStep === 2 ? 'Back to Category 1' : 'Back to Goals'}</span>
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-groww-emerald bg-groww-emerald/10 px-2 py-0.5 rounded-full border border-groww-emerald/20">
            Step {categorySubStep === 1 ? '2 of 3' : '3 of 3'}
          </span>
        </div>

        {/* Screen 3 Heading */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-content-primary tracking-tight">
            {categorySubStep === 1 ? 'Choose the first category' : 'Choose the second category'}
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary">
            {categorySubStep === 1
              ? 'Select the primary investment type you want to contrast.'
              : `Contrasting against ${INVESTMENT_CATEGORIES.find((c) => c.id === customCatA)?.name || 'Option 1'}.`}
          </p>
        </div>

        {/* Single-Column List of Investment Categories */}
        <div role="radiogroup" aria-label="Investment category options" className="space-y-2.5">
          {INVESTMENT_CATEGORIES.map((cat) => {
            const isSelected = categorySubStep === 1 ? customCatA === cat.id : customCatB === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  if (categorySubStep === 1) {
                    setCustomCatA(cat.id);
                  } else {
                    setCustomCatB(cat.id);
                  }
                }}
                className={`w-full text-left p-4 min-h-touch rounded-2xl border transition-all flex items-start justify-between gap-3 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                  isSelected
                    ? 'bg-surface-elevated border-groww-emerald shadow-soft ring-1 ring-groww-emerald'
                    : 'bg-surface-card border-border-default hover:bg-surface-elevated'
                }`}
              >
                <div className="min-w-0 pr-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-content-primary leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-groww-emerald/10 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/20">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-content-secondary leading-snug">
                    {cat.shortDescription}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isSelected
                      ? 'border-groww-emerald bg-groww-emerald text-gray-950 font-bold'
                      : 'border-border-default bg-transparent'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-3">
          {categorySubStep === 1 ? (
            <PrimaryButton
              onClick={() => setCategorySubStep(2)}
              disabled={!customCatA}
              icon={ArrowRight}
            >
              Continue to Second Category
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleContinueToCompare}
              disabled={!customCatB || customCatA === customCatB}
              icon={Scale}
            >
              View Comparison
            </PrimaryButton>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCREEN 4: View the Comparison (Concise Cards + Progressive Disclosure)
  // =========================================================================
  return (
    <div className="space-y-5 overflow-x-hidden">
      {/* Top Header: Step-Back Navigation & Active Intent */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setSearchParams({ step: 'goal' })}
          className="inline-flex items-center gap-1.5 text-content-secondary hover:text-emerald-700 dark:hover:text-groww-emerald font-semibold py-1.5 px-2.5 rounded-xl hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none -ml-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Change comparison</span>
        </button>

        {currentIntent && (
          <span className="text-[11px] font-semibold text-content-muted truncate max-w-[180px]">
            Intent: {currentIntent.label}
          </span>
        )}
      </div>

      <PageHeading
        badge="Comparison Lab"
        title="Investment Comparison Lab"
        subtitle="Contrast two investment categories across 8 structured dimensions to understand trade-offs. We never declare one universally best."
      />

      {/* Quick Category Selectors (Preserved for tests & instant switching) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-content-muted uppercase tracking-wider block">
            Choose Categories to Contrast
          </span>
          <button
            type="button"
            onClick={() => setSearchParams({ step: 'goal' })}
            className="text-[11px] font-bold text-emerald-700 dark:text-groww-emerald hover:underline"
          >
            Step-by-step picker →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Selector 1 */}
          <div className="space-y-1.5">
            <label
              htmlFor="category-1-select"
              className="text-xs font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider block"
            >
              Category 1
            </label>
            <div className="relative">
              <select
                id="category-1-select"
                value={categoryAId}
                onChange={(e) => updatePair(e.target.value, categoryBId)}
                className="w-full min-h-touch px-3.5 py-2.5 rounded-2xl bg-surface-elevated border border-border-default text-content-primary font-medium text-sm appearance-none focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none pr-9 cursor-pointer"
              >
                {INVESTMENT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-4 h-4 text-content-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Selector 2 */}
          <div className="space-y-1.5">
            <label
              htmlFor="category-2-select"
              className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block"
            >
              Category 2
            </label>
            <div className="relative">
              <select
                id="category-2-select"
                value={categoryBId}
                onChange={(e) => updatePair(categoryAId, e.target.value)}
                className="w-full min-h-touch px-3.5 py-2.5 rounded-2xl bg-surface-elevated border border-border-default text-content-primary font-medium text-sm appearance-none focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none pr-9 cursor-pointer"
              >
                {INVESTMENT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-4 h-4 text-content-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Switcher Chips: 4 Supported Pairs */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-content-muted uppercase tracking-wider block">
          Curated Comparison Pairs:
        </span>
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs"
          role="tablist"
          aria-label="Supported comparison pairs"
        >
          {SUPPORTED_PAIR_OPTIONS.map((item) => {
            const isSelected =
              (categoryAId === item.categoryAId && categoryBId === item.categoryBId) ||
              (categoryAId === item.categoryBId && categoryBId === item.categoryAId);

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => updatePair(item.categoryAId, item.categoryBId)}
                className={`px-3 py-2 min-h-touch rounded-2xl shrink-0 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                  isSelected
                    ? 'bg-groww-emerald text-gray-950 font-bold shadow-soft'
                    : 'bg-surface-card border border-border-default text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CASE 1: Supported Pair Comparison View */}
      {comparison && (
        <div className="space-y-4 pb-8">
          {/* Summary & Core Trade-Off Card */}
          <ComparisonSummaryCard comparison={comparison} />

          {/* Section Heading & Expand/Collapse Controls */}
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-content-muted uppercase tracking-wider text-[11px]">
              8 Comparison Dimensions
            </span>

            <button
              type="button"
              onClick={allAreOpen ? handleCollapseAll : handleExpandAll}
              className="text-emerald-700 dark:text-groww-emerald font-bold hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none rounded-xl py-1 px-1.5"
            >
              {allAreOpen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Collapse All</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Expand All</span>
                </>
              )}
            </button>
          </div>

          {/* 8 Dimension Cards: First 5 Core Dimensions Open by default, 3 Additional Dimensions Closed by default */}
          <div className="space-y-3">
            {comparison.dimensions.map((dim, idx) => (
              <DimensionAccordionCard
                key={dim.dimensionKey}
                dimension={dim}
                index={idx}
                isOpen={!!openDimensions[dim.dimensionKey]}
                onToggle={() => toggleDimension(dim.dimensionKey)}
              />
            ))}
          </div>

          {/* Educational Topics Section */}
          <EducationalTopicsCard topics={comparison.educationalTopics} />

          {/* Next Steps & Handoff Exploration */}
          <NextStepsCard
            nextSteps={comparison.suggestedNextSteps}
            onOpenHandoff={(label, url) => setHandoffTarget({ label, url })}
          />
        </div>
      )}

      {/* CASE 2: Unsupported Pair View */}
      {!comparison && unsupportedInfo && (
        <UnsupportedComparisonView
          unsupportedInfo={unsupportedInfo}
          onSelectPair={(a, b) => updatePair(a, b)}
        />
      )}

      {/* Handoff Modal */}
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
