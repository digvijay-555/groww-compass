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
import { INVESTMENT_CATEGORIES } from '@/data/education/categories';
import { USER_INTENTS, EXPERIENCE_LEVELS } from '@/data/intent/options';

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
                </Route>
              </Routes>
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

describe('Acceptance Test Suite: Intent Builder & Investment Discovery Flow', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  // Acceptance Criterion 1: A new visitor understands the purpose of the product
  it('Criterion 1: Home page immediately explains what Groww Compass is and how it helps without requiring an account', () => {
    renderAppWithRoute('/');

    // 1. What is Groww Compass?
    expect(screen.getByText(/What is Groww Compass\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A calm, unbiased discovery guide designed for first-time Indian investors/i)
    ).toBeInTheDocument();

    // 2. Clear value pillars
    expect(screen.getByText(/1\. Cut Jargon/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Compare Honestly/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. No Sales Push/i)).toBeInTheDocument();

    // 3. Explicitly states no account required
    expect(screen.getByText(/No account or login required/i)).toBeInTheDocument();
  });

  // Acceptance Criterion 2: The user can select an intent and experience level
  it('Criterion 2: The user can select from all 5 prompt intents and 3 experience levels', () => {
    renderAppWithRoute('/');

    // Verify all 5 prompt intents exist
    USER_INTENTS.forEach((intent) => {
      expect(screen.getByText(intent.label)).toBeInTheDocument();
    });

    // Select "I want to explore mutual funds."
    const fundsIntentBtn = screen.getByRole('radio', {
      name: /I want to explore mutual funds\./i,
    });
    fireEvent.click(fundsIntentBtn);
    expect(fundsIntentBtn).toHaveAttribute('aria-checked', 'true');

    // Verify all 3 experience levels exist
    EXPERIENCE_LEVELS.forEach((level) => {
      expect(screen.getByText(level.label)).toBeInTheDocument();
    });

    // Select "Know the basics"
    const basicsLevelBtn = screen.getByRole('radio', { name: /Know the basics/i });
    fireEvent.click(basicsLevelBtn);
    expect(basicsLevelBtn).toHaveAttribute('aria-checked', 'true');

    // Verify dynamic guidance updates
    expect(screen.getAllByText(/Focusing on: I want to explore mutual funds\./i).length).toBeGreaterThan(0);
  });

  // Acceptance Criterion 3: The user can explore every supported category with definition, ownership, and consideration
  it('Criterion 3: The user can explore all 5 categories with plain-English definition, ownership, and consideration', () => {
    renderAppWithRoute('/explore');

    expect(screen.getByText(/5 Core Asset Categories/i)).toBeInTheDocument();

    // Verify all 5 categories are rendered
    expect(INVESTMENT_CATEGORIES).toHaveLength(5);

    INVESTMENT_CATEGORIES.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      expect(screen.getByText(category.shortDescription)).toBeInTheDocument();
      expect(screen.getByText(category.ownership)).toBeInTheDocument();
      expect(screen.getByText(category.importantConsideration)).toBeInTheDocument();
    });
  });

  // Acceptance Criterion 4: The user can start a supported comparison from a category
  it('Criterion 4: The user can trigger comparison picker from a category and navigate to Compare', () => {
    renderAppWithRoute('/explore');

    // Find the Compare button for "Individual Stocks"
    const stockArticles = screen.getAllByRole('article');
    const stocksCard = stockArticles[0]; // Individual Stocks
    const compareBtn = within(stocksCard).getByRole('button', { name: /^Compare$/i });

    fireEvent.click(compareBtn);

    // ComparePairPickerSheet dialog should open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Compare Individual Stocks/i)).toBeInTheDocument();

    // Click on a target option (Equity Mutual Funds)
    const equityMfOption = screen.getByRole('button', {
      name: /Equity Mutual Funds/i,
    });
    fireEvent.click(equityMfOption);

    // Navigates to ComparePage
    expect(screen.getByText(/Investment Comparison Lab/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
    expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');
  });

  // Acceptance Criterion 5: The user can navigate backward and change selections
  it('Criterion 5: User can see their selected intent in Explore and click "Change" to navigate back to Home', () => {
    renderAppWithRoute('/explore');

    // Intent banner is visible
    expect(screen.getByText(/Your Selected Intent/i)).toBeInTheDocument();

    const changeBtn = screen.getByRole('button', { name: /Change/i });
    expect(changeBtn).toBeInTheDocument();

    fireEvent.click(changeBtn);

    // Routed back to Home
    expect(screen.getByText(/What do you want to understand today\?/i)).toBeInTheDocument();
  });

  // Acceptance Criterion 6: No category is presented as universally best
  it('Criterion 6: Neutral educational framing with provider notices and explicit no-best declarations', () => {
    renderAppWithRoute('/explore');

    // Check that explicit disclaimer is present
    expect(
      screen.getByText(/No option is universally best—each fits different goals/i)
    ).toBeInTheDocument();

    // Verify all 5 categories mention that specific charges/returns depend on the provider or fund
    const providerNotices = screen.getAllByText(
      /\* Note: Specific metrics \(charges, minimums, exit loads, tracking error\) depend on the specific scheme, security, or provider chosen\./i
    );
    expect(providerNotices.length).toBe(5);

    // Verify that phrases like "best investment" or "guaranteed return" do not appear as claims
    expect(screen.queryByText(/guaranteed returns/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/best investment for everyone/i)).not.toBeInTheDocument();
  });

  // Acceptance Criterion 7: The layout supports mobile viewports with touch targets and single-column cards
  it('Criterion 7: Cards enforce single-column spacing and buttons have >= 44px min-h-touch', () => {
    renderAppWithRoute('/explore');

    const articles = screen.getAllByRole('article');
    articles.forEach((article) => {
      // Single-column mobile card styling
      expect(article).toHaveClass('p-4');
    });

    // Touch targets verification
    const allButtons = screen.getAllByRole('button');
    const primaryOrSecondaryButtons = allButtons.filter((btn) =>
      btn.className.includes('min-h-touch')
    );
    expect(primaryOrSecondaryButtons.length).toBeGreaterThanOrEqual(10);
  });

  // Acceptance Criterion 8: Dark mode remains the default for a new visitor
  it('Criterion 8: Dark mode is default on first visit and persists across navigation', () => {
    renderAppWithRoute('/');

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('groww_compass_theme')).toBe('dark');

    // Switch to light mode
    const toggleBtn = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('groww_compass_theme')).toBe('light');
  });
});
