import { ExperienceLevelId } from './intent';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';

export type EffortLevel = 'Passive' | 'Moderate' | 'Active';

export interface SupportedComparison {
  targetId: string;
  targetName: string;
  reason: string;
}

export interface InvestmentCategory {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  shortDescription: string;
  ownership: string;
  importantConsideration: string;
  dependsOnProviderNotice: string;
  experienceLevelNotes: Record<ExperienceLevelId, string>;
  keyQuestionsToAsk: string[];
  supportedComparisons: SupportedComparison[];
  riskLevel: RiskLevel;
  effortLevel: EffortLevel;
  horizon: string;
  typicalReturnsProfile: string;
  growwDestination: {
    label: string;
    path: string;
  };
}

export type DimensionKey =
  | 'whatYouOwn'
  | 'diversification'
  | 'mainRisks'
  | 'liquidityAndRestrictions'
  | 'costsAndFees'
  | 'researchEffort'
  | 'timeHorizon'
  | 'beginnerGotchas';

export interface DimensionMetadata {
  key: DimensionKey;
  title: string;
  shortQuestion: string;
  description: string;
}

export interface DimensionValue {
  summary: string;
  details: string;
  tags?: string[];
  jargonTerms?: string[];
}

export interface CategoryComparisonData {
  categoryId: string;
  dimensions: Record<DimensionKey, DimensionValue>;
}

export interface SavedComparisonItem {
  id: string;
  categoryAId: string;
  categoryBId: string;
  categoryAName: string;
  categoryBName: string;
  savedAt: string;
  notes?: string;
}
