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
import { LearnPage } from '@/pages/LearnPage';

import { EDUCATIONAL_TOPICS, getEducationalTopic } from '@/data/education/topics';
import { getWhyAmISeeingThisContext } from '@/data/education/contextualReasons';

const renderAppWithRoute = (initialRoute: string) => {
  return render(
    <ThemeProvider>
      <IntentProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
              <Routes>
                <Route path="/" element={<AppShell />}>
                  <Route path="compare" element={<ComparePage />} />
                  <Route path="learn" element={<LearnPage />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

describe('Contextual Education Layer Test Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  // Test 1: Content Module & 11 Required Concepts
  describe('Content Module & 11 Core Concepts', () => {
    const requiredConcepts = [
      'diversification',
      'volatility',
      'expense-ratio',
      'liquidity',
      'sip',
      'market-risk',
      'company-specific-risk',
      'index-fund',
      'etf',
      'time-horizon',
      'active-vs-passive',
    ];

    it('contains all 11 required concepts in the typed topics registry', () => {
      requiredConcepts.forEach((conceptId) => {
        const topic = EDUCATIONAL_TOPICS[conceptId];
        expect(topic, `Missing required concept: ${conceptId}`).toBeDefined();
        expect(topic.id).toBe(conceptId);
        expect(topic.term).toBeTruthy();
        expect(topic.shortDefinition).toBeTruthy();
        expect(topic.whyItMatters).toBeTruthy();
        expect(topic.example).toBeTruthy();
        expect(topic.limitationOrMisconception).toBeTruthy();
        expect(topic.relatedTopicIds.length).toBeGreaterThanOrEqual(1);

        // Verify illustrative examples do not promise guaranteed returns
        expect(topic.example.toLowerCase()).not.toContain('guaranteed return');
        expect(topic.example.toLowerCase()).not.toContain('guaranteed profit');
      });
    });

    it('getEducationalTopic supports case-insensitive and partial lookup', () => {
      expect(getEducationalTopic('Diversification')?.id).toBe('diversification');
      expect(getEducationalTopic('expense ratio')?.id).toBe('expense-ratio');
      expect(getEducationalTopic('SIP')?.id).toBe('sip');
      expect(getEducationalTopic('active vs passive')?.id).toBe('active-vs-passive');
    });
  });

  // Test 2: "Why am I seeing this?" Contextual Explanation Generator
  describe('"Why am I seeing this?" Contextual Logic', () => {
    it('generates comparison-specific reasons without personalized profiling', () => {
      const whyDiversification = getWhyAmISeeingThisContext(
        'diversification',
        'Diversification',
        'Individual Stocks',
        'Equity Mutual Funds'
      );

      expect(whyDiversification.whyItMattersForComparison).toContain('Individual Stocks');
      expect(whyDiversification.whyItMattersForComparison).toContain('Equity Mutual Funds');
      expect(whyDiversification.keyDistinction).toBeTruthy();
      expect(whyDiversification.whatToExploreNext).toBeTruthy();
      expect(whyDiversification.relatedTopicId).toBe('diversification');
    });

    it('generates fee comparison reasons for costsAndFees dimension', () => {
      const whyCosts = getWhyAmISeeingThisContext(
        'costsAndFees',
        'Costs & Fee Considerations',
        'Index Funds',
        'Active Equity Funds'
      );

      expect(whyCosts.whyItMattersForComparison).toContain('compounding');
      expect(whyCosts.relatedTopicId).toBe('expense-ratio');
    });
  });

  // Test 3: Opening "Why am I seeing this?" from Comparison Lab & Preserving State
  describe('In-Flow Contextual Interactions & State Preservation', () => {
    it('opens contextual sheet from dimension, closes it, and preserves comparison state', () => {
      renderAppWithRoute('/compare?a=stocks&b=equity-mf');

      // Verify initial comparison state
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');

      // Expand first dimension if needed
      const whyBtn = screen.getAllByRole('button', {
        name: /Why am I seeing the .* comparison\?/i,
      })[0];
      expect(whyBtn).toBeInTheDocument();

      // Click "Why am I seeing this?"
      fireEvent.click(whyBtn);

      // Contextual BottomSheet should open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        within(screen.getByRole('dialog')).getByRole('heading', { name: /Why am I seeing this\?/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Key Structural Distinction/i)).toBeInTheDocument();

      // Close the sheet via button
      const closeBtn = screen.getByRole('button', { name: /close dialog/i });
      fireEvent.click(closeBtn);

      // Dialog is gone
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Crucial: Original comparison state remains exactly intact!
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
    });

    it('closes bottom sheet via Escape key and preserves state', () => {
      renderAppWithRoute('/compare?a=index-funds&b=etfs');

      const whyBtn = screen.getAllByRole('button', {
        name: /Why am I seeing the .* comparison\?/i,
      })[0];
      fireEvent.click(whyBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Press Escape key
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('index-funds');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('etfs');
    });

    it('clicking a jargon term in comparison opens 5-part educational guide and supports related topics', () => {
      renderAppWithRoute('/compare?a=index-funds&b=equity-mf');

      // Find and click the "Expense Ratio" jargon chip
      const expenseChip = screen.getAllByRole('button', { name: /Expense Ratio/i })[0];
      fireEvent.click(expenseChip);

      // Educational Dialog opens
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        within(screen.getByRole('dialog')).getByRole('heading', { name: /Expense Ratio/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Short Definition/i)).toBeInTheDocument();
      expect(screen.getByText(/Why It Matters/i)).toBeInTheDocument();
      expect(screen.getByText(/Illustrative Example/i)).toBeInTheDocument();
      expect(screen.getByText(/Misconception to Avoid/i)).toBeInTheDocument();

      // Tap related topic inside dialog (e.g. Index Fund)
      const relatedBtn = within(screen.getByRole('dialog')).getByRole('button', {
        name: /^Index Fund$/i,
      });
      fireEvent.click(relatedBtn);

      // Updates in-place to Index Fund topic!
      expect(
        within(screen.getByRole('dialog')).getByRole('heading', { name: /Index Fund/i })
      ).toBeInTheDocument();

      // Close dialog
      const returnBtn = screen.getByRole('button', { name: /got it, continue/i });
      fireEvent.click(returnBtn);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // Test 4: Learn Page Search & Category Filtering
  describe('Learn Page Functional Search & Filter Library', () => {
    it('filters concepts in real-time as user types into search input', () => {
      renderAppWithRoute('/learn');

      expect(screen.getByText(/Investment Concepts Explained/i)).toBeInTheDocument();
      expect(screen.getByText(/Diversification/i)).toBeInTheDocument();
      expect(screen.getByText(/Volatility/i)).toBeInTheDocument();

      // Type "Volatility" in search
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'Volatility' } });

      // Volatility is present; unrelated concepts are filtered out
      expect(screen.getByText(/Volatility/i)).toBeInTheDocument();
      expect(screen.queryByText(/Diversification/i)).not.toBeInTheDocument();

      // Clear search via clear button
      const clearBtn = screen.getByRole('button', { name: /clear search query/i });
      fireEvent.click(clearBtn);

      // All topics restored
      expect(screen.getByText(/Diversification/i)).toBeInTheDocument();
    });

    it('filters concepts by category pill', () => {
      renderAppWithRoute('/learn');

      // Click "Costs" category pill
      const costsPill = screen.getByRole('tab', { name: /Costs/i });
      fireEvent.click(costsPill);

      expect(screen.getByText(/Expense Ratio/i)).toBeInTheDocument();
      expect(screen.queryByText(/Diversification/i)).not.toBeInTheDocument();
    });

    it('displays friendly EmptyState when no search results match, with reset action', () => {
      renderAppWithRoute('/learn');

      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'nonexistenttermxyz' } });

      expect(screen.getByText(/No concepts found for "nonexistenttermxyz"/i)).toBeInTheDocument();

      // Click Clear Search Filter button
      const resetBtn = screen.getByRole('button', { name: /clear search filter/i });
      fireEvent.click(resetBtn);

      expect(screen.getByText(/Diversification/i)).toBeInTheDocument();
    });
  });
});
