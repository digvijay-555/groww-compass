import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  X,
  ArrowLeft,
  Clock,
  Layers,
  Activity,
  PieChart,
  Coins,
  ShieldAlert,
  Building2,
  LineChart,
  ArrowRightLeft,
  Sliders,
  HelpCircle,
} from 'lucide-react';
import { PageHeading } from '@/components/common/PageHeading';
import { EDUCATIONAL_TOPICS } from '@/data/education/topics';
import { EducationalTopic, EducationalCategory } from '@/types/education';
import { useJargonDrawer } from '@/context/JargonDrawerContext';
import { EmptyState } from '@/components/common/EmptyState';

const TOPIC_ICONS: Record<string, React.ElementType> = {
  diversification: Layers,
  volatility: Activity,
  'expense-ratio': PieChart,
  liquidity: ArrowRightLeft,
  sip: Coins,
  'market-risk': ShieldAlert,
  'company-specific-risk': Building2,
  'index-fund': LineChart,
  etf: ArrowRightLeft,
  'investment-time-horizon': Clock,
  'active-vs-passive': Sliders,
};

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openJargon } = useJargonDrawer();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('cat') || 'All'
  );

  const categories: (EducationalCategory | 'All')[] = [
    'All',
    'Foundations',
    'Risk',
    'Costs',
    'Mechanics',
    'Strategies',
  ];

  const allTopics: EducationalTopic[] = Object.values(EDUCATIONAL_TOPICS);

  const filteredTopics = allTopics.filter((topic) => {
    const matchesCategory =
      selectedCategory === 'All' || topic.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      topic.term.toLowerCase().includes(query) ||
      topic.shortDefinition.toLowerCase().includes(query) ||
      topic.whyItMatters.toLowerCase().includes(query) ||
      topic.example.toLowerCase().includes(query) ||
      topic.limitationOrMisconception.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Calculate estimated reading time based on actual content word count (~150 wpm)
  const calculateReadTime = (topic: EducationalTopic): string => {
    const wordCount =
      topic.shortDefinition.split(/\s+/).length +
      topic.whyItMatters.split(/\s+/).length +
      topic.example.split(/\s+/).length +
      topic.limitationOrMisconception.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / 140));
    return `${minutes} min read`;
  };

  return (
    <div className="space-y-6">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-content-secondary hover:text-emerald-700 dark:hover:text-groww-emerald font-semibold py-1.5 px-2.5 rounded-xl hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none -ml-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back</span>
        </button>

        <span className="text-[11px] font-medium text-content-muted">
          {allTopics.length} Curated Topics
        </span>
      </div>

      <PageHeading
        badge="Learning Library"
        title="Investment Concepts Explained"
        subtitle="Clear, honest explanations of foundational concepts. Learn how things work, why they matter, and what traps to avoid."
      />

      {/* Functional Search Control */}
      <div className="relative">
        <label htmlFor="learning-search-input" className="sr-only">
          Search investment concepts
        </label>
        <Search
          className="w-4 h-4 text-content-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="learning-search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search Diversification, TER, SIP, Volatility..."
          className="w-full min-h-touch pl-10 pr-10 py-3 rounded-2xl bg-surface-card border border-border-default text-content-primary placeholder:text-content-muted text-sm focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            aria-label="Clear search query"
            className="w-8 h-8 rounded-full flex items-center justify-center text-content-muted hover:text-content-primary absolute right-2.5 top-1/2 -translate-y-1/2 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs"
        role="tablist"
        aria-label="Filter learning topics by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 min-h-touch rounded-2xl font-medium shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
              selectedCategory === cat
                ? 'bg-groww-emerald text-gray-950 font-bold shadow-soft'
                : 'bg-surface-card border border-border-default text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Result Status & Results Count */}
      <div className="flex items-center justify-between text-xs text-content-muted px-1">
        <span>
          Showing {filteredTopics.length} of {allTopics.length} topics
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="text-emerald-700 dark:text-groww-emerald hover:underline font-semibold"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* TOPICS LIST OR EMPTY STATE */}
      {filteredTopics.length === 0 ? (
        <EmptyState
          title={`No concepts found for "${searchQuery}"`}
          description="Try searching for terms like 'Diversification', 'Expense Ratio', 'Liquidity', or 'Volatility'."
          actionLabel="Clear Search Filter"
          onAction={handleClearSearch}
          icon={Search}
        />
      ) : (
        <div className="space-y-3" role="feed" aria-label="Educational concepts">
          {filteredTopics.map((topic) => {
            const TopicIcon = TOPIC_ICONS[topic.id] || HelpCircle;
            const readTime = calculateReadTime(topic);

            return (
              <article
                key={topic.id}
                className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default hover:border-groww-emerald/40 transition-all shadow-soft space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 pr-1">
                    <div className="w-10 h-10 rounded-2xl bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald flex items-center justify-center shrink-0 mt-0.5">
                      <TopicIcon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-elevated text-content-muted border border-border-default">
                          {topic.category}
                        </span>
                        <span className="text-[10px] font-medium text-content-muted flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" aria-hidden="true" />
                          {readTime}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-content-primary mt-1 leading-snug">
                        {topic.term}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openJargon(topic.id)}
                    aria-label={`Read explanation for ${topic.term}`}
                    className="w-10 h-10 min-w-touch min-h-touch rounded-full bg-surface-elevated hover:bg-groww-emerald/15 hover:text-emerald-700 dark:hover:text-groww-emerald text-content-secondary flex items-center justify-center shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Short One-Line Plain-English Definition */}
                <p className="text-xs sm:text-sm text-content-secondary leading-relaxed line-clamp-2">
                  {topic.shortDefinition}
                </p>

                {/* Action Row */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openJargon(topic.id)}
                    className="text-xs font-bold text-emerald-700 dark:text-groww-emerald hover:underline inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none rounded-xl py-1 px-1 -ml-1"
                  >
                    <span>Explore full breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  {topic.relatedTopicIds.length > 0 && (
                    <span className="text-[11px] text-content-muted font-medium">
                      {topic.relatedTopicIds.length} related concept
                      {topic.relatedTopicIds.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Reassurance Banner */}
      <div className="p-4 rounded-2xl bg-surface-elevated border border-border-default text-xs text-content-muted space-y-1 mb-8">
        <span className="font-semibold text-content-primary block">
          Educational Standard Notice:
        </span>
        <p className="leading-relaxed">
          All concepts are explained for discovery purposes and use illustrative examples without
          predicting live market returns.
        </p>
      </div>
    </div>
  );
};
