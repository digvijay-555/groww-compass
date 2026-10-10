import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import { IntentProvider } from '@/context/IntentContext';
import { ToastProvider } from '@/context/ToastContext';
import { JargonDrawerProvider } from '@/context/JargonDrawerContext';
import { AppShell } from '@/components/layout/AppShell';
import { ComparePage } from '@/pages/ComparePage';

import {
  SUPPORTED_COMPARISONS,
  SUPPORTED_PAIR_OPTIONS,
  getComparisonPair,
  getUnsupportedAlternative,
} from '@/data/comparison/pairRegistry';

const renderCompareApp = (initialRoute: string = '/compare') => {
  return render(
    <ThemeProvider>
      <IntentProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
              <Routes>
                <Route path="/" element={<AppShell />}>
                  <Route path="compare" element={<ComparePage />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

describe('Investment Comparison Lab Test Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  // Test 1: Data Architecture & Supported Pairs Integrity
  describe('Data Architecture & 4 Supported Pairs', () => {
    it('defines exactly the 4 required comparison pairs in registry', () => {
      expect(SUPPORTED_PAIR_OPTIONS).toHaveLength(4);
      const pairIds = SUPPORTED_PAIR_OPTIONS.map((p) => p.id);
      expect(pairIds).toContain('stocks-vs-equity-mf');
      expect(pairIds).toContain('equity-mf-vs-debt-mf');
      expect(pairIds).toContain('index-funds-vs-equity-mf');
      expect(pairIds).toContain('index-funds-vs-etfs');
    });

    it('each supported pair has 8 standardized dimensions with parallel explanations', () => {
      SUPPORTED_PAIR_OPTIONS.forEach((pairOption) => {
        const pair = SUPPORTED_COMPARISONS[pairOption.id];
        expect(pair, `Missing data for pair ${pairOption.id}`).toBeDefined();
        expect(pair.id).toBe(pairOption.id);
        expect(pair.conciseSummary).toBeTruthy();
        expect(pair.coreTradeOff).toBeTruthy();
        expect(pair.dimensions).toHaveLength(8);
        expect(pair.importantQualifications.length).toBeGreaterThanOrEqual(1);
        expect(pair.educationalTopics.length).toBeGreaterThanOrEqual(2);
        expect(pair.suggestedNextSteps.length).toBeGreaterThanOrEqual(2);

        // Verify each dimension has parallel structure
        pair.dimensions.forEach((dim) => {
          expect(dim.dimensionKey).toBeTruthy();
          expect(dim.title).toBeTruthy();
          expect(dim.whyItMatters).toBeTruthy();
          expect(dim.sideA.explanation).toBeTruthy();
          expect(dim.sideB.explanation).toBeTruthy();
          expect(dim.importantQualifications).toBeTruthy();
        });
      });
    });

    it('getComparisonPair supports order-independence and inverts sides accurately', () => {
      // Normal order: stocks vs equity-mf
      const normal = getComparisonPair('stocks', 'equity-mf');
      expect(normal).not.toBeNull();
      expect(normal?.categoryAId).toBe('stocks');
      expect(normal?.categoryBId).toBe('equity-mf');
      expect(normal?.dimensions[0].sideA.categoryId).toBe('stocks');
      expect(normal?.dimensions[0].sideB.categoryId).toBe('equity-mf');

      // Inverse order: equity-mf vs stocks
      const inverse = getComparisonPair('equity-mf', 'stocks');
      expect(inverse).not.toBeNull();
      expect(inverse?.categoryAId).toBe('equity-mf');
      expect(inverse?.categoryBId).toBe('stocks');
      expect(inverse?.dimensions[0].sideA.categoryId).toBe('equity-mf');
      expect(inverse?.dimensions[0].sideB.categoryId).toBe('stocks');
    });

    it('returns null and provides helpful alternatives for unsupported combinations', () => {
      expect(getComparisonPair('stocks', 'debt-mf')).toBeNull();
      expect(getComparisonPair('stocks', 'stocks')).toBeNull();

      const crossAlternative = getUnsupportedAlternative('stocks', 'debt-mf');
      expect(crossAlternative.reason).toContain('Individual Stocks to Debt Mutual Funds');
      expect(crossAlternative.suggestedPairs.length).toBeGreaterThanOrEqual(2);

      const sameAlternative = getUnsupportedAlternative('stocks', 'stocks');
      expect(sameAlternative.reason).toContain('selected "Individual Stocks" for both');
      expect(sameAlternative.suggestedPairs.length).toBeGreaterThanOrEqual(2);
    });
  });

  // Test 2: ComparePage User Interactions & State
  describe('ComparePage UI & User Interactions', () => {
    it('renders with default pair (index-funds vs equity-mf) and shows 8 dimensions', () => {
      renderCompareApp('/compare?a=index-funds&b=equity-mf');

      // Summary Card
      expect(screen.getByText(/Index Funds vs\. Actively Managed Equity Funds/i)).toBeInTheDocument();
      expect(screen.getByText(/^The Fundamental Trade-Off$/i)).toBeInTheDocument();

      // Dimension Headings
      expect(screen.getByRole('heading', { level: 3, name: /^What You Own$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Diversification$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Main Risks$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Liquidity & Restrictions$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Costs & Fee Considerations$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Research & Monitoring Effort$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Time Horizon Considerations$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^What a Beginner Must Know First$/i })).toBeInTheDocument();
    });

    it('allows toggling accordion sections and Expand/Collapse All', () => {
      renderCompareApp('/compare?a=index-funds&b=equity-mf');

      const expandAllBtn = screen.getByRole('button', { name: /expand all/i });
      fireEvent.click(expandAllBtn);

      // Verify button now shows Collapse All
      expect(screen.getByRole('button', { name: /collapse all/i })).toBeInTheDocument();

      // Collapse All
      const collapseAllBtn = screen.getByRole('button', { name: /collapse all/i });
      fireEvent.click(collapseAllBtn);
      expect(screen.getByRole('button', { name: /expand all/i })).toBeInTheDocument();
    });

    it('switches comparison pair cleanly when user clicks a preset chip', () => {
      renderCompareApp('/compare?a=index-funds&b=equity-mf');

      // Click "Stocks vs. Equity Mutual Funds" preset chip
      const stocksChip = screen.getByRole('tab', {
        name: /Stocks vs\. Equity Mutual Funds/i,
      });
      fireEvent.click(stocksChip);

      // New comparison title
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');
    });

    it('switches comparison pair cleanly when user selects another category from dropdown', () => {
      renderCompareApp('/compare?a=index-funds&b=equity-mf');

      // Change Category 2 to ETFs
      const select2 = screen.getByLabelText(/Category 2/i);
      fireEvent.change(select2, { target: { value: 'etfs' } });

      // Title updates to Index Funds vs. Exchange Traded Funds (ETFs)
      expect(
        screen.getByText(/Index Funds vs\. Exchange Traded Funds \(ETFs\)/i)
      ).toBeInTheDocument();
    });

    it('displays UnsupportedComparisonView with 1-tap alternatives when an unsupported pair is chosen', () => {
      // Pick unsupported pair: stocks vs debt-mf
      renderCompareApp('/compare?a=stocks&b=debt-mf');

      expect(screen.getByText(/Unsupported Comparison Pair/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Directly comparing Individual Stocks to Debt Mutual Funds/i)
      ).toBeInTheDocument();

      // Click one of the suggested alternatives
      const suggestedBtn = screen.getByRole('button', {
        name: /Individual Stocks vs\. Equity Mutual Funds/i,
      });
      fireEvent.click(suggestedBtn);

      // Updates to supported pair!
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
    });

    it('saves comparison to saved hub and shows confirmation toast', () => {
      renderCompareApp('/compare?a=index-funds&b=etfs');

      const bookmarkBtn = screen.getByRole('button', { name: /save this comparison/i });
      fireEvent.click(bookmarkBtn);

      // Toast appears
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Saved comparison to your Saved hub!/i)).toBeInTheDocument();

      // Icon state changes to saved
      expect(screen.getByRole('button', { name: /remove saved comparison/i })).toBeInTheDocument();
    });

    it('never labels any option as a winner or universally best', () => {
      renderCompareApp('/compare?a=index-funds&b=equity-mf');

      // Check that neutral wording is maintained
      expect(
        screen.getByText(/We never declare one universally best/i)
      ).toBeInTheDocument();
      expect(screen.queryByText(/Winner:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Best choice for all investors/i)).not.toBeInTheDocument();
    });

    it('maintains touch targets >= 44px and single column stacking on mobile', () => {
      const { container } = renderCompareApp('/compare?a=index-funds&b=equity-mf');

      const buttons = screen.getAllByRole('button');
      const touchButtons = buttons.filter((b) => b.className.includes('min-h-touch'));
      expect(touchButtons.length).toBeGreaterThanOrEqual(10);

      // Ensure root wrapper has overflow protection
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass('overflow-x-hidden');
    });
  });
});
