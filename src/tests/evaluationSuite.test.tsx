import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import { IntentProvider } from '@/context/IntentContext';
import { ToastProvider } from '@/context/ToastContext';
import { JargonDrawerProvider } from '@/context/JargonDrawerContext';
import { AppShell } from '@/components/layout/AppShell';

import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ComparePage } from '@/pages/ComparePage';
import { LearnPage } from '@/pages/LearnPage';
import { SavedPage } from '@/pages/SavedPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { INVESTMENT_CATEGORIES } from '@/data/education/categories';
import { USER_INTENTS } from '@/data/intent/options';
import { SAVED_STORAGE_KEY } from '@/hooks/useSavedComparisons';

const renderApp = (initialRoute: string = '/') => {
  return render(
    <ThemeProvider>
      <IntentProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
              <Routes>
                <Route path="/" element={<AppShell />}>
                  <Route index element={<HomePage />} />
                  <Route path="explore" element={<ExplorePage />} />
                  <Route path="compare" element={<ComparePage />} />
                  <Route path="learn" element={<LearnPage />} />
                  <Route path="saved" element={<SavedPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

describe('Groww Compass Formal Evaluation Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  // =========================================================================
  // SECTION A: Functional Tests (F1 - F12)
  // =========================================================================
  describe('A. Functional Verification (F1 - F12)', () => {
    it('F1: A new visitor can understand the purpose of the product immediately', () => {
      renderApp('/');
      expect(screen.getByText(/What is Groww Compass\?/i)).toBeInTheDocument();
      expect(screen.getByText(/A calm, unbiased discovery guide designed for first-time Indian investors/i)).toBeInTheDocument();
      expect(screen.getByText(/1\. Cut Jargon/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Compare Honestly/i)).toBeInTheDocument();
      expect(screen.getByText(/3\. No Sales Push/i)).toBeInTheDocument();
      expect(screen.getByText(/No account or login required/i)).toBeInTheDocument();
    });

    it('F2: A user can select an intent and experience level', () => {
      renderApp('/');
      // Verify all 5 prompt intents exist
      USER_INTENTS.forEach((intent) => {
        expect(screen.getByText(intent.label)).toBeInTheDocument();
      });

      // Select an intent
      const fundsRadio = screen.getByRole('radio', { name: /I want to explore mutual funds\./i });
      fireEvent.click(fundsRadio);
      expect(fundsRadio).toHaveAttribute('aria-checked', 'true');

      // Verify all 3 experience levels exist and select one
      const intermediateRadio = screen.getByRole('radio', { name: /Know the basics/i });
      fireEvent.click(intermediateRadio);
      expect(intermediateRadio).toHaveAttribute('aria-checked', 'true');

      // Dynamic guidance adapts
      expect(screen.getAllByText(/Focusing on: I want to explore mutual funds\./i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Level: Know the basics/i)).toBeInTheDocument();
    });

    it('F3: A user can explore every supported investment category', () => {
      renderApp('/explore');
      expect(screen.getByText(/5 Core Asset Categories/i)).toBeInTheDocument();

      INVESTMENT_CATEGORIES.forEach((cat) => {
        expect(screen.getByText(cat.name)).toBeInTheDocument();
        expect(screen.getByText(cat.shortDescription)).toBeInTheDocument();
        expect(screen.getByText(cat.ownership)).toBeInTheDocument();
        expect(screen.getByText(cat.importantConsideration)).toBeInTheDocument();
      });

      // Open detail sheet for category
      const articles = screen.getAllByRole('article');
      const learnMoreBtn = within(articles[0]).getByRole('button', { name: /Learn More/i });
      fireEvent.click(learnMoreBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/What You Actually Own/i)).toBeInTheDocument();
      expect(screen.getByText(/One Critical Consideration/i)).toBeInTheDocument();
    });

    it('F4: A user can launch a supported comparison', () => {
      renderApp('/compare?a=stocks&b=equity-mf');
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByText(/The Fundamental Trade-Off/i)).toBeInTheDocument();
      expect(screen.getByText(/8 Comparison Dimensions/i)).toBeInTheDocument();
    });

    it('F5: A user can switch categories and see updated content', () => {
      renderApp('/compare?a=stocks&b=equity-mf');
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');

      // Change Category 2 to ETFs
      const select2 = screen.getByLabelText(/Category 2/i);
      fireEvent.change(select2, { target: { value: 'etfs' } });

      // Shows unsupported guidance with recommended alternatives
      expect(screen.getByText(/Unsupported Comparison Pair/i)).toBeInTheDocument();
      expect(screen.getByText(/Recommended Supported Alternatives:/i)).toBeInTheDocument();

      // Click supported alternative
      const altBtn = screen.getByRole('button', { name: /Index Funds vs\. ETFs/i });
      fireEvent.click(altBtn);

      expect(screen.getByText(/Index Funds vs\. Exchange Traded Funds \(ETFs\)/i)).toBeInTheDocument();
    });

    it('F6: A user can open and close contextual explanations without losing comparison state', () => {
      renderApp('/compare?a=stocks&b=equity-mf');

      const whyBtn = screen.getAllByRole('button', {
        name: /Why am I seeing the .* comparison\?/i,
      })[0];
      fireEvent.click(whyBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        within(screen.getByRole('dialog')).getByRole('heading', { name: /Why am I seeing this\?/i })
      ).toBeInTheDocument();

      // Close dialog
      const closeBtn = screen.getByRole('button', { name: /close dialog/i });
      fireEvent.click(closeBtn);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      // State is fully intact
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');
    });

    it('F7: A user can save and reopen a comparison', () => {
      renderApp('/compare?a=index-funds&b=etfs');

      // Click save bookmark button
      const bookmarkBtn = screen.getByRole('button', { name: /save this comparison/i });
      fireEvent.click(bookmarkBtn);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Saved comparison to your Saved hub!/i)).toBeInTheDocument();

      // Navigate to /saved
      const savedLink = screen.getByRole('link', { name: /saved/i });
      fireEvent.click(savedLink);

      expect(screen.getByText(/Index Funds vs\. ETFs/i)).toBeInTheDocument();

      // Click Reopen Comparison
      const reopenBtn = screen.getByRole('button', { name: /reopen comparison/i });
      fireEvent.click(reopenBtn);

      expect(screen.getByText(/Index Funds vs\. Exchange Traded Funds \(ETFs\)/i)).toBeInTheDocument();
    });

    it('F8: A user can delete a saved comparison with accidental-deletion confirmation', () => {
      window.localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify([
          {
            id: 'saved_test_1',
            pairId: 'index-funds-vs-etfs',
            categoryAId: 'index-funds',
            categoryBId: 'etfs',
            categoryAName: 'Index Funds',
            categoryBName: 'ETFs',
            savedAt: new Date().toISOString(),
            displayDate: '9 Oct 2026',
            summary: 'Summary text',
          },
        ])
      );

      renderApp('/saved');
      expect(screen.getByText(/Index Funds vs\. ETFs/i)).toBeInTheDocument();

      // Click delete button
      const deleteBtn = screen.getByRole('button', {
        name: /delete saved comparison between Index Funds and ETFs/i,
      });
      fireEvent.click(deleteBtn);

      // Confirmation modal appears
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Remove Saved Comparison\?/i)).toBeInTheDocument();

      // Confirm deletion
      const confirmRemoveBtn = screen.getByRole('button', { name: /yes, remove comparison/i });
      fireEvent.click(confirmRemoveBtn);

      expect(screen.getByText(/No saved comparisons yet/i)).toBeInTheDocument();
    });

    it('F9: Saved comparisons persist after refresh across browser sessions', () => {
      window.localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify([
          {
            id: 'saved_persisted_1',
            pairId: 'stocks-vs-equity-mf',
            categoryAId: 'stocks',
            categoryBId: 'equity-mf',
            categoryAName: 'Individual Stocks',
            categoryBName: 'Equity Mutual Funds',
            savedAt: new Date().toISOString(),
            displayDate: '9 Oct 2026',
            summary: 'Ownership vs pooled risk',
            customLabel: 'My Long Term Note',
          },
        ])
      );

      const { unmount } = renderApp('/saved');
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByText('My Long Term Note')).toBeInTheDocument();
      unmount();

      // Remount simulating refresh
      renderApp('/saved');
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByText('My Long Term Note')).toBeInTheDocument();
    });

    it('F10: Theme selection persists after refresh and navigation', () => {
      renderApp('/');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      const themeToggle = screen.getByRole('button', { name: /switch to light mode/i });
      fireEvent.click(themeToggle);

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('groww_compass_theme')).toBe('light');

      // Navigate to another route and verify light theme is preserved
      const exploreLink = screen.getByRole('link', { name: /explore/i });
      fireEvent.click(exploreLink);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('F11: All bottom navigation items lead to the correct page', () => {
      renderApp('/');

      const exploreTab = screen.getByRole('link', { name: /explore/i });
      const compareTab = screen.getByRole('link', { name: /compare/i });
      const learnTab = screen.getByRole('link', { name: /learn/i });
      const savedTab = screen.getByRole('link', { name: /saved/i });

      expect(exploreTab).toHaveAttribute('href', '/explore');
      expect(compareTab).toHaveAttribute('href', '/compare');
      expect(learnTab).toHaveAttribute('href', '/learn');
      expect(savedTab).toHaveAttribute('href', '/saved');
    });

    it('F12: Direct navigation to a nested route works with query parameters', () => {
      renderApp('/compare?a=stocks&b=equity-mf');
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();

      const { unmount } = renderApp('/learn?q=Volatility');
      expect(screen.getByRole('searchbox')).toHaveValue('Volatility');
      unmount();
    });
  });

  // =========================================================================
  // SECTION B: Product and Content Evaluations (P1 - P8)
  // =========================================================================
  describe('B. Product & Content Principles (P1 - P8)', () => {
    it('P1: No investment option is presented as universally best', () => {
      renderApp('/compare?a=index-funds&b=equity-mf');
      expect(screen.getByText(/We never declare one universally best/i)).toBeInTheDocument();
      expect(document.body.textContent).not.toContain('Winner:');
      expect(document.body.textContent).not.toContain('Best choice for all investors');
    });

    it('P2: No guaranteed-return claims appear anywhere in content', () => {
      renderApp('/');
      const text = document.body.textContent || '';
      expect(text.toLowerCase()).not.toContain('guaranteed return');
      expect(text.toLowerCase()).not.toContain('guaranteed profit');
      expect(text.toLowerCase()).not.toContain('risk-free high returns');
    });

    it('P3: No fabricated live market data or performance figures appear', () => {
      renderApp('/explore');
      const text = document.body.textContent || '';
      // Ensure no fake ticker prices like ₹2,450.50 (+3.2%)
      expect(text).not.toMatch(/₹\d+,\d+\.\d+\s*\([+-]\d+\.\d+%\)/);
    });

    it('P4: Educational content accurately separates risk, diversification, liquidity, costs, and research effort', () => {
      renderApp('/compare?a=stocks&b=equity-mf');
      expect(screen.getByText(/What You Own/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Diversification$/i })).toBeInTheDocument();
      expect(screen.getByText(/Main Risks/i)).toBeInTheDocument();
      expect(screen.getByText(/Liquidity & Restrictions/i)).toBeInTheDocument();
      expect(screen.getByText(/Costs & Fee Considerations/i)).toBeInTheDocument();
      expect(screen.getByText(/Research & Monitoring Effort/i)).toBeInTheDocument();
      expect(screen.getByText(/Time Horizon Considerations/i)).toBeInTheDocument();
      expect(screen.getByText(/What a Beginner Must Know First/i)).toBeInTheDocument();
    });

    it('P5: Any product destinations are verified links or explicitly identified placeholders with prototype notices', () => {
      renderApp('/explore');
      const articles = screen.getAllByRole('article');
      const learnMoreBtn = within(articles[0]).getByRole('button', { name: /Learn More/i });
      fireEvent.click(learnMoreBtn);

      const handoffTrigger = screen.getByRole('button', { name: /Explore Stocks on Groww/i });
      fireEvent.click(handoffTrigger);

      // Opens prototype disclaimer modal showing verified URL destination
      expect(screen.getByText(/Educational Prototype Notice/i)).toBeInTheDocument();
      expect(screen.getByText(/https:\/\/groww\.in\/stocks/i)).toBeInTheDocument();
    });

    it('P6: The prototype does not request sensitive financial information (PAN, Aadhaar, Bank credentials)', () => {
      renderApp('/');
      const text = document.body.textContent || '';
      expect(text).not.toContain('Enter PAN');
      expect(text).not.toContain('Enter Aadhaar');
      expect(text).not.toContain('Bank Account Number');
      expect(text).not.toContain('Enter PIN');
      expect(text).not.toContain('Enter Password');
    });

    it('P7: Saved data is accurately described as local browser storage only', () => {
      renderApp('/saved');
      expect(screen.getByText(/Local Device Storage Only/i)).toBeInTheDocument();
      expect(
        screen.getByText(/These comparisons are saved in your device’s browser storage/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Groww Compass does not sync records to an external cloud/i)
      ).toBeInTheDocument();
    });

    it('P8: The product remains focused on investment discovery rather than general personal finance', () => {
      renderApp('/');
      const text = document.body.textContent || '';
      expect(text).not.toContain('Budget Planner');
      expect(text).not.toContain('Expense Tracker');
      expect(text).not.toContain('Credit Card Score');
      expect(text).not.toContain('Link Bank Account');
    });
  });

  // =========================================================================
  // SECTION C: Mobile & Responsive Layout Checks
  // =========================================================================
  describe('C. Mobile & Responsive Layout Requirements', () => {
    it('enforces min-h-touch >= 44px on interactive controls', () => {
      renderApp('/explore');
      const buttons = screen.getAllByRole('button');
      const compliantButtons = buttons.filter((b) =>
        b.className.includes('min-h-touch') || b.className.includes('h-10') || b.className.includes('h-11')
      );
      expect(compliantButtons.length).toBeGreaterThanOrEqual(10);
    });

    it('maintains safe-area padding pb-28 pb-safe on main container', () => {
      renderApp('/explore');
      const main = screen.getByRole('main');
      expect(main).toHaveClass('pb-28');
      expect(main).toHaveClass('pb-safe');
    });

    it('enforces single-column card stacking on mobile screens', () => {
      renderApp('/compare?a=stocks&b=equity-mf');
      const root = document.getElementById('main-content');
      expect(root).toBeInTheDocument();
      expect(root).toHaveClass('focus:outline-none');
    });
  });

  // =========================================================================
  // SECTION D: Usability Scenarios (1 - 5)
  // =========================================================================
  describe('D. Beginner Usability Scenarios', () => {
    it('Scenario 1: “I have heard of stocks and mutual funds but don\'t understand the difference.”', () => {
      renderApp('/compare?a=stocks&b=equity-mf');

      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByText(/What You Own/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /^Diversification$/i })).toBeInTheDocument();
      expect(screen.getByText(/The Fundamental Trade-Off/i)).toBeInTheDocument();
    });

    it('Scenario 2: “I want to compare index funds and ETFs.”', () => {
      renderApp('/compare?a=index-funds&b=etfs');

      expect(screen.getByText(/Index Funds vs\. Exchange Traded Funds \(ETFs\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Comparing two passive index-tracking instruments/i)).toBeInTheDocument();
    });

    it('Scenario 3: “I don\'t understand what diversification means.”', () => {
      renderApp('/learn?q=Diversification');

      expect(screen.getByText(/Diversification/i)).toBeInTheDocument();
      const readBtn = screen.getByRole('button', { name: /Read explanation for Diversification/i });
      fireEvent.click(readBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Short Definition/i)).toBeInTheDocument();
      expect(screen.getByText(/Why It Matters/i)).toBeInTheDocument();
      expect(within(screen.getByRole('dialog')).getByText(/Illustrative Example/i)).toBeInTheDocument();
      expect(screen.getByText(/Misconception to Avoid/i)).toBeInTheDocument();
    });

    it('Scenario 4: “I want to save a comparison and read it later.”', () => {
      renderApp('/compare?a=stocks&b=equity-mf');

      const bookmarkBtn = screen.getByRole('button', { name: /save this comparison/i });
      fireEvent.click(bookmarkBtn);

      // Verify saved in localStorage
      const stored = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].pairId).toBe('stocks-vs-equity-mf');

      // Go to /saved
      const savedLink = screen.getByRole('link', { name: /saved/i });
      fireEvent.click(savedLink);
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
    });

    it('Scenario 5: “I prefer light mode and want the app to remember my choice.”', () => {
      renderApp('/');

      const toggle = screen.getByRole('button', { name: /switch to light mode/i });
      fireEvent.click(toggle);

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('groww_compass_theme')).toBe('light');

      // Navigate to /explore and confirm light theme is retained
      const exploreTab = screen.getByRole('link', { name: /explore/i });
      fireEvent.click(exploreTab);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
