import {
  UserIntentOption,
  ExperienceLevelOption,
  UserIntentId,
  ExperienceLevelId,
} from '@/types/intent';

export const USER_INTENTS: UserIntentOption[] = [
  {
    id: 'understand-stocks',
    label: 'I want to understand stocks.',
    tagline: 'Direct ownership in specific businesses',
    description:
      'Understand what buying shares of an Indian company means, what drives share prices, and what risks you take on directly.',
    primaryCategory: 'stocks',
    suggestedPair: ['stocks', 'equity-mf'],
  },
  {
    id: 'explore-funds',
    label: 'I want to explore mutual funds.',
    tagline: 'Professionally managed baskets of securities',
    description:
      'Learn how mutual fund schemes pool money from multiple investors to buy baskets of stocks or bonds with built-in diversification.',
    primaryCategory: 'equity-mf',
    suggestedPair: ['equity-mf', 'index-funds'],
  },
  {
    id: 'compare-options',
    label: 'I want to compare investment options.',
    tagline: 'Head-to-head contrast across key dimensions',
    description:
      'Look at two choices side by side across ownership, risks, costs, liquidity, and time horizon to see how they differ.',
    primaryCategory: 'index-funds',
    suggestedPair: ['index-funds', 'equity-mf'],
  },
  {
    id: 'index-and-etfs',
    label: 'I want to understand index funds and ETFs.',
    tagline: 'Low-cost passive investing and exchange trading',
    description:
      'Demystify how passive funds track benchmark indices like the Nifty 50 and why trading on an exchange changes the rules.',
    primaryCategory: 'index-funds',
    suggestedPair: ['index-funds', 'etfs'],
  },
  {
    id: 'regular-investing',
    label: 'I want to learn how regular investing works.',
    tagline: 'Systematic habits and rupee cost averaging',
    description:
      'Understand how investing fixed amounts monthly (SIP) works, how compounding plays out, and which asset types fit long-term plans.',
    primaryCategory: 'equity-mf',
    suggestedPair: ['equity-mf', 'debt-mf'],
  },
];

export const EXPERIENCE_LEVELS: ExperienceLevelOption[] = [
  {
    id: 'beginner',
    label: 'New to investing',
    badge: 'Beginner',
    description:
      'Prefer plain everyday analogies, simple language, and zero assumed financial background.',
  },
  {
    id: 'basics',
    label: 'Know the basics',
    badge: 'Intermediate',
    description:
      'Familiar with basic terms like SIP or shares, but want to understand structural trade-offs and fees.',
  },
  {
    id: 'exploring',
    label: 'Exploring specific options',
    badge: 'Deep Dive',
    description:
      'Comfortable with investing terminology; interested in nuances like taxation, tracking error, and liquidity.',
  },
];

export const getGuidanceForUser = (
  intentId: UserIntentId,
  levelId: ExperienceLevelId
): { headline: string; explanation: string; focusDimensions: string[] } => {
  const intent = USER_INTENTS.find((i) => i.id === intentId) || USER_INTENTS[0];

  let levelText = '';
  switch (levelId) {
    case 'beginner':
      levelText =
        'We will explain every concept using simple everyday analogies so you build a solid mental model before making choices.';
      break;
    case 'basics':
      levelText =
        'We will focus on structural differences, annual fee impacts, and how diversification protects your capital.';
      break;
    case 'exploring':
      levelText =
        'We will highlight specific mechanics like exchange liquidity, tracking error, and Indian tax treatments.';
      break;
  }

  return {
    headline: `Focusing on: ${intent.label}`,
    explanation: `${intent.description} ${levelText}`,
    focusDimensions: ['What You Own', 'Diversification', 'Main Risks', 'Costs & Fees'],
  };
};
