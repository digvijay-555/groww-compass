export interface SavedRecord {
  id: string;
  pairId: string;
  categoryAId: string;
  categoryBId: string;
  categoryAName: string;
  categoryBName: string;
  savedAt: string; // ISO 8601 string
  displayDate: string; // Formatted readable date
  summary: string; // Short trade-off summary
  customLabel?: string; // Optional user-authored note or label
}

export function isValidSavedRecord(item: unknown): item is SavedRecord {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<SavedRecord>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.categoryAId === 'string' &&
    typeof candidate.categoryBId === 'string' &&
    typeof candidate.categoryAName === 'string' &&
    typeof candidate.categoryBName === 'string' &&
    candidate.categoryAId.length > 0 &&
    candidate.categoryBId.length > 0
  );
}
