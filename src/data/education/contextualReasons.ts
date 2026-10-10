import { WhyAmISeeingThisContext } from '@/types/education';
import { DimensionKey } from '@/types/investment';

export const CONTEXTUAL_DIMENSION_REASONS: Record<
  DimensionKey,
  {
    whyItMattersTemplate: (catA: string, catB: string) => string;
    keyDistinctionTemplate: (catA: string, catB: string) => string;
    whatToExploreNextTemplate: (catA: string, catB: string) => string;
    relatedTopicId: string;
  }
> = {
  whatYouOwn: {
    whyItMattersTemplate: (catA, catB) =>
      `When comparing ${catA} and ${catB}, your legal ownership structure determines who manages the securities, whether you have direct voting rights, and how your capital is legally segregated.`,
    keyDistinctionTemplate: (catA, catB) =>
      `In ${catA}, check whether you own fractional shares directly or whether an intermediary mutual fund scheme holds the assets on your behalf.`,
    whatToExploreNextTemplate: () =>
      `Explore how Demat accounts differ from Mutual Fund Statements of Account (SoA) and how dividends are distributed.`,
    relatedTopicId: 'index-fund',
  },
  diversification: {
    whyItMattersTemplate: (catA, catB) =>
      `When comparing ${catA} and ${catB}, diversification determines whether your capital is exposed to the collapse of a single enterprise or distributed across a diversified portfolio of multiple companies.`,
    keyDistinctionTemplate: (catA, catB) =>
      `Notice how ${catA} and ${catB} spread risk: single stocks offer zero built-in spread, while mutual funds and ETFs spread your investment across 30 to 50+ companies.`,
    whatToExploreNextTemplate: () =>
      `Review why company-specific risk can be eliminated through diversification, whereas broad market risk remains.`,
    relatedTopicId: 'diversification',
  },
  mainRisks: {
    whyItMattersTemplate: (catA, catB) =>
      `Risk isn't just about losing money—it's about understanding *what causes* the loss so you don't panic during market cycles or unexpected drawdowns.`,
    keyDistinctionTemplate: (catA, catB) =>
      `Compare whether the primary hazard is single-business failure (company risk), general market downturns (market risk), manager error, or interest rate fluctuations.`,
    whatToExploreNextTemplate: () =>
      `Examine how volatility differs from permanent capital loss, and how holding duration helps mitigate short-term market swings.`,
    relatedTopicId: 'market-risk',
  },
  liquidityAndRestrictions: {
    whyItMattersTemplate: (catA, catB) =>
      `Liquidity determines how quickly you can access your cash in an emergency, and whether exit penalties or settlement delays apply.`,
    keyDistinctionTemplate: (catA, catB) =>
      `One option may settle within T+1 on the stock exchange during market hours, while the other processes at end-of-day NAV with potential exit loads if redeemed within 1 year.`,
    whatToExploreNextTemplate: () =>
      `Check the exit load rules and whether your emergency reserves should be separated from long-term equity allocations.`,
    relatedTopicId: 'liquidity',
  },
  costsAndFees: {
    whyItMattersTemplate: (catA, catB) =>
      `Annual fees are guaranteed to reduce your portfolio compounding, while outperformance is never guaranteed. Understanding cost structures is essential for long-term wealth.`,
    keyDistinctionTemplate: (catA, catB) =>
      `Notice whether you pay one-time transaction brokerage per trade or an ongoing Total Expense Ratio (TER) deducted daily from the fund NAV.`,
    whatToExploreNextTemplate: () =>
      `Read about the compounding effect of expense ratios and why Direct plans on Groww save thousands in commissions over time.`,
    relatedTopicId: 'expense-ratio',
  },
  researchEffort: {
    whyItMattersTemplate: (catA, catB) =>
      `Your available time and interest in reading financial reports should dictate your investing method, not social media hype.`,
    keyDistinctionTemplate: (catA, catB) =>
      `Active stock picking requires studying quarterly results and balance sheets, whereas passive index funds allow true "set-and-forget" automated compounding.`,
    whatToExploreNextTemplate: () =>
      `Learn about how automated Systematic Investment Plans (SIPs) remove the emotional friction of manual trade execution.`,
    relatedTopicId: 'sip',
  },
  timeHorizon: {
    whyItMattersTemplate: (catA, catB) =>
      `The appropriate holding period protects you from having to sell an asset at the bottom of a cyclical recession when you need money for life expenses.`,
    keyDistinctionTemplate: (catA, catB) =>
      `Equity assets require 5+ years to smooth out short-term market volatility, whereas liquid or debt assets are engineered for short-term capital preservation (1–3 years).`,
    whatToExploreNextTemplate: () =>
      `Review how historical rolling returns over 7-10 years compare against short-term price movements.`,
    relatedTopicId: 'time-horizon',
  },
  beginnerGotchas: {
    whyItMattersTemplate: (catA, catB) =>
      `Tax regulations and behavioral traps often surprise beginners after their first year of investing, leading to unexpected tax bills or execution slippage.`,
    keyDistinctionTemplate: (catA, catB) =>
      `Review the Indian tax distinctions (Budget 2024 equity LTCG/STCG vs debt slab taxation) and execution practices (limit orders for ETFs vs direct NAV for funds).`,
    whatToExploreNextTemplate: () =>
      `Examine the exact tax brackets under Section 112A and how tracking error affects passive fund performance.`,
    relatedTopicId: 'active-vs-passive',
  },
};

export const getWhyAmISeeingThisContext = (
  dimensionKey: DimensionKey,
  dimensionTitle: string,
  categoryAName: string,
  categoryBName: string
): WhyAmISeeingThisContext => {
  const reason = CONTEXTUAL_DIMENSION_REASONS[dimensionKey];

  if (!reason) {
    return {
      dimensionKey,
      dimensionTitle,
      categoryAName,
      categoryBName,
      whyItMattersForComparison: `This dimension highlights structural differences between ${categoryAName} and ${categoryBName} so you can understand the underlying trade-offs.`,
      keyDistinction: `Observe how both options handle risk, costs, and investor rights differently.`,
      whatToExploreNext: `Explore related educational topics in the Groww Compass learning library.`,
      relatedTopicId: 'diversification',
    };
  }

  return {
    dimensionKey,
    dimensionTitle,
    categoryAName,
    categoryBName,
    whyItMattersForComparison: reason.whyItMattersTemplate(categoryAName, categoryBName),
    keyDistinction: reason.keyDistinctionTemplate(categoryAName, categoryBName),
    whatToExploreNext: reason.whatToExploreNextTemplate(categoryAName, categoryBName),
    relatedTopicId: reason.relatedTopicId,
  };
};
