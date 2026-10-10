import React, { useState } from 'react';
import { Building2, Layers, AlertCircle, ShieldCheck, Check } from 'lucide-react';

interface HoldingComparisonDiagramProps {
  interactive?: boolean;
  className?: string;
}

export const HoldingComparisonDiagram: React.FC<HoldingComparisonDiagramProps> = ({
  interactive = true,
  className = '',
}) => {
  const [selectedFundHolding, setSelectedFundHolding] = useState<number | null>(null);

  const sampleHoldings = [
    { name: 'Tech Co', share: '6%', sector: 'IT', color: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
    { name: 'Bank A', share: '8%', sector: 'Banking', color: 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30' },
    { name: 'FMCG Co', share: '5%', sector: 'Consumer', color: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30' },
    { name: 'Auto Co', share: '4%', sector: 'Auto', color: 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30' },
    { name: 'Pharma', share: '5%', sector: 'Health', color: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30' },
    { name: '+35 more', share: '72%', sector: 'Diverse', color: 'bg-surface-card text-content-muted border-border-default' },
  ];

  return (
    <div
      className={`p-4 sm:p-5 rounded-3xl bg-surface-elevated border border-border-default shadow-soft space-y-4 ${className}`}
      aria-label="Visual explanation: Single Stock vs. Diversified Fund"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-groww-emerald px-2 py-0.5 rounded-full bg-groww-emerald/15 border border-groww-emerald/25 inline-flex items-center gap-1">
          <Layers className="w-3 h-3" aria-hidden="true" />
          Visual Mental Model
        </span>
        {interactive && (
          <span className="text-[11px] text-content-muted font-medium">
            Tap holdings to explore
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        {/* Model 1: Single Stock */}
        <div className="p-3.5 rounded-2xl bg-surface-card border-2 border-emerald-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-groww-emerald">
                1. Single Stock
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                100% in 1 Company
              </span>
            </div>

            {/* Visual: Single Large Holding */}
            <div className="h-24 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 flex flex-col items-center justify-center p-2 text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-groww-emerald mb-1">
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-bold text-content-primary text-xs">Company ABC</span>
              <span className="text-[10px] text-content-muted">Your entire capital (100%)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-border-default space-y-1 text-[11px]">
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>Company-Specific Risk:</span>
            </div>
            <p className="text-content-secondary leading-tight">
              If Company ABC faces legal, management, or sector distress, 100% of your investment is directly exposed.
            </p>
          </div>
        </div>

        {/* Model 2: Diversified Fund */}
        <div className="p-3.5 rounded-2xl bg-surface-card border-2 border-sky-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-sky-700 dark:text-sky-400">
                2. Diversified Fund
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400">
                30–50+ Holdings
              </span>
            </div>

            {/* Visual: Basket of Holdings */}
            <div className="h-24 rounded-xl border border-dashed border-sky-500/40 bg-sky-500/5 p-1.5 grid grid-cols-3 gap-1 content-center">
              {sampleHoldings.map((h, i) => {
                const isSelected = selectedFundHolding === i;
                return (
                  <button
                    key={h.name}
                    type="button"
                    onClick={() => interactive && setSelectedFundHolding(isSelected ? null : i)}
                    aria-label={`${h.name}: ${h.share} allocation`}
                    className={`p-1 rounded-lg border text-center transition-all ${h.color} ${
                      isSelected
                        ? 'ring-2 ring-sky-500 font-bold scale-105 z-10'
                        : 'hover:border-sky-400/60'
                    }`}
                  >
                    <div className="text-[10px] font-bold truncate leading-none">{h.name}</div>
                    <div className="text-[9px] opacity-80 leading-tight">{h.share}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-border-default space-y-1 text-[11px]">
            <div className="flex items-center gap-1 text-emerald-700 dark:text-groww-emerald font-semibold">
              <ShieldCheck className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>Cushioned Risk:</span>
            </div>
            <p className="text-content-secondary leading-tight">
              {selectedFundHolding !== null
                ? `${sampleHoldings[selectedFundHolding].name} represents only ${sampleHoldings[selectedFundHolding].share}. A drop here has a limited impact on the total fund.`
                : 'If any single company stumbles, 30+ other holdings spread across sectors help cushion the overall impact.'}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-content-muted italic leading-relaxed text-center">
        * Important: A fund's actual diversification depends on its specific scheme mandate and portfolio holdings. Diversification does not eliminate overall market risk.
      </p>
    </div>
  );
};
