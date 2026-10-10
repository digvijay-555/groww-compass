import { describe, it, expect } from 'vitest';
import {
  USER_INTENTS,
  EXPERIENCE_LEVELS,
  getGuidanceForUser,
} from '@/data/intent/options';

describe('User Intents & Guidance Options', () => {
  it('defines exactly the 5 user-facing intents specified in product spec', () => {
    expect(USER_INTENTS).toHaveLength(5);
    const intentIds = USER_INTENTS.map((i) => i.id);
    expect(intentIds).toContain('understand-stocks');
    expect(intentIds).toContain('explore-funds');
    expect(intentIds).toContain('compare-options');
    expect(intentIds).toContain('index-and-etfs');
    expect(intentIds).toContain('regular-investing');
  });

  it('defines the 3 experience levels for adjusting explanation depth', () => {
    expect(EXPERIENCE_LEVELS).toHaveLength(3);
    const levelIds = EXPERIENCE_LEVELS.map((l) => l.id);
    expect(levelIds).toContain('beginner');
    expect(levelIds).toContain('basics');
    expect(levelIds).toContain('exploring');
  });

  it('returns appropriate guidance without declaring any option universally best', () => {
    USER_INTENTS.forEach((intent) => {
      EXPERIENCE_LEVELS.forEach((level) => {
        const guidance = getGuidanceForUser(intent.id, level.id);
        expect(guidance.headline).toContain(intent.label);
        expect(guidance.explanation).toBeTruthy();
        expect(guidance.focusDimensions.length).toBeGreaterThanOrEqual(3);

        // Verify neutral education: no claim of "best" or guaranteed returns
        expect(guidance.explanation).not.toContain('best investment');
        expect(guidance.explanation).not.toContain('guaranteed');
      });
    });
  });
});
