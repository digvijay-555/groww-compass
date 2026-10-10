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

const renderFlowApp = (initialRoute: string = '/') => {
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
                </Route>
              </Routes>
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

describe('Mobile Investing Flow & Step-by-Step Experience', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  // Acceptance Test 1: Screen 1 — Home
  it('Screen 1 (Home) displays only the essential choices without visual clutter', () => {
    renderFlowApp('/');

    // Headline and supporting text
    expect(screen.getByRole('heading', { level: 1, name: /Not sure where to start\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Understand your investment options\./i)).toBeInTheDocument();

    // 3 Large Action Cards
    expect(screen.getByRole('button', { name: /Compare options/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore investments/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Learn the basics/i })).toBeInTheDocument();

    // Verify comparison tables are NOT shown on Home
    expect(screen.queryByText(/8 Comparison Dimensions/i)).not.toBeInTheDocument();
  });

  // Acceptance Test 2 & 3: Screen 2 — Choose Your Goal
  it('Screen 2 (Choose your goal) shows focused cards, progress indicator, and no premature tables', () => {
    renderFlowApp('/compare?step=goal');

    // Progress indicator & back
    expect(screen.getByText(/Step 1 of 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to Home/i })).toBeInTheDocument();

    // Heading
    expect(screen.getByRole('heading', { level: 1, name: /What do you want to compare\?/i })).toBeInTheDocument();

    // Selectable cards
    expect(screen.getByText(/Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
    expect(screen.getByText(/Index Funds vs\. Active Funds/i)).toBeInTheDocument();
    expect(screen.getByText(/Index Funds vs\. ETFs/i)).toBeInTheDocument();
    expect(screen.getByText(/Equity vs\. Debt Mutual Funds/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Pair Selection/i)).toBeInTheDocument();

    // One short description per card
    expect(screen.getByText(/Direct company shares vs\. a professionally managed basket of 40\+ stocks\./i)).toBeInTheDocument();

    // Continue button is present and ready
    const continueBtn = screen.getByRole('button', { name: /Continue/i });
    expect(continueBtn).toBeInTheDocument();

    // Verify comparison tables are NOT shown yet on this step
    expect(screen.queryByText(/8 Comparison Dimensions/i)).not.toBeInTheDocument();
  });

  // Acceptance Test 4: Selection leads to Screen 4 (Comparison View)
  it('Selecting a comparison goal and clicking Continue leads to Screen 4 (View comparison)', () => {
    renderFlowApp('/compare?step=goal');

    // Select Stocks vs Equity Mutual Funds
    const stocksGoal = screen.getByRole('radio', { name: /Stocks vs\. Equity Mutual Funds/i });
    fireEvent.click(stocksGoal);

    // Click Continue
    const continueBtn = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueBtn);

    // Comparison appears!
    expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
    expect(screen.getByText(/The Fundamental Trade-Off/i)).toBeInTheDocument();
    expect(screen.getByText(/What You Own/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Diversification/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Main Risks/i)).toBeInTheDocument();
  });

  // Acceptance Test 5: In-app Back preserves state and returns cleanly
  it('Comparison view allows going back to Change comparison without losing selections', () => {
    renderFlowApp('/compare?a=stocks&b=equity-mf');

    // Has "Change comparison" button
    const changeBtn = screen.getByRole('button', { name: /Change comparison/i });
    expect(changeBtn).toBeInTheDocument();

    fireEvent.click(changeBtn);

    // Lands on Step 1 (What do you want to compare?)
    expect(screen.getByText(/What do you want to compare\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 2/i)).toBeInTheDocument();
  });

  // Acceptance Test 6: Detail bottom sheet opens and closes preserving comparison
  it('Tapping "Why am I seeing this?" opens detail sheet and preserves comparison state', () => {
    renderFlowApp('/compare?a=stocks&b=equity-mf');

    const whyBtn = screen.getAllByRole('button', { name: /Why am I seeing the .* comparison\?/i })[0];
    fireEvent.click(whyBtn);

    // Bottom sheet dialog opens
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Contrasting/i)).toBeInTheDocument();

    // Close bottom sheet
    const returnBtn = screen.getByRole('button', { name: /Return to Comparison/i });
    fireEvent.click(returnBtn);

    // Bottom sheet dismissed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Comparison remains fully intact
    expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
  });

  // Acceptance Test 7 & 8: Bottom navigation clearance and touch targets
  it('Bottom navigation never covers content and main container reserves safe bottom padding', () => {
    renderFlowApp('/');

    const main = screen.getByRole('main');
    expect(main).toHaveClass('pb-28');
    expect(main).toHaveClass('pb-safe');

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toHaveClass('fixed');
    expect(nav).toHaveClass('bottom-0');
    expect(nav).toHaveClass('pb-safe');
  });

  // Acceptance Test 9: Custom Pair 2-step selection
  it('Custom pair selection flow guides user through step 2 and 3 sequentially', () => {
    renderFlowApp('/compare?step=categories');

    // Heading for Category 1
    expect(screen.getByText(/Choose the first category/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 2 of 3/i)).toBeInTheDocument();

    // Select Index Funds
    const indexFundsBtn = screen.getByRole('radio', { name: /Index Funds/i });
    fireEvent.click(indexFundsBtn);

    // Click Continue to Second Category
    const continueBtn = screen.getByRole('button', { name: /Continue to Second Category/i });
    fireEvent.click(continueBtn);

    // Advances to Category 2
    expect(screen.getByText(/Choose the second category/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 3 of 3/i)).toBeInTheDocument();

    // Select ETFs
    const etfBtn = screen.getByRole('radio', { name: /Exchange Traded Funds \(ETFs\)/i });
    fireEvent.click(etfBtn);

    // Click View Comparison
    const viewComparisonBtn = screen.getByRole('button', { name: /View Comparison/i });
    fireEvent.click(viewComparisonBtn);

    // Renders comparison!
    expect(screen.getByText(/Index Funds vs\. Exchange Traded Funds \(ETFs\)/i)).toBeInTheDocument();
  });
});
