import { useState, useEffect, useCallback } from 'react';
import { SavedRecord, isValidSavedRecord } from '@/types/saved';

export const SAVED_STORAGE_KEY = 'groww_compass_saved_comparisons';

export function useSavedComparisons() {
  // Safe read from localStorage with validation and corruption protection
  const readStorage = useCallback((): SavedRecord[] => {
    if (typeof window === 'undefined') return [];

    try {
      const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.warn('Storage value for saved comparisons was not an array. Resetting.');
        return [];
      }

      // Filter and validate each record
      const validRecords = parsed.filter(isValidSavedRecord);
      return validRecords;
    } catch (error) {
      console.warn('Error reading saved comparisons from localStorage (corrupted or blocked):', error);
      return [];
    }
  }, []);

  const [savedItems, setSavedItems] = useState<SavedRecord[]>(readStorage);

  // Write to localStorage safely
  const persist = useCallback(
    (updater: SavedRecord[] | ((prev: SavedRecord[]) => SavedRecord[])) => {
      setSavedItems((prev) => {
        let current = prev;
        if (typeof window !== 'undefined') {
          try {
            const fromStorage = readStorage();
            if (fromStorage.length >= prev.length) {
              current = fromStorage;
            }
          } catch {
            // fallback to prev
          }
        }
        const next = typeof updater === 'function' ? updater(current) : updater;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
            window.dispatchEvent(new Event('saved-comparisons-sync'));
          } catch (error) {
            console.warn(
              'Failed to persist saved comparisons to localStorage (quota exceeded or blocked):',
              error
            );
          }
        }
        return next;
      });
    },
    [readStorage]
  );

  // Listen for cross-component sync
  useEffect(() => {
    const handleSync = () => {
      setSavedItems(readStorage());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('saved-comparisons-sync', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('saved-comparisons-sync', handleSync);
    };
  }, [readStorage]);

  const isSaved = useCallback(
    (catA: string, catB: string): boolean => {
      if (!catA || !catB) return false;
      return savedItems.some(
        (item) =>
          (item.categoryAId === catA && item.categoryBId === catB) ||
          (item.categoryAId === catB && item.categoryBId === catA)
      );
    },
    [savedItems]
  );

  const getSavedRecord = useCallback(
    (catA: string, catB: string): SavedRecord | undefined => {
      return savedItems.find(
        (item) =>
          (item.categoryAId === catA && item.categoryBId === catB) ||
          (item.categoryAId === catB && item.categoryBId === catA)
      );
    },
    [savedItems]
  );

  const saveComparison = useCallback(
    (
      catAId: string,
      catBId: string,
      catAName: string,
      catBName: string,
      summary = '',
      customLabel?: string
    ) => {
      persist((prev) => {
        // Prevent duplicate saving
        const alreadySaved = prev.some(
          (item) =>
            (item.categoryAId === catAId && item.categoryBId === catBId) ||
            (item.categoryAId === catBId && item.categoryBId === catAId)
        );
        if (alreadySaved) {
          return prev;
        }

        const now = new Date();
        const newRecord: SavedRecord = {
          id: `saved_${catAId}_${catBId}_${now.getTime()}`,
          pairId: `${catAId}-vs-${catBId}`,
          categoryAId: catAId,
          categoryBId: catBId,
          categoryAName: catAName,
          categoryBName: catBName,
          savedAt: now.toISOString(),
          displayDate: now.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          summary: summary || `Direct comparison between ${catAName} and ${catBName}.`,
          customLabel: customLabel?.trim() || undefined,
        };

        return [newRecord, ...prev];
      });
    },
    [persist]
  );

  const removeComparison = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((item) => item.id !== id));
    },
    [persist]
  );

  const restoreComparison = useCallback(
    (record: SavedRecord) => {
      persist((prev) => {
        if (prev.some((item) => item.id === record.id)) return prev;
        return [record, ...prev];
      });
    },
    [persist]
  );

  const updateCustomLabel = useCallback(
    (id: string, label: string) => {
      persist((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, customLabel: label.trim() || undefined } : item
        )
      );
    },
    [persist]
  );

  const clearAll = useCallback(() => {
    persist([]);
  }, [persist]);

  return {
    savedItems,
    isSaved,
    getSavedRecord,
    saveComparison,
    removeComparison,
    restoreComparison,
    updateCustomLabel,
    clearAll,
  };
}
