import { describe, it, expect } from 'vitest';
import { INVESTMENT_CATEGORIES, getCategoryById } from '@/data/education/categories';
import { COMPARISON_DIMENSIONS, CATEGORY_DIMENSION_DATA } from '@/data/comparison/dimensions';

describe('Comparison Engine & Dimensions Data Integrity', () => {
  it('defines exactly 5 core investment categories', () => {
    expect(INVESTMENT_CATEGORIES).toHaveLength(5);
    const categoryIds = INVESTMENT_CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain('stocks');
    expect(categoryIds).toContain('equity-mf');
    expect(categoryIds).toContain('index-funds');
    expect(categoryIds).toContain('etfs');
    expect(categoryIds).toContain('debt-mf');
  });

  it('defines exactly 8 standardized comparison dimensions', () => {
    expect(COMPARISON_DIMENSIONS).toHaveLength(8);
    const dimensionKeys = COMPARISON_DIMENSIONS.map((d) => d.key);
    expect(dimensionKeys).toContain('whatYouOwn');
    expect(dimensionKeys).toContain('diversification');
    expect(dimensionKeys).toContain('mainRisks');
    expect(dimensionKeys).toContain('liquidityAndRestrictions');
    expect(dimensionKeys).toContain('costsAndFees');
    expect(dimensionKeys).toContain('researchEffort');
    expect(dimensionKeys).toContain('timeHorizon');
    expect(dimensionKeys).toContain('beginnerGotchas');
  });

  it('has comprehensive dimension data for every category and every dimension', () => {
    INVESTMENT_CATEGORIES.forEach((cat) => {
      const catData = CATEGORY_DIMENSION_DATA[cat.id];
      expect(catData, `Missing dimension data for category: ${cat.id}`).toBeDefined();

      COMPARISON_DIMENSIONS.forEach((dim) => {
        const val = catData.dimensions[dim.key];
        expect(val, `Missing dimension ${dim.key} in category ${cat.id}`).toBeDefined();
        expect(val.summary).toBeTruthy();
        expect(val.details).toBeTruthy();
      });
    });
  });

  it('getCategoryById returns correct category or undefined', () => {
    expect(getCategoryById('index-funds')?.name).toBe('Index Funds');
    expect(getCategoryById('invalid-id')).toBeUndefined();
  });
});
