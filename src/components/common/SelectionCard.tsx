import React from 'react';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  isSelected: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  title,
  description,
  badge,
  icon: Icon,
  isSelected,
  onSelect,
  className = '',
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(id)}
      className={`w-full text-left p-3.5 sm:p-4 min-h-touch rounded-2xl border transition-all relative flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
        isSelected
          ? 'bg-surface-elevated border-groww-emerald shadow-soft ring-1 ring-groww-emerald'
          : 'bg-surface-card border-border-default hover:bg-surface-elevated hover:border-border-default/80'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="flex items-start gap-3 min-w-0">
          {Icon && (
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                isSelected
                  ? 'bg-groww-emerald text-gray-950 font-bold'
                  : 'bg-surface-elevated text-content-secondary'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm sm:text-base text-content-primary leading-tight">
                {title}
              </span>
              {badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-groww-emerald/10 text-groww-emerald border border-groww-emerald/20">
                  {badge}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-content-secondary leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Radio Indicator (Icon + Border, never color alone) */}
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            isSelected
              ? 'border-groww-emerald bg-groww-emerald text-gray-950 font-bold'
              : 'border-border-default bg-transparent'
          }`}
          aria-hidden="true"
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </button>
  );
};
