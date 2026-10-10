import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppShell } from '@/components/layout/AppShell';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { JargonDrawerProvider } from '@/context/JargonDrawerContext';

describe('Mobile-First Layout & Ergonomics', () => {
  it('AppShell container enforces overflow-x hidden and bottom padding', () => {
    const { container } = render(
      <ThemeProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <MemoryRouter>
              <AppShell />
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </ThemeProvider>
    );

    // Root wrapper
    const rootWrapper = container.firstChild as HTMLElement;
    expect(rootWrapper).toHaveClass('overflow-x-hidden');

    // Main content area
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('pb-28'); // Protects content from being covered by bottom navigation
    expect(mainContent).toHaveClass('pb-safe');

    // Bottom navigation
    const bottomNav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(bottomNav).toHaveClass('fixed');
    expect(bottomNav).toHaveClass('bottom-0');
    expect(bottomNav).toHaveClass('pb-safe');
  });

  it('Bottom navigation renders all 4 primary mobile tabs with touch targets', () => {
    render(
      <ThemeProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <MemoryRouter>
              <AppShell />
            </MemoryRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </ThemeProvider>
    );

    const exploreLink = screen.getByRole('link', { name: /explore/i });
    const compareLink = screen.getByRole('link', { name: /compare/i });
    const learnLink = screen.getByRole('link', { name: /learn/i });
    const savedLink = screen.getByRole('link', { name: /saved/i });

    expect(exploreLink).toHaveClass('min-h-touch');
    expect(compareLink).toHaveClass('min-h-touch');
    expect(learnLink).toHaveClass('min-h-touch');
    expect(savedLink).toHaveClass('min-h-touch');
  });
});
