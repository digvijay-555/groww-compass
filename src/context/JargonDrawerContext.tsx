import React, { createContext, useContext, useState, useMemo } from 'react';
import { EducationalTopic } from '@/types/education';
import { WhyAmISeeingThisContext } from '@/types/education';
import { EDUCATIONAL_TOPICS, getEducationalTopic } from '@/data/education/topics';
import { JARGON_TERMS } from '@/data/education/jargon';
import { BottomSheet } from '@/components/common/BottomSheet';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import {
  Lightbulb,
  Info,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TopicConceptDiagram } from '@/components/visuals/TopicConceptDiagram';

const TOPIC_CHECKS: Record<string, { question: string; answer: string }> = {
  diversification: {
    question: 'Does diversification eliminate all investment risk?',
    answer: 'No. Diversification cushions against single-company failures, but broad market downturns still affect overall returns.',
  },
  volatility: {
    question: 'Is price volatility the same as losing money permanently?',
    answer: 'No. Volatility represents normal fluctuations up and down. A loss only becomes permanent if you panic-sell.',
  },
  'expense-ratio': {
    question: 'Does a 1% fee difference really matter over 15+ years?',
    answer: 'Yes! Due to compounding, a 1% higher expense ratio can reduce your ultimate portfolio wealth by 20% or more.',
  },
  liquidity: {
    question: 'Can you withdraw from any mutual fund immediately?',
    answer: 'Most open-ended schemes take 1–3 business days. Some schemes (like ELSS) have mandatory lock-in periods.',
  },
  sip: {
    question: 'Can you pause or stop a SIP at any time without penalty?',
    answer: 'Yes! In standard open-ended mutual funds, SIPs are flexible and can be paused or stopped anytime.',
  },
  'market-risk': {
    question: 'Can you eliminate market risk by buying more stocks?',
    answer: 'No. Market risk is systemic (macroeconomic events, interest rates) and affects virtually all equities.',
  },
  'company-specific-risk': {
    question: 'Can company-specific risk be reduced by holding multiple stocks?',
    answer: 'Yes! Spreading across 30+ varied companies neutralizes the damage of any single company failing.',
  },
  'index-fund': {
    question: 'Do index funds rely on human fund managers picking stocks?',
    answer: 'No. Index funds passively mirror an established index like Nifty 50 or Sensex based on set rules.',
  },
  etf: {
    question: 'Do you need a Demat and trading account to purchase ETFs?',
    answer: 'Yes. ETFs trade on stock exchanges in real time like regular company shares.',
  },
  'investment-time-horizon': {
    question: 'Should money needed in 6 months be invested in equity funds?',
    answer: 'No. Equity investments need longer time horizons (3–5+ years) to absorb short-term market volatility.',
  },
  'active-vs-passive': {
    question: 'Are actively managed funds guaranteed to beat index funds?',
    answer: 'No. After accounting for higher management fees, many active funds lag behind simple index benchmarks.',
  },
};

interface JargonDrawerContextType {
  openJargon: (termOrId: string) => void;
  openWhyAmISeeingThis: (context: WhyAmISeeingThisContext) => void;
  closeDrawer: () => void;
}

const JargonDrawerContext = createContext<JargonDrawerContextType | undefined>(undefined);

export const JargonDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTopic, setActiveTopic] = useState<EducationalTopic | null>(null);
  const [whySeeingContext, setWhySeeingContext] = useState<WhyAmISeeingThisContext | null>(null);
  const [revealedCheck, setRevealedCheck] = useState<boolean>(false);

  const openJargon = (termOrId: string) => {
    setWhySeeingContext(null);
    setRevealedCheck(false);
    const topic = getEducationalTopic(termOrId);

    if (topic) {
      setActiveTopic(topic);
    } else {
      // Fallback to legacy jargon or generic term
      const legacy = JARGON_TERMS[termOrId];
      if (legacy) {
        setActiveTopic({
          id: legacy.id,
          term: legacy.term,
          shortDefinition: legacy.shortDefinition,
          whyItMatters: legacy.indianContext,
          example: legacy.analogy,
          limitationOrMisconception:
            'Financial metrics depend on market conditions and specific fund schemes. Always verify scheme documents before deciding.',
          category: (legacy.category as any) || 'Foundations',
          relatedTopicIds: ['diversification', 'expense-ratio'],
          indianContext: legacy.indianContext,
        });
      } else {
        setActiveTopic({
          id: 'concept',
          term: termOrId,
          shortDefinition:
            'A foundational financial concept used when analyzing and comparing investments.',
          whyItMatters:
            'Understanding this helps you avoid costly beginner mistakes and select the right asset class for your goals.',
          example:
            'Like checking the fuel efficiency of a car before buying it, knowing this parameter helps you assess ongoing costs or risks.',
          limitationOrMisconception:
            'No single metric dictates whether an investment is good or bad on its own.',
          category: 'Foundations',
          relatedTopicIds: ['diversification', 'volatility'],
        });
      }
    }
  };

  const openWhyAmISeeingThis = (context: WhyAmISeeingThisContext) => {
    setActiveTopic(null);
    setWhySeeingContext(context);
  };

  const closeDrawer = () => {
    setActiveTopic(null);
    setWhySeeingContext(null);
    setRevealedCheck(false);
  };

  const value = useMemo(
    () => ({
      openJargon,
      openWhyAmISeeingThis,
      closeDrawer,
    }),
    []
  );

  const check = activeTopic ? TOPIC_CHECKS[activeTopic.id] : null;

  return (
    <JargonDrawerContext.Provider value={value}>
      {children}

      {/* MODAL 1: Educational Topic Explanation Drawer */}
      {activeTopic && (
        <BottomSheet
          isOpen={!!activeTopic}
          onClose={closeDrawer}
          title={activeTopic.term}
          subtitle={`Topic Category: ${activeTopic.category}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            {/* 1. Short Definition */}
            <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
                Short Definition
              </span>
              <p className="text-content-primary font-semibold leading-relaxed">
                {activeTopic.shortDefinition}
              </p>
            </div>

            {/* Visual Diagram */}
            <TopicConceptDiagram topicId={activeTopic.id} />

            {/* 2. Why It Matters To You */}
            <div className="p-3.5 rounded-2xl bg-surface-card border border-border-default space-y-1">
              <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                Why It Matters
              </span>
              <p className="text-content-secondary leading-relaxed">
                {activeTopic.whyItMatters}
              </p>
            </div>

            {/* 3. Simple Illustrative Example */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
                Illustrative Example
              </span>
              <p className="text-content-primary italic leading-relaxed">
                "{activeTopic.example}"
              </p>
              <span className="text-[10px] text-content-muted block pt-1">
                * Illustrative only. Does not promise or guarantee returns.
              </span>
            </div>

            {/* 4. Limitation or Misconception to Avoid */}
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                Misconception to Avoid
              </span>
              <p className="text-content-primary leading-relaxed">
                {activeTopic.limitationOrMisconception}
              </p>
            </div>

            {/* 5. Interactive Knowledge Check (Non-scored) */}
            {check && (
              <div className="p-3.5 rounded-2xl bg-surface-card border border-border-default space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    Quick Comprehension Check
                  </span>
                  <span className="text-[10px] text-content-muted font-medium">Self-check</span>
                </div>
                <p className="text-content-primary font-semibold text-xs">
                  {check.question}
                </p>
                {revealedCheck ? (
                  <div className="p-2.5 rounded-xl bg-groww-emerald/10 border border-groww-emerald/25 text-[11px] text-content-primary space-y-1">
                    <span className="font-bold text-emerald-700 dark:text-groww-emerald block">
                      Key Takeaway:
                    </span>
                    <p className="leading-snug">{check.answer}</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealedCheck(true)}
                    className="text-[11px] font-bold text-emerald-700 dark:text-groww-emerald hover:underline py-1"
                  >
                    Tap to reveal explanation →
                  </button>
                )}
              </div>
            )}

            {/* 6. Related Learning Topics */}
            {activeTopic.relatedTopicIds.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
                  Related Learning Topics:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeTopic.relatedTopicIds.map((relId) => {
                    const relTopic = EDUCATIONAL_TOPICS[relId];
                    if (!relTopic) return null;

                    return (
                      <button
                        key={relId}
                        type="button"
                        onClick={() => openJargon(relId)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-xl bg-surface-elevated border border-border-default text-emerald-700 dark:text-groww-emerald hover:border-groww-emerald focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none transition-colors"
                      >
                        <span>{relTopic.term}</span>
                        <ArrowRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-2">
              <PrimaryButton onClick={closeDrawer}>Got it, continue</PrimaryButton>
            </div>
          </div>
        </BottomSheet>
      )}

      {/* MODAL 2: "Why am I seeing this?" Contextual Explanation Drawer */}
      {whySeeingContext && (
        <BottomSheet
          isOpen={!!whySeeingContext}
          onClose={closeDrawer}
          title={`Why am I seeing this?`}
          subtitle={`Dimension: ${whySeeingContext.dimensionTitle}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            {/* Header Context Banner */}
            <div className="p-3.5 rounded-2xl bg-groww-emerald/10 border border-groww-emerald/25 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
                Comparison Context
              </span>
              <p className="text-content-primary font-semibold leading-relaxed">
                Contrasting <strong>{whySeeingContext.categoryAName}</strong> with{' '}
                <strong>{whySeeingContext.categoryBName}</strong>
              </p>
            </div>

            {/* Why This Matters for the Current Comparison */}
            <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
              <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
                Why this matters for this pair
              </span>
              <p className="text-content-secondary leading-relaxed">
                {whySeeingContext.whyItMattersForComparison}
              </p>
            </div>

            {/* What Distinction the User Should Understand */}
            <div className="p-3.5 rounded-2xl bg-surface-card border border-border-default space-y-1">
              <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                Key Structural Distinction
              </span>
              <p className="text-content-primary font-medium leading-relaxed">
                {whySeeingContext.keyDistinction}
              </p>
            </div>

            {/* What to Explore Next */}
            <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default space-y-2">
              <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
                What to explore next
              </span>
              <p className="text-content-secondary leading-relaxed">
                {whySeeingContext.whatToExploreNext}
              </p>

              {whySeeingContext.relatedTopicId && (
                <SecondaryButton
                  onClick={() => openJargon(whySeeingContext.relatedTopicId!)}
                  icon={ArrowRight}
                  className="text-xs py-2 font-semibold"
                >
                  Read full topic: {getEducationalTopic(whySeeingContext.relatedTopicId)?.term || 'Concept'}
                </SecondaryButton>
              )}
            </div>

            <p className="text-[11px] text-content-muted italic">
              * This explanation is based strictly on the selected investment content, not on personal financial profiling.
            </p>

            <div className="pt-2">
              <PrimaryButton onClick={closeDrawer}>Return to Comparison</PrimaryButton>
            </div>
          </div>
        </BottomSheet>
      )}
    </JargonDrawerContext.Provider>
  );
};

export const useJargonDrawer = (): JargonDrawerContextType => {
  const context = useContext(JargonDrawerContext);
  if (!context) {
    throw new Error('useJargonDrawer must be used within a JargonDrawerProvider');
  }
  return context;
};
