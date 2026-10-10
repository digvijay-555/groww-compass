import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap for accessible dialog containment
      if (e.key === 'Tab' && isOpen && sheetRef.current) {
        const focusableElements = sheetRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      // 1. Capture the element that triggered the dialog for focus restoration
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // 2. Focus the close button for accessibility
      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(focusTimer);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      // 3. Restore focus back to the triggering element
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const portalTarget =
    typeof document !== 'undefined'
      ? document.getElementById('phone-screen-portal')
      : null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bottom-sheet-title"
      className={`${
        portalTarget ? 'absolute' : 'fixed'
      } inset-0 z-50 flex items-end justify-center motion-safe:animate-in motion-safe:fade-in duration-200 pointer-events-auto`}
    >
      {/* Backdrop Scrim */}
      <div
        className={`${
          portalTarget ? 'absolute' : 'fixed'
        } inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm transition-opacity`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Modal Container */}
      <div
        ref={sheetRef}
        className={`relative z-10 w-full max-w-md bg-surface-card border-t border-border-default rounded-t-3xl shadow-modal flex flex-col ${
          portalTarget ? 'max-h-[88%]' : 'max-h-[88vh]'
        } motion-safe:animate-in motion-safe:slide-in-from-bottom duration-300 pb-safe`}
      >
        {/* Drag Handle Bar */}
        <div className="flex items-center justify-center pt-3 pb-1" onClick={onClose}>
          <div className="w-12 h-1.5 rounded-full bg-border-default hover:bg-content-muted/60 cursor-pointer transition-colors" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 py-3 border-b border-border-default">
          <div className="pr-4 min-w-0">
            <h2 id="bottom-sheet-title" className="text-base sm:text-lg font-bold text-content-primary leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-content-secondary mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 min-w-touch min-h-touch rounded-full flex items-center justify-center text-content-secondary hover:text-content-primary hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none -mr-2 shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 pt-4 pb-8 text-xs sm:text-sm text-content-secondary space-y-4">
          {children}
        </div>
      </div>
    </div>
  );

  if (portalTarget) {
    return createPortal(modalContent, portalTarget);
  }

  return modalContent;
};
