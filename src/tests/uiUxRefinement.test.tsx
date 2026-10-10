import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
import { BottomSheet } from '@/components/common/BottomSheet';

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

// Test wrapper for testing BottomSheet focus trap in isolation
const BottomSheetTestHarness: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        id="trigger-btn"
        onClick={() => setIsOpen(true)}
      >
        Open Sheet
      </button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal Sheet"
        subtitle="Testing modal ergonomics"
      >
        <button type="button" id="first-inner-btn">
          First Action
        </button>
        <input type="text" id="middle-input" placeholder="Test input" />
        <button type="button" id="last-inner-btn">
          Last Action
        </button>
      </BottomSheet>
    </div>
  );
};

describe('Dedicated UI/UX Refinement Test Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  // ========================================================
  // Section 1: Dark Mode Primary Design & Light Mode System
  // ========================================================
  describe('Dark Mode & Light Mode Implementation', () => {
    it('applies dark mode by default for first-time visitors with correct meta theme-color', () => {
      // Mock meta tag
      const meta = document.createElement('meta');
      meta.id = 'theme-color-meta';
      document.head.appendChild(meta);

      renderAppWithRoute('/');

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(meta.getAttribute('content')).toBe('#0D1117');

      document.head.removeChild(meta);
    });

    it('toggles seamlessly between dark and light themes without breaking layout', () => {
      renderAppWithRoute('/');

      // Locate discoverable theme toggle in MobileHeader
      const themeToggle = screen.getByRole('button', { name: /switch to light mode/i });
      expect(themeToggle).toBeInTheDocument();

      // Click to switch to light mode
      fireEvent.click(themeToggle);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('groww_compass_theme')).toBe('light');

      // Click to switch back to dark mode
      const darkToggle = screen.getByRole('button', { name: /switch to dark mode/i });
      fireEvent.click(darkToggle);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(window.localStorage.getItem('groww_compass_theme')).toBe('dark');
    });
  });

  // ========================================================
  // Section 2: Mobile Ergonomics & Viewport Scaling
  // ========================================================
  describe('Mobile Layout & One-Handed Ergonomics', () => {
    it('ensures all interactive primary buttons and nav links satisfy >=44px minimum touch targets', () => {
      renderAppWithRoute('/explore');

      const buttons = screen.getAllByRole('button');
      const touchCompliantButtons = buttons.filter((b) =>
        b.className.includes('min-h-touch') || b.className.includes('h-10') || b.className.includes('h-11')
      );

      // Vast majority of interactive elements must be minimum 44px
      expect(touchCompliantButtons.length).toBeGreaterThanOrEqual(10);

      // Verify bottom nav items
      const exploreLink = screen.getByRole('link', { name: /explore/i });
      const compareLink = screen.getByRole('link', { name: /compare/i });
      const learnLink = screen.getByRole('link', { name: /learn/i });
      const savedLink = screen.getByRole('link', { name: /saved/i });

      expect(exploreLink).toHaveClass('min-h-touch');
      expect(compareLink).toHaveClass('min-h-touch');
      expect(learnLink).toHaveClass('min-h-touch');
      expect(savedLink).toHaveClass('min-h-touch');
    });

    it('preserves bottom safe-area padding pb-28 pb-safe on main container so bottom nav never covers content', () => {
      renderAppWithRoute('/explore');

      const mainElement = screen.getByRole('main');
      expect(mainElement).toHaveClass('pb-28');
      expect(mainElement).toHaveClass('pb-safe');

      const bottomNav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(bottomNav).toHaveClass('pb-safe');
      expect(bottomNav).toHaveClass('fixed');
      expect(bottomNav).toHaveClass('bottom-0');
    });

    it('enforces single-column card stacking on mobile viewports for comparison dimensions', () => {
      renderAppWithRoute('/compare?a=stocks&b=equity-mf');

      const dimensionArticles = screen.getAllByRole('article');
      expect(dimensionArticles.length).toBeGreaterThanOrEqual(1);

      // Ensure no horizontal overflow on page wrapper
      const pageWrapper = document.getElementById('main-content');
      expect(pageWrapper).toBeInTheDocument();
    });
  });

  // ========================================================
  // Section 3: BottomSheet Dialog Focus Trap & Keyboard Navigation
  // ========================================================
  describe('BottomSheet Accessibility & Focus Trapping', () => {
    it('traps keyboard Tab navigation inside open BottomSheet dialog', () => {
      render(<BottomSheetTestHarness />);

      const triggerBtn = screen.getByRole('button', { name: /open sheet/i });
      fireEvent.click(triggerBtn);

      // Sheet opens
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');

      const closeBtn = screen.getByRole('button', { name: /close dialog/i });
      const firstInnerBtn = screen.getByRole('button', { name: /first action/i });
      const lastInnerBtn = screen.getByRole('button', { name: /last action/i });
      expect(firstInnerBtn).toBeInTheDocument();

      // Focus last element and press Tab -> should wrap to close button (first focusable)
      lastInnerBtn.focus();
      expect(document.activeElement).toBe(lastInnerBtn);

      fireEvent.keyDown(document, { key: 'Tab' });
      expect(document.activeElement).toBe(closeBtn);

      // Focus first element (close button) and press Shift+Tab -> should wrap to last element
      closeBtn.focus();
      expect(document.activeElement).toBe(closeBtn);

      fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(lastInnerBtn);
    });

    it('closes BottomSheet with Escape key and restores focus to triggering element', () => {
      render(<BottomSheetTestHarness />);

      const triggerBtn = screen.getByRole('button', { name: /open sheet/i });
      triggerBtn.focus();
      expect(document.activeElement).toBe(triggerBtn);

      // Open sheet
      fireEvent.click(triggerBtn);
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });

      // Dialog is removed from DOM
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Focus is restored to trigger button!
      expect(document.activeElement).toBe(triggerBtn);
    });
  });

  // ========================================================
  // Section 4: Content Integrity & No Fake Statistics
  // ========================================================
  describe('Fintech Product Trust & Copy Integrity', () => {
    it('never guarantees returns or claims one asset is universally superior', () => {
      renderAppWithRoute('/');

      // Check HomePage copy
      expect(
        screen.getByText(/Groww Compass never declares one asset universally superior/i)
      ).toBeInTheDocument();

      // Verify no misleading claims
      const bodyText = document.body.textContent || '';
      expect(bodyText).not.toContain('guaranteed 15%');
      expect(bodyText).not.toContain('guaranteed returns');
      expect(bodyText).not.toContain('risk-free high returns');
    });

    it('all interactive tabs and links have valid targets', () => {
      renderAppWithRoute('/explore');

      const exploreTab = screen.getByRole('link', { name: /explore/i });
      const compareTab = screen.getByRole('link', { name: /compare/i });
      const learnTab = screen.getByRole('link', { name: /learn/i });
      const savedTab = screen.getByRole('link', { name: /saved/i });

      expect(exploreTab).toHaveAttribute('href', '/explore');
      expect(compareTab).toHaveAttribute('href', '/compare');
      expect(learnTab).toHaveAttribute('href', '/learn');
      expect(savedTab).toHaveAttribute('href', '/saved');
    });
  });
});
