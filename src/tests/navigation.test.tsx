import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
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

const renderWithProviders = (initialRoute: string) => {
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

describe('Route Navigation & Page Shells', () => {
  it('renders HomePage at "/" with Intent Builder', () => {
    renderWithProviders('/');
    expect(screen.getByText(/What is Groww Compass\?/i)).toBeInTheDocument();
    expect(screen.getByText(/What do you want to understand today\?/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders ExplorePage at "/explore" with all categories', () => {
    renderWithProviders('/explore');
    expect(screen.getByText(/5 Core Asset Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Individual Stocks/i)).toBeInTheDocument();
    expect(screen.getByText(/Index Funds/i)).toBeInTheDocument();
  });

  it('renders ComparePage at "/compare" with 8 dimensions', () => {
    renderWithProviders('/compare');
    expect(screen.getByText(/Investment Comparison Lab/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category 2/i)).toBeInTheDocument();
    expect(screen.getByText(/What You Own/i)).toBeInTheDocument();
  });

  it('renders LearnPage at "/learn" with educational concepts library', () => {
    renderWithProviders('/learn');
    expect(screen.getByText(/Investment Concepts Explained/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search Diversification/i)).toBeInTheDocument();
    expect(screen.getByText(/Educational Standard Notice/i)).toBeInTheDocument();
  });

  it('renders SavedPage at "/saved" with empty state or list', () => {
    renderWithProviders('/saved');
    expect(screen.getByRole('heading', { level: 1, name: /^Saved Comparisons$/i })).toBeInTheDocument();
    expect(screen.getByText(/No saved comparisons yet/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown routes', () => {
    renderWithProviders('/non-existent-random-route');
    expect(screen.getByText(/You've wandered off the compass map/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /return to explore/i })).toBeInTheDocument();
  });
});
