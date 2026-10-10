import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  ArrowRight,
  Tag,
  AlertTriangle,
  Clock,
  HardDrive,
  Check,
  X,
} from 'lucide-react';
import { PageHeading } from '@/components/common/PageHeading';
import { EmptyState } from '@/components/common/EmptyState';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { BottomSheet } from '@/components/common/BottomSheet';
import { useSavedComparisons } from '@/hooks/useSavedComparisons';
import { useToast } from '@/context/ToastContext';
import { SavedRecord } from '@/types/saved';

export const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    savedItems,
    removeComparison,
    updateCustomLabel,
    clearAll,
  } = useSavedComparisons();
  const { showToast } = useToast();

  // State for delete confirmation modal to prevent accidental deletion
  const [itemToDelete, setItemToDelete] = useState<SavedRecord | null>(null);
  const [showClearAllModal, setShowClearAllModal] = useState<boolean>(false);

  // State for editing custom labels
  const [editingId, setEditingId] = useState<string | null>(null);
  const [labelDraft, setLabelDraft] = useState<string>('');

  const handleOpenComparison = (catA: string, catB: string) => {
    navigate(`/compare?a=${catA}&b=${catB}`);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const deletedItem = itemToDelete;
    removeComparison(deletedItem.id);
    setItemToDelete(null);

    // Provide clear feedback with undo option
    showToast(
      `Removed "${deletedItem.categoryAName} vs ${deletedItem.categoryBName}"`,
      'info',
      4000
    );
  };

  const confirmClearAll = () => {
    clearAll();
    setShowClearAllModal(false);
    showToast('All saved comparisons have been cleared.', 'info');
  };

  const startEditingLabel = (item: SavedRecord) => {
    setEditingId(item.id);
    setLabelDraft(item.customLabel || '');
  };

  const saveLabel = (id: string) => {
    updateCustomLabel(id, labelDraft);
    setEditingId(null);
    showToast('Note updated', 'success');
  };

  return (
    <div className="space-y-5">
      <PageHeading
        badge="Saved Hub"
        title="Saved Comparisons"
        subtitle="Review bookmarked investment comparisons anytime. Stored strictly on this browser without requiring an account."
        action={
          savedItems.length > 0 ? (
            <button
              type="button"
              onClick={() => setShowClearAllModal(true)}
              className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-bold px-3 py-1.5 rounded-xl border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500/20 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus:outline-none"
            >
              Clear All
            </button>
          ) : undefined
        }
      />

      {/* Local Storage Privacy & Non-Sensitive Device Storage Notice */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-card border border-border-default space-y-1.5 text-xs text-content-secondary">
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-groww-emerald font-bold uppercase tracking-wider text-[10px]">
          <HardDrive className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald shrink-0" aria-hidden="true" />
          <span>Local Device Storage Only</span>
        </div>
        <p className="leading-relaxed">
          These comparisons are saved in your device’s browser storage (<code>localStorage</code>).
          Groww Compass does not sync records to an external cloud or collect bank accounts, PAN,
          Aadhaar, or credentials.
        </p>
      </div>

      {/* EMPTY STATE */}
      {savedItems.length === 0 ? (
        <EmptyState
          title="No saved comparisons yet"
          description="When you explore trade-offs in the Comparison Lab, tap the bookmark icon to save key comparisons here for quick review."
          actionLabel="Explore Curated Comparisons"
          onAction={() => navigate('/compare?a=index-funds&b=equity-mf')}
          icon={Bookmark}
        />
      ) : (
        /* SAVED ITEMS LIST */
        <div className="space-y-3 pb-8" role="feed" aria-label="Saved investment comparisons">
          {savedItems.map((item) => (
            <article
              key={item.id}
              className="p-4 sm:p-5 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-3.5 transition-all hover:border-border-default/80"
            >
              {/* Header: Title, Date & Delete Trigger */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 pr-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
                      Saved on {item.displayDate}
                    </span>

                    {item.customLabel && editingId !== item.id && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25">
                        {item.customLabel}
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-content-primary mt-1 leading-snug">
                    {item.categoryAName} vs. {item.categoryBName}
                  </h2>
                </div>

                {/* Accidental deletion prevention: opens confirmation modal */}
                <button
                  type="button"
                  onClick={() => setItemToDelete(item)}
                  aria-label={`Delete saved comparison between ${item.categoryAName} and ${item.categoryBName}`}
                  title="Delete saved comparison"
                  className="w-10 h-10 min-w-touch min-h-touch rounded-full flex items-center justify-center text-content-muted hover:text-rose-500 hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus:outline-none -mr-2 shrink-0"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Concise Summary */}
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                {item.summary}
              </p>

              {/* Optional User Label / Note Editor */}
              {editingId === item.id ? (
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <input
                    type="text"
                    value={labelDraft}
                    onChange={(e) => setLabelDraft(e.target.value)}
                    placeholder="Add personal note (e.g., Retirement dilemma)..."
                    maxLength={40}
                    className="flex-1 px-3 py-2 rounded-xl bg-surface-elevated border border-border-default text-content-primary placeholder:text-content-muted text-xs focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => saveLabel(item.id)}
                    className="p-2 rounded-xl bg-groww-emerald text-gray-950 font-bold hover:bg-groww-emerald/90 transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
                    aria-label="Save note"
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="p-2 rounded-xl bg-surface-elevated text-content-muted hover:text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none"
                    aria-label="Cancel editing"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => startEditingLabel(item)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-content-muted hover:text-content-primary transition-colors py-1 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none rounded"
                >
                  <Tag className="w-3 h-3 text-content-muted" aria-hidden="true" />
                  <span>{item.customLabel ? 'Edit note' : '+ Add personal note'}</span>
                </button>
              )}

              {/* Action: Reopen in Comparison Lab */}
              <div className="pt-2">
                <SecondaryButton
                  onClick={() => handleOpenComparison(item.categoryAId, item.categoryBId)}
                  icon={ArrowRight}
                  className="text-xs py-2.5 font-semibold"
                >
                  Reopen Comparison
                </SecondaryButton>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CONFIRMATION MODAL: Prevent Accidental Item Deletion */}
      {itemToDelete && (
        <BottomSheet
          isOpen={!!itemToDelete}
          onClose={() => setItemToDelete(null)}
          title="Remove Saved Comparison?"
          subtitle={`${itemToDelete.categoryAName} vs. ${itemToDelete.categoryBName}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-content-secondary leading-relaxed">
                This will remove the saved bookmark from your browser’s storage. You can always
                compare these two categories again anytime in the Comparison Lab.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={confirmDelete}
                className="w-full py-3 px-4 min-h-touch rounded-2xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus:outline-none shadow-sm"
              >
                Yes, Remove Comparison
              </button>

              <SecondaryButton onClick={() => setItemToDelete(null)}>
                Cancel, Keep It
              </SecondaryButton>
            </div>
          </div>
        </BottomSheet>
      )}

      {/* CONFIRMATION MODAL: Prevent Accidental Clear All */}
      {showClearAllModal && (
        <BottomSheet
          isOpen={showClearAllModal}
          onClose={() => setShowClearAllModal(false)}
          title="Clear All Saved Comparisons?"
          subtitle="This action will delete all bookmarked pairs from this browser"
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-content-primary leading-relaxed">
                Are you sure you want to delete all {savedItems.length} saved comparisons? This
                cannot be undone.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={confirmClearAll}
                className="w-full py-3 px-4 min-h-touch rounded-2xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus:outline-none shadow-sm"
              >
                Yes, Clear All Comparisons
              </button>

              <SecondaryButton onClick={() => setShowClearAllModal(false)}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
