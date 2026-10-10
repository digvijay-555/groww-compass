import {
  PairComparison,
  SupportedPairId,
  UnsupportedAlternative,
} from '@/types/comparison';
import { STOCKS_VS_EQUITY_MF } from './pairs/stocksVsEquityMf';
import { EQUITY_MF_VS_DEBT_MF } from './pairs/equityMfVsDebtMf';
import { INDEX_FUNDS_VS_EQUITY_MF } from './pairs/indexFundsVsEquityMf';
import { INDEX_FUNDS_VS_ETFS } from './pairs/indexFundsVsEtfs';
import { getCategoryById } from '../education/categories';

export const SUPPORTED_COMPARISONS: Record<SupportedPairId, PairComparison> = {
  'stocks-vs-equity-mf': STOCKS_VS_EQUITY_MF,
  'equity-mf-vs-debt-mf': EQUITY_MF_VS_DEBT_MF,
  'index-funds-vs-equity-mf': INDEX_FUNDS_VS_EQUITY_MF,
  'index-funds-vs-etfs': INDEX_FUNDS_VS_ETFS,
};

export interface SupportedPairOption {
  id: SupportedPairId;
  label: string;
  categoryAId: string;
  categoryBId: string;
  tagline: string;
}

export const SUPPORTED_PAIR_OPTIONS: SupportedPairOption[] = [
  {
    id: 'stocks-vs-equity-mf',
    label: 'Stocks vs. Equity Mutual Funds',
    categoryAId: 'stocks',
    categoryBId: 'equity-mf',
    tagline: 'Direct single-company ownership vs. 40-stock professional pool',
  },
  {
    id: 'equity-mf-vs-debt-mf',
    label: 'Equity vs. Debt Mutual Funds',
    categoryAId: 'equity-mf',
    categoryBId: 'debt-mf',
    tagline: 'Long-term equity compounding vs. short-term capital preservation',
  },
  {
    id: 'index-funds-vs-equity-mf',
    label: 'Index Funds vs. Active Equity Funds',
    categoryAId: 'index-funds',
    categoryBId: 'equity-mf',
    tagline: 'Rock-bottom fees matching benchmark vs. higher fees seeking alpha',
  },
  {
    id: 'index-funds-vs-etfs',
    label: 'Index Funds vs. ETFs',
    categoryAId: 'index-funds',
    categoryBId: 'etfs',
    tagline: 'Automated bank SIP (no Demat) vs. live exchange trading (Demat)',
  },
];

/**
 * Normalizes and looks up a pair comparison.
 * Inverts sides if the user requested the inverse order (e.g. equity-mf vs stocks)
 * so that sideA always matches categoryAId and sideB matches categoryBId.
 */
export const getComparisonPair = (
  catA: string,
  catB: string
): PairComparison | null => {
  if (!catA || !catB || catA === catB) return null;

  // Direct match
  const directKey = Object.keys(SUPPORTED_COMPARISONS).find((key) => {
    const p = SUPPORTED_COMPARISONS[key as SupportedPairId];
    return p.categoryAId === catA && p.categoryBId === catB;
  }) as SupportedPairId | undefined;

  if (directKey) {
    return SUPPORTED_COMPARISONS[directKey];
  }

  // Inverse match (e.g. user selected equity-mf vs stocks)
  const inverseKey = Object.keys(SUPPORTED_COMPARISONS).find((key) => {
    const p = SUPPORTED_COMPARISONS[key as SupportedPairId];
    return p.categoryAId === catB && p.categoryBId === catA;
  }) as SupportedPairId | undefined;

  if (inverseKey) {
    const original = SUPPORTED_COMPARISONS[inverseKey];
    // Invert the sides cleanly
    return {
      ...original,
      categoryAId: catA,
      categoryBId: catB,
      title: `${getCategoryById(catA)?.name || catA} vs. ${
        getCategoryById(catB)?.name || catB
      }`,
      dimensions: original.dimensions.map((dim) => ({
        ...dim,
        sideA: dim.sideB,
        sideB: dim.sideA,
      })),
    };
  }

  return null;
};

/**
 * Provides helpful diagnostic feedback and recommended supported alternatives
 * when an unsupported combination is selected.
 */
export const getUnsupportedAlternative = (
  catA: string,
  catB: string
): UnsupportedAlternative => {
  const nameA = getCategoryById(catA)?.name || catA;
  const nameB = getCategoryById(catB)?.name || catB;

  if (catA === catB) {
    return {
      reason: `You have selected "${nameA}" for both categories. A comparison requires two distinct asset classes to show contrasting trade-offs.`,
      suggestedPairs: [
        {
          id: 'stocks-vs-equity-mf',
          label: 'Stocks vs. Equity Mutual Funds',
          description: 'Compare single company ownership against a diversified 40-company pool.',
          pair: ['stocks', 'equity-mf'],
        },
        {
          id: 'index-funds-vs-equity-mf',
          label: 'Index Funds vs. Active Equity Funds',
          description: 'Compare low-cost automated market tracking against active fund managers.',
          pair: ['index-funds', 'equity-mf'],
        },
      ],
    };
  }

  // Cross combinations (e.g. stocks vs debt-mf, or stocks vs etfs)
  if ((catA === 'stocks' && catB === 'debt-mf') || (catA === 'debt-mf' && catB === 'stocks')) {
    return {
      reason: `Directly comparing Individual Stocks to Debt Mutual Funds is comparing polar opposites (highest risk single-company equity vs. fixed-income capital preservation). Beginners gain clearer insights by contrasting stocks against diversified equity funds first, or debt funds against equity funds.`,
      suggestedPairs: [
        {
          id: 'stocks-vs-equity-mf',
          label: 'Individual Stocks vs. Equity Mutual Funds',
          description: 'Understand how single-company risk contrasts with a diversified equity basket.',
          pair: ['stocks', 'equity-mf'],
        },
        {
          id: 'equity-mf-vs-debt-mf',
          label: 'Equity Mutual Funds vs. Debt Mutual Funds',
          description: 'Understand the fundamental trade-off between growth and capital stability.',
          pair: ['equity-mf', 'debt-mf'],
        },
      ],
    };
  }

  if ((catA === 'stocks' && catB === 'etfs') || (catA === 'etfs' && catB === 'stocks')) {
    return {
      reason: `Both Stocks and ETFs trade live on stock exchanges via Demat accounts, but ETFs hold full benchmark baskets. To understand passive baskets, comparing Index Funds vs ETFs or Stocks vs Mutual Funds yields clearer trade-off models.`,
      suggestedPairs: [
        {
          id: 'index-funds-vs-etfs',
          label: 'Index Funds vs. ETFs',
          description: 'Compare the two primary passive indexing wrappers.',
          pair: ['index-funds', 'etfs'],
        },
        {
          id: 'stocks-vs-equity-mf',
          label: 'Individual Stocks vs. Equity Mutual Funds',
          description: 'Contrast direct stock selection with diversified funds.',
          pair: ['stocks', 'equity-mf'],
        },
      ],
    };
  }

  if ((catA === 'debt-mf' && catB === 'etfs') || (catA === 'etfs' && catB === 'debt-mf')) {
    return {
      reason: `Debt mutual funds focus on capital preservation, whereas equity ETFs focus on market benchmark growth. We recommend exploring Equity Mutual Funds vs Debt Mutual Funds to understand asset allocation principles.`,
      suggestedPairs: [
        {
          id: 'equity-mf-vs-debt-mf',
          label: 'Equity Mutual Funds vs. Debt Mutual Funds',
          description: 'The classic comparison between capital growth and fixed-income stability.',
          pair: ['equity-mf', 'debt-mf'],
        },
        {
          id: 'index-funds-vs-etfs',
          label: 'Index Funds vs. ETFs',
          description: 'Understand the mechanics of exchange-traded funds.',
          pair: ['index-funds', 'etfs'],
        },
      ],
    };
  }

  // Generic fallback
  return {
    reason: `Groww Compass currently focuses on the 4 foundational pedagogical pairs where young Indian investors experience the most decision friction. Direct comparisons between ${nameA} and ${nameB} are not yet curated.`,
    suggestedPairs: [
      {
        id: 'index-funds-vs-equity-mf',
        label: 'Index Funds vs. Active Equity Funds',
        description: 'Understand the core fee and performance trade-off.',
        pair: ['index-funds', 'equity-mf'],
      },
      {
        id: 'stocks-vs-equity-mf',
        label: 'Stocks vs. Equity Mutual Funds',
        description: 'Understand single company risk vs. diversified baskets.',
        pair: ['stocks', 'equity-mf'],
      },
    ],
  };
};
