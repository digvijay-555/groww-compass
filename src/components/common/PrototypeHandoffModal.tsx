import React from 'react';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

interface PrototypeHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLabel: string;
  targetUrl: string;
}

export const PrototypeHandoffModal: React.FC<PrototypeHandoffModalProps> = ({
  isOpen,
  onClose,
  targetLabel,
  targetUrl,
}) => {
  const handleProceed = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Ecosystem Navigation"
      subtitle="Transitioning to official Groww platform"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-surface-elevated border border-border-default space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-groww-emerald font-bold text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Educational Prototype Notice</span>
          </div>
          <p className="text-xs text-content-secondary leading-relaxed">
            <strong>Groww Compass</strong> is a conceptual discovery and education layer. We do not
            execute transactions, hold funds, or capture personal financial credentials.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-content-primary">Destination:</span>
          <div className="p-3 rounded-2xl bg-surface-card border border-border-default flex items-center justify-between text-xs text-content-secondary font-mono">
            <span className="truncate pr-2">{targetUrl}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
          </div>
        </div>

        <p className="text-xs text-content-muted leading-relaxed">
          Continuing will open the verified {targetLabel} destination in a new browser tab.
        </p>

        <div className="flex flex-col gap-2 pt-2">
          <PrimaryButton onClick={handleProceed} icon={ExternalLink}>
            Continue to {targetLabel}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Stay in Compass</SecondaryButton>
        </div>
      </div>
    </BottomSheet>
  );
};
