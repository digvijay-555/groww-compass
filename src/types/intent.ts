export type UserIntentId =
  | 'understand-stocks'
  | 'explore-funds'
  | 'compare-options'
  | 'index-and-etfs'
  | 'regular-investing';

export type ExperienceLevelId = 'beginner' | 'basics' | 'exploring';

export interface UserIntentOption {
  id: UserIntentId;
  label: string;
  tagline: string;
  description: string;
  primaryCategory: string;
  suggestedPair: [string, string];
}

export interface ExperienceLevelOption {
  id: ExperienceLevelId;
  label: string;
  badge: string;
  description: string;
}

export interface UserIntentState {
  intent: UserIntentId;
  experienceLevel: ExperienceLevelId;
  hasCompletedIntent: boolean;
}

export interface IntentContextType {
  intent: UserIntentId;
  experienceLevel: ExperienceLevelId;
  hasCompletedIntent: boolean;
  setIntent: (intent: UserIntentId) => void;
  setExperienceLevel: (level: ExperienceLevelId) => void;
  completeIntent: () => void;
  resetIntent: () => void;
}
