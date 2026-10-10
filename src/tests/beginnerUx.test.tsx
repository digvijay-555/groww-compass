import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import { IntentProvider } from '@/context/IntentContext';
import { ToastProvider } from '@/context/ToastContext';
import { JargonDrawerProvider } from '@/context/JargonDrawerContext';
import { AppShell } from '@/components/layout/AppShell';

import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ComparePage } from '@/pages/ComparePage';
import { LearnPage } from '@/pages/LearnPage';
import { HoldingComparisonDiagram } from '@/components/visuals/HoldingComparisonDiagram';

const renderAppWithRoute = (initialRoute: string) => {
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
                </Route>
              </Routes>
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

describe('Beginner UX & Visual Redesign Verification Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  // Scenario 1: Immediate Purpose Identification & 3-Second Rule
  it('Scenario 1: Home page immediately surfaces beginner hero and 3 distinct action cards', () => {
    renderAppWithRoute('/');

    // 1. Direct Beginner Headline & Supporting Copy
    expect(
      screen.getByRole('heading', { level: 1, name: /Not sure where to start\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Understand your investment options\./i)
    ).toBeInTheDocument();

    // 2. Three Visually Distinct Action Cards
    expect(screen.getByText(/^Compare options$/i)).toBeInTheDocument();
    expect(screen.getByText(/Contrast two investments side-by-side to understand trade-offs\./i)).toBeInTheDocument();

    expect(screen.getByText(/^Explore investments$/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover stocks, mutual funds, index funds, and ETFs\./i)).toBeInTheDocument();

    expect(screen.getByText(/^Learn the basics$/i)).toBeInTheDocument();
    expect(screen.getByText(/Understand diversification, expense ratios, and volatility\./i)).toBeInTheDocument();
  });

  // Scenario 2: Comparison Launch from Home
  it('Scenario 2: Tapping "Compare options" launches comparison flow', () => {
    renderAppWithRoute('/');

    const compareCard = screen.getByRole('button', { name: /Compare options/i });
    fireEvent.click(compareCard);

    // In the step-by-step flow, clicking Compare options opens Screen 2: What do you want to compare?
    expect(
      screen.getByRole('heading', { level: 1, name: /What do you want to compare\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Stocks vs\. Equity Mutual Funds/i)
    ).toBeInTheDocument();

    // Clicking continue proceeds to comparison view
    const continueBtn = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueBtn);

    expect(
      screen.getByRole('heading', { level: 1, name: /Investment Comparison Lab/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)
    ).toBeInTheDocument();
  });

  // Scenario 3: Interactive Mental Model Diagram (HoldingComparisonDiagram)
  it('Scenario 3: HoldingComparisonDiagram demonstrates 100% single holding vs cushioned basket', () => {
    render(<HoldingComparisonDiagram interactive={true} />);

    expect(screen.getByText(/1\. Single Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/100% in 1 Company/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Diversified Fund/i)).toBeInTheDocument();
    expect(screen.getByText(/30–50\+ Holdings/i)).toBeInTheDocument();

    // Tap a holding in the basket (e.g. Tech Co)
    const techBtn = screen.getByRole('button', { name: /Tech Co: 6% allocation/i });
    fireEvent.click(techBtn);

    // Dynamic cushioned explanation reflects the selection
    expect(
      screen.getByText(/Tech Co represents only 6%\. A drop here has a limited impact on the total fund\./i)
    ).toBeInTheDocument();
  });

  // Scenario 4: Visual Category Concept Diagrams on Explore Page
  it('Scenario 4: Explore page renders visual concept models for asset categories', () => {
    renderAppWithRoute('/explore');

    expect(screen.getByText(/5 Core Asset Categories/i)).toBeInTheDocument();

    // Check that visual concept diagrams are mounted
    expect(
      screen.getByLabelText(/Diagram: Single stock ownership in one enterprise/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Diagram: Pooled fund basket investing into 30 to 50\+ companies/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Diagram: Debt fund lending to government and corporate issuers/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Diagram: Index fund mirroring benchmark like Nifty 50/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Diagram: ETF units trading live on stock exchange via Demat/i)
    ).toBeInTheDocument();
  });

  // Scenario 5: Visual Overview Cards at Top of Comparison Lab
  it('Scenario 5: Comparison lab displays Option 1 and Option 2 visual top cards', () => {
    renderAppWithRoute('/compare?a=stocks&b=equity-mf');

    expect(screen.getAllByText(/^Option 1$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^Option 2$/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Direct Focus/i)).toBeInTheDocument();
    expect(screen.getByText(/Pooled Structure/i)).toBeInTheDocument();
  });

  // Scenario 6: Learn Page Reading Times and Compact Concept Cards
  it('Scenario 6: Learn page provides estimated reading time and scannable cards', () => {
    renderAppWithRoute('/learn');

    // Calculated reading time tags exist
    const readTimes = screen.getAllByText(/1 min read/i);
    expect(readTimes.length).toBeGreaterThan(0);

    // Open topic drawer for Diversification
    const openBtn = screen.getByRole('button', { name: /Read explanation for Diversification/i });
    fireEvent.click(openBtn);

    // Topic drawer opens with visual diagram and self-check
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/Quick Comprehension Check/i)).toBeInTheDocument();

    // Tap to reveal knowledge check explanation
    const revealBtn = within(dialog).getByRole('button', { name: /Tap to reveal explanation/i });
    fireEvent.click(revealBtn);

    expect(
      within(dialog).getByText(/Diversification cushions against single-company failures/i)
    ).toBeInTheDocument();
  });
});
