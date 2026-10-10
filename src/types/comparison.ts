import { DimensionKey } from './investment';

export type SupportedPairId =
  | 'stocks-vs-equity-mf'
  | 'equity-mf-vs-debt-mf'
  | 'index-funds-vs-equity-mf'
  | 'index-funds-vs-etfs';

export interface DimensionSideExplanation {
  categoryId: string;
  categoryName: string;
  explanation: string;
  practicalExample?: string;
  jargonTerms?: string[];
}

export interface DimensionComparisonDetail {
  dimensionKey: DimensionKey;
  title: string;
  shortQuestion: string;
  whyItMatters: string;
  sideA: DimensionSideExplanation;
  sideB: DimensionSideExplanation;
  importantQualifications: string;
}

export interface EducationalTopicLink {
  title: string;
  description: string;
  termKey?: string;
}

export interface ComparisonNextStep {
  label: string;
  description: string;
  actionType: 'explore-groww' | 'learn' | 'switch-pair';
  targetCategory?: string;
  targetPair?: [string, string];
}

export interface PairComparison {
  id: SupportedPairId;
  categoryAId: string;
  categoryBId: string;
  title: string;
  conciseSummary: string;
  coreTradeOff: string;
  dimensions: DimensionComparisonDetail[];
  importantQualifications: string[];
  educationalTopics: EducationalTopicLink[];
  suggestedNextSteps: ComparisonNextStep[];
}

export interface UnsupportedAlternative {
  reason: string;
  suggestedPairs: {
    id: SupportedPairId;
    label: string;
    description: string;
    pair: [string, string];
  }[];
}
