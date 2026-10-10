import React from 'react';
import {
  Building2,
  Layers,
  Banknote,
  LineChart,
  ArrowLeftRight,
  TrendingUp,
  Percent,
} from 'lucide-react';

interface CategoryConceptDiagramProps {
  categoryId: string;
  className?: string;
}

export const CategoryConceptDiagram: React.FC<CategoryConceptDiagramProps> = ({
  categoryId,
  className = '',
}) => {
  switch (categoryId) {
    case 'stocks':
      return (
        <div
          className={`h-28 rounded-2xl bg-surface-elevated border border-border-default p-2.5 flex items-center justify-around gap-2 text-xs ${className}`}
          aria-label="Diagram: Single stock ownership in one enterprise"
        >
          {/* Investor */}
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-groww-emerald/15 border border-groww-emerald/30 flex items-center justify-center text-emerald-700 dark:text-groww-emerald font-bold text-xs">
              You
            </div>
            <span className="text-[10px] text-content-muted mt-1 font-medium">Investor</span>
          </div>

          {/* Direct Ownership arrow */}
          <div className="flex flex-col items-center px-1">
            <span className="text-[9px] font-bold text-emerald-700 dark:text-groww-emerald uppercase">
              100% Direct
            </span>
            <div className="w-12 h-0.5 bg-emerald-500/50 my-1 relative">
              <div className="w-1.5 h-1.5 rounded-full bg-groww-emerald absolute right-0 -top-0.5" />
            </div>
            <span className="text-[9px] text-content-muted">Shares</span>
          </div>

          {/* Single Enterprise */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-groww-emerald">
              <Building2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">1 Company</span>
            <span className="text-[9px] text-content-muted">Direct Equity</span>
          </div>
        </div>
      );

    case 'equity-mf':
      return (
        <div
          className={`h-28 rounded-2xl bg-surface-elevated border border-border-default p-2.5 flex items-center justify-around gap-1.5 text-xs ${className}`}
          aria-label="Diagram: Pooled fund basket investing into 30 to 50+ companies"
        >
          {/* Pooled Fund Basket */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-700 dark:text-sky-400">
              <Layers className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">Fund Scheme</span>
            <span className="text-[9px] text-content-muted">Pooled Money</span>
          </div>

          {/* Diversification Split arrows */}
          <div className="flex flex-col items-center px-1">
            <span className="text-[9px] font-bold text-sky-700 dark:text-sky-400 uppercase">
              Spreads into
            </span>
            <div className="w-10 h-0.5 bg-sky-500/50 my-1" />
            <span className="text-[9px] text-content-muted">30–50+ Stocks</span>
          </div>

          {/* Multi-Holdings Basket */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-surface-card border border-border-default">
            <div className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 text-[9px] font-bold text-center">
              Tech
            </div>
            <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold text-center">
              Bank
            </div>
            <div className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[9px] font-bold text-center">
              FMCG
            </div>
            <div className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 text-[9px] font-bold text-center">
              Auto
            </div>
          </div>
        </div>
      );

    case 'debt-mf':
      return (
        <div
          className={`h-28 rounded-2xl bg-surface-elevated border border-border-default p-2.5 flex items-center justify-around gap-2 text-xs ${className}`}
          aria-label="Diagram: Debt fund lending to government and corporate issuers for interest"
        >
          {/* Investor Capital */}
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Banknote className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">Lending</span>
            <span className="text-[9px] text-content-muted">Fixed Income</span>
          </div>

          {/* Interest Flow */}
          <div className="flex flex-col items-center px-1">
            <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 uppercase flex items-center gap-0.5">
              <Percent className="w-2.5 h-2.5" /> Coupon
            </span>
            <div className="w-10 h-0.5 bg-amber-500/50 my-1" />
            <span className="text-[9px] text-content-muted">Periodic</span>
          </div>

          {/* Issuers */}
          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
              Govt & Corporates
            </span>
            <span className="text-[9px] text-content-muted">Bonds / T-Bills</span>
          </div>
        </div>
      );

    case 'index-funds':
      return (
        <div
          className={`h-28 rounded-2xl bg-surface-elevated border border-border-default p-2.5 flex items-center justify-around gap-2 text-xs ${className}`}
          aria-label="Diagram: Index fund mirroring benchmark like Nifty 50"
        >
          {/* Nifty 50 Index */}
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-400">
              <LineChart className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">Nifty 50</span>
            <span className="text-[9px] text-content-muted">Market Index</span>
          </div>

          {/* Exact Mirror */}
          <div className="flex flex-col items-center px-1">
            <span className="text-[9px] font-bold text-purple-700 dark:text-purple-400 uppercase">
              Tracks 1:1
            </span>
            <div className="w-10 h-0.5 bg-purple-500/50 my-1" />
            <span className="text-[9px] text-content-muted">Zero Stock-Picking</span>
          </div>

          {/* Index Fund Scheme */}
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-groww-emerald/15 border border-groww-emerald/30 flex items-center justify-center text-emerald-700 dark:text-groww-emerald">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">Index Scheme</span>
            <span className="text-[9px] text-content-muted">Passive Rule</span>
          </div>
        </div>
      );

    case 'etfs':
      return (
        <div
          className={`h-28 rounded-2xl bg-surface-elevated border border-border-default p-2.5 flex items-center justify-around gap-2 text-xs ${className}`}
          aria-label="Diagram: ETF units trading live on stock exchange via Demat"
        >
          {/* Fund Basket */}
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-700 dark:text-sky-400">
              <Layers className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">Fund Basket</span>
            <span className="text-[9px] text-content-muted">Unitized</span>
          </div>

          {/* Traded on exchange */}
          <div className="flex flex-col items-center px-1">
            <span className="text-[9px] font-bold text-sky-700 dark:text-sky-400 uppercase flex items-center gap-0.5">
              <ArrowLeftRight className="w-3 h-3" /> Live Ticker
            </span>
            <div className="w-10 h-0.5 bg-sky-500/50 my-1" />
            <span className="text-[9px] text-content-muted">NSE / BSE</span>
          </div>

          {/* Demat Account */}
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-surface-card border border-border-default flex items-center justify-center text-content-primary font-bold text-[11px]">
              Demat
            </div>
            <span className="text-[10px] font-bold text-content-primary mt-1">Trade Anytime</span>
            <span className="text-[9px] text-content-muted">Real-Time NAV</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
