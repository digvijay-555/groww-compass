import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import { IntentProvider } from '@/context/IntentContext';
import { ToastProvider } from '@/context/ToastContext';
import { JargonDrawerProvider } from '@/context/JargonDrawerContext';
import { AppShell } from '@/components/layout/AppShell';
import { ComparePage } from '@/pages/ComparePage';
import { SavedPage } from '@/pages/SavedPage';

import { useSavedComparisons, SAVED_STORAGE_KEY } from '@/hooks/useSavedComparisons';
import { SavedRecord, isValidSavedRecord } from '@/types/saved';

const renderSavedApp = (initialRoute: string = '/saved') => {
  return render(
    <ThemeProvider>
      <IntentProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
              <Routes>
                <Route path="/" element={<AppShell />}>
                  <Route path="compare" element={<ComparePage />} />
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

describe('Saved Comparisons Test Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  // ==========================================
  // Section 1: Type Validator & Data Model
  // ==========================================
  describe('Type Validation & Data Model', () => {
    it('validates a well-formed SavedRecord correctly', () => {
      const validItem: SavedRecord = {
        id: 'saved_stocks_equity-mf_123',
        pairId: 'stocks-vs-equity-mf',
        categoryAId: 'stocks',
        categoryBId: 'equity-mf',
        categoryAName: 'Individual Stocks',
        categoryBName: 'Equity Mutual Funds',
        savedAt: new Date().toISOString(),
        displayDate: '9 Oct 2026',
        summary: 'Direct comparison between stocks and funds.',
        customLabel: 'My Notes',
      };

      expect(isValidSavedRecord(validItem)).toBe(true);
    });

    it('rejects malformed records missing critical fields', () => {
      expect(isValidSavedRecord(null)).toBe(false);
      expect(isValidSavedRecord(undefined)).toBe(false);
      expect(isValidSavedRecord('string')).toBe(false);
      expect(isValidSavedRecord(12345)).toBe(false);
      expect(isValidSavedRecord({})).toBe(false);

      // Missing categoryBId
      expect(
        isValidSavedRecord({
          id: 'item-1',
          categoryAId: 'stocks',
          categoryAName: 'Stocks',
          categoryBName: 'Funds',
        })
      ).toBe(false);

      // Empty categoryAId
      expect(
        isValidSavedRecord({
          id: 'item-1',
          categoryAId: '',
          categoryBId: 'funds',
          categoryAName: 'Stocks',
          categoryBName: 'Funds',
        })
      ).toBe(false);
    });
  });

  // ==========================================
  // Section 2: useSavedComparisons Hook Tests
  // ==========================================
  describe('useSavedComparisons Hook Core Logic', () => {
    it('initializes with empty array when localStorage is empty', () => {
      const { result } = renderHook(() => useSavedComparisons());
      expect(result.current.savedItems).toEqual([]);
    });

    it('saves a comparison and writes to localStorage with proper metadata', () => {
      const { result } = renderHook(() => useSavedComparisons());

      act(() => {
        result.current.saveComparison(
          'stocks',
          'equity-mf',
          'Individual Stocks',
          'Equity Mutual Funds',
          'Ownership vs pooled risk trade-off.'
        );
      });

      expect(result.current.savedItems).toHaveLength(1);
      const saved = result.current.savedItems[0];
      expect(saved.categoryAId).toBe('stocks');
      expect(saved.categoryBId).toBe('equity-mf');
      expect(saved.categoryAName).toBe('Individual Stocks');
      expect(saved.categoryBName).toBe('Equity Mutual Funds');
      expect(saved.summary).toBe('Ownership vs pooled risk trade-off.');
      expect(saved.pairId).toBe('stocks-vs-equity-mf');
      expect(saved.savedAt).toBeTruthy();
      expect(saved.displayDate).toBeTruthy();

      // Check localStorage content
      const stored = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe(saved.id);
    });

    it('deduplicates and prevents saving the same pair or inverted pair twice', () => {
      const { result } = renderHook(() => useSavedComparisons());

      act(() => {
        result.current.saveComparison(
          'stocks',
          'equity-mf',
          'Individual Stocks',
          'Equity Mutual Funds'
        );
      });

      expect(result.current.savedItems).toHaveLength(1);
      expect(result.current.isSaved('stocks', 'equity-mf')).toBe(true);
      expect(result.current.isSaved('equity-mf', 'stocks')).toBe(true);

      // Attempt to save again in normal order
      act(() => {
        result.current.saveComparison(
          'stocks',
          'equity-mf',
          'Individual Stocks',
          'Equity Mutual Funds'
        );
      });
      expect(result.current.savedItems).toHaveLength(1);

      // Attempt to save in inverted order
      act(() => {
        result.current.saveComparison(
          'equity-mf',
          'stocks',
          'Equity Mutual Funds',
          'Individual Stocks'
        );
      });
      expect(result.current.savedItems).toHaveLength(1);
    });

    it('removes a comparison by id', () => {
      const { result } = renderHook(() => useSavedComparisons());

      act(() => {
        result.current.saveComparison(
          'index-funds',
          'etfs',
          'Index Funds',
          'ETFs'
        );
      });

      expect(result.current.savedItems).toHaveLength(1);
      const id = result.current.savedItems[0].id;

      act(() => {
        result.current.removeComparison(id);
      });

      expect(result.current.savedItems).toHaveLength(0);
      expect(JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]')).toEqual([]);
    });

    it('updates custom label / personal notes for a saved record', () => {
      const { result } = renderHook(() => useSavedComparisons());

      act(() => {
        result.current.saveComparison(
          'stocks',
          'equity-mf',
          'Individual Stocks',
          'Equity Mutual Funds'
        );
      });

      const id = result.current.savedItems[0].id;

      act(() => {
        result.current.updateCustomLabel(id, 'Key retirement question');
      });

      expect(result.current.savedItems[0].customLabel).toBe('Key retirement question');
      const stored = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]');
      expect(stored[0].customLabel).toBe('Key retirement question');
    });

    it('clears all comparisons when clearAll is called', () => {
      const { result } = renderHook(() => useSavedComparisons());

      act(() => {
        result.current.saveComparison('stocks', 'equity-mf', 'Stocks', 'Equity MF');
      });
      act(() => {
        result.current.saveComparison('index-funds', 'etfs', 'Index Funds', 'ETFs');
      });

      expect(result.current.savedItems).toHaveLength(2);

      act(() => {
        result.current.clearAll();
      });

      expect(result.current.savedItems).toHaveLength(0);
      expect(JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]')).toEqual([]);
    });

    it('handles corrupted localStorage JSON gracefully without crashing', () => {
      // Set non-JSON string
      window.localStorage.setItem(SAVED_STORAGE_KEY, 'corrupted_json{{{bad');

      const { result } = renderHook(() => useSavedComparisons());
      expect(result.current.savedItems).toEqual([]);
    });

    it('handles non-array localStorage data gracefully without crashing', () => {
      // Set object instead of array
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify({ item: 'not-an-array' }));

      const { result } = renderHook(() => useSavedComparisons());
      expect(result.current.savedItems).toEqual([]);
    });

    it('filters out corrupted items in an array while preserving valid records', () => {
      const validRecord: SavedRecord = {
        id: 'saved_valid_1',
        pairId: 'index-funds-vs-etfs',
        categoryAId: 'index-funds',
        categoryBId: 'etfs',
        categoryAName: 'Index Funds',
        categoryBName: 'ETFs',
        savedAt: new Date().toISOString(),
        displayDate: '9 Oct 2026',
        summary: 'Trading flexibility vs SIP convenience.',
      };

      const mixed = [
        validRecord,
        { broken: true }, // invalid
        null, // invalid
        { id: 123, categoryAId: null }, // invalid
      ];

      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(mixed));

      const { result } = renderHook(() => useSavedComparisons());
      expect(result.current.savedItems).toHaveLength(1);
      expect(result.current.savedItems[0].id).toBe('saved_valid_1');
    });

    it('handles localStorage storage failures (quota exceeded or blocked) gracefully', () => {
      const { result } = renderHook(() => useSavedComparisons());

      // Mock setItem to throw QuotaExceededError
      const originalSetItem = window.localStorage.setItem;
      window.localStorage.setItem = vi.fn(() => {
        throw new Error('QuotaExceededError');
      });

      // Should not throw or crash the app
      expect(() => {
        act(() => {
          result.current.saveComparison('stocks', 'equity-mf', 'Stocks', 'Equity MF');
        });
      }).not.toThrow();

      // State is still updated locally in memory
      expect(result.current.savedItems).toHaveLength(1);

      window.localStorage.setItem = originalSetItem;
    });
  });

  // ==========================================
  // Section 3: SavedPage UI & User Interactions
  // ==========================================
  describe('SavedPage UI & User Interactions', () => {
    it('renders empty state when no comparisons are saved', () => {
      renderSavedApp('/saved');

      expect(screen.getByRole('heading', { level: 1, name: /^Saved Comparisons$/i })).toBeInTheDocument();
      expect(screen.getByText(/No saved comparisons yet/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /When you explore trade-offs in the Comparison Lab, tap the bookmark icon to save key comparisons here for quick review\./i
        )
      ).toBeInTheDocument();

      const actionBtn = screen.getByRole('button', { name: /explore curated comparisons/i });
      expect(actionBtn).toBeInTheDocument();

      // Clicking action button navigates to comparison lab
      fireEvent.click(actionBtn);
      expect(screen.getByText(/Investment Comparison Lab/i)).toBeInTheDocument();
    });

    it('renders privacy notice explaining local device storage without sensitive credentials', () => {
      renderSavedApp('/saved');

      expect(screen.getByText(/Local Device Storage Only/i)).toBeInTheDocument();
      expect(screen.getByText(/Groww Compass does not sync records to an external cloud/i)).toBeInTheDocument();
      expect(screen.getByText(/or collect bank accounts, PAN, Aadhaar, or credentials\./i)).toBeInTheDocument();
    });

    it('displays saved items with title, date, summary, and reopen action', () => {
      const seedItem: SavedRecord = {
        id: 'saved_stocks_equity-mf_test',
        pairId: 'stocks-vs-equity-mf',
        categoryAId: 'stocks',
        categoryBId: 'equity-mf',
        categoryAName: 'Individual Stocks',
        categoryBName: 'Equity Mutual Funds',
        savedAt: '2026-10-09T10:00:00.000Z',
        displayDate: '9 Oct 2026',
        summary: 'Direct ownership versus managed fund diversification.',
        customLabel: 'Top Priority',
      };
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify([seedItem]));

      renderSavedApp('/saved');

      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByText(/Saved on 9 Oct 2026/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Direct ownership versus managed fund diversification\./i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Top Priority/i)).toBeInTheDocument();

      // Reopen comparison button is present
      const reopenBtn = screen.getByRole('button', { name: /reopen comparison/i });
      expect(reopenBtn).toBeInTheDocument();

      // Clicking Reopen navigates to Comparison Lab with matching query params
      fireEvent.click(reopenBtn);
      expect(screen.getByText(/Individual Stocks vs\. Equity Mutual Funds/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Category 1/i)).toHaveValue('stocks');
      expect(screen.getByLabelText(/Category 2/i)).toHaveValue('equity-mf');
    });

    it('prevents accidental deletion by requiring confirmation in a modal', () => {
      const seedItem: SavedRecord = {
        id: 'saved_delete_test',
        pairId: 'index-funds-vs-etfs',
        categoryAId: 'index-funds',
        categoryBId: 'etfs',
        categoryAName: 'Index Funds',
        categoryBName: 'ETFs',
        savedAt: '2026-10-09T10:00:00.000Z',
        displayDate: '9 Oct 2026',
        summary: 'Test summary.',
      };
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify([seedItem]));

      renderSavedApp('/saved');

      expect(screen.getByText(/Index Funds vs\. ETFs/i)).toBeInTheDocument();

      // Click delete button on card
      const deleteBtn = screen.getByRole('button', {
        name: /delete saved comparison between Index Funds and ETFs/i,
      });
      fireEvent.click(deleteBtn);

      // Modal bottom sheet appears
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Remove Saved Comparison\?/i)).toBeInTheDocument();

      // Test Cancel keeps the item
      const cancelBtn = screen.getByRole('button', { name: /cancel, keep it/i });
      fireEvent.click(cancelBtn);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByText(/Index Funds vs\. ETFs/i)).toBeInTheDocument();

      // Click delete button again and confirm
      fireEvent.click(deleteBtn);
      const confirmRemoveBtn = screen.getByRole('button', { name: /yes, remove comparison/i });
      fireEvent.click(confirmRemoveBtn);

      // Modal closed and item removed, showing empty state
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByText(/No saved comparisons yet/i)).toBeInTheDocument();
      expect(JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]')).toEqual([]);
    });

    it('prevents accidental Clear All with confirmation dialog', () => {
      const seedItems: SavedRecord[] = [
        {
          id: 'item-1',
          pairId: 'stocks-vs-equity-mf',
          categoryAId: 'stocks',
          categoryBId: 'equity-mf',
          categoryAName: 'Stocks',
          categoryBName: 'Equity MF',
          savedAt: new Date().toISOString(),
          displayDate: '9 Oct 2026',
          summary: 'Summary 1',
        },
        {
          id: 'item-2',
          pairId: 'index-funds-vs-etfs',
          categoryAId: 'index-funds',
          categoryBId: 'etfs',
          categoryAName: 'Index Funds',
          categoryBName: 'ETFs',
          savedAt: new Date().toISOString(),
          displayDate: '9 Oct 2026',
          summary: 'Summary 2',
        },
      ];
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(seedItems));

      renderSavedApp('/saved');

      // Clear All button in header
      const clearAllBtn = screen.getByRole('button', { name: /clear all/i });
      fireEvent.click(clearAllBtn);

      // Confirmation dialog appears
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Clear All Saved Comparisons\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete all 2 saved comparisons\?/i)).toBeInTheDocument();

      // Cancel keeps items
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelBtn);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByText(/Stocks vs\. Equity MF/i)).toBeInTheDocument();
      expect(screen.getByText(/Index Funds vs\. ETFs/i)).toBeInTheDocument();

      // Confirm Clear All
      fireEvent.click(clearAllBtn);
      const confirmClearBtn = screen.getByRole('button', { name: /yes, clear all comparisons/i });
      fireEvent.click(confirmClearBtn);

      expect(screen.getByText(/No saved comparisons yet/i)).toBeInTheDocument();
      expect(JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]')).toEqual([]);
    });

    it('allows editing and saving a custom personal note on a card', () => {
      const seedItem: SavedRecord = {
        id: 'saved_note_test',
        pairId: 'stocks-vs-equity-mf',
        categoryAId: 'stocks',
        categoryBId: 'equity-mf',
        categoryAName: 'Stocks',
        categoryBName: 'Funds',
        savedAt: new Date().toISOString(),
        displayDate: '9 Oct 2026',
        summary: 'Summary',
      };
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify([seedItem]));

      renderSavedApp('/saved');

      // Click "+ Add personal note"
      const addNoteBtn = screen.getByRole('button', { name: /\+ add personal note/i });
      fireEvent.click(addNoteBtn);

      // Input appears
      const input = screen.getByPlaceholderText(/Add personal note/i);
      expect(input).toBeInTheDocument();

      // Type new note
      fireEvent.change(input, { target: { value: 'Compare for SIP monthly plan' } });

      // Click save checkmark button
      const saveBtn = screen.getByRole('button', { name: /save note/i });
      fireEvent.click(saveBtn);

      // Note badge is now displayed!
      expect(screen.getByText('Compare for SIP monthly plan')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /edit note/i })).toBeInTheDocument();

      // Verified stored in localStorage
      const stored = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]');
      expect(stored[0].customLabel).toBe('Compare for SIP monthly plan');
    });

    it('saves a comparison directly from Comparison Lab and updates bottom nav badge', () => {
      renderSavedApp('/compare?a=stocks&b=equity-mf');

      // Bookmark button on ComparePage
      const saveBtn = screen.getByRole('button', { name: /save this comparison/i });
      fireEvent.click(saveBtn);

      // Toast feedback appears
      expect(screen.getByText(/Saved comparison to your Saved hub!/i)).toBeInTheDocument();

      // Button state changes
      expect(screen.getByRole('button', { name: /remove saved comparison/i })).toBeInTheDocument();

      // Bottom nav Saved link shows badge "1"
      const savedNavLink = screen.getByRole('link', { name: /saved/i });
      expect(savedNavLink).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
