import React from 'react';
import {
  Layers,
  Activity,
  PieChart,
  Coins,
  ShieldAlert,
  Clock,
  Compass,
  Building2,
  ArrowRightLeft,
  Gauge,
  Sliders,
} from 'lucide-react';

interface TopicConceptDiagramProps {
  topicId: string;
  className?: string;
}

export const TopicConceptDiagram: React.FC<TopicConceptDiagramProps> = ({
  topicId,
  className = '',
}) => {
  switch (topicId) {
    case 'diversification':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-groww-emerald">
              <Layers className="w-3.5 h-3.5" /> Single vs. Multi-Asset Spread
            </span>
            <span className="text-content-muted">Don't put all eggs in 1 basket</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-surface-card border border-rose-500/30 text-rose-600 dark:text-rose-400">
              <span className="font-bold text-[10px] block">1 Stock Only</span>
              <span className="text-[9px] text-content-muted">100% loss risk if firm fails</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <span className="font-bold text-[10px] block">30–50+ Stocks</span>
              <span className="text-[9px] text-content-muted">Impact of 1 failure cushioned</span>
            </div>
          </div>
        </div>
      );

    case 'volatility':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Activity className="w-3.5 h-3.5" /> Price Fluctuations Over Time
            </span>
            <span className="text-content-muted">Temporary swings ≠ Permanent loss</span>
          </div>
          <div className="h-14 rounded-xl bg-surface-card border border-border-default flex items-center justify-center p-2 relative overflow-hidden">
            <div className="w-full h-0.5 bg-border-default absolute" />
            <svg className="w-full h-full text-amber-500" viewBox="0 0 100 30" fill="none" stroke="currentColor">
              <path d="M 0,15 Q 15,2 30,15 T 60,15 T 90,5 L 100,10" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      );

    case 'expense-ratio':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <PieChart className="w-3.5 h-3.5" /> Annual Operating Cost (TER)
            </span>
            <span className="text-content-muted">Deducted daily from NAV</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-surface-card border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
              <span className="font-bold text-[10px] block">Passive / Index</span>
              <span className="text-[9px] text-content-muted">~0.1% to 0.4% per year</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-card border border-rose-500/30 text-rose-700 dark:text-rose-400">
              <span className="font-bold text-[10px] block">Active Management</span>
              <span className="text-[9px] text-content-muted">~1.0% to 2.2% per year</span>
            </div>
          </div>
        </div>
      );

    case 'liquidity':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
              <ArrowRightLeft className="w-3.5 h-3.5" /> Speed to Convert to Cash
            </span>
            <span className="text-content-muted">Access without steep penalties</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-surface-card border border-sky-500/30">
              <span className="font-bold text-[10px] text-content-primary block">High Liquidity</span>
              <span className="text-[9px] text-content-muted">Stocks / ETFs (T+1 Settlement)</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-card border border-amber-500/30">
              <span className="font-bold text-[10px] text-content-primary block">Lock-In / Exit Loads</span>
              <span className="text-[9px] text-content-muted">ELSS (3 yr) or exit load &lt;1 yr</span>
            </div>
          </div>
        </div>
      );

    case 'sip':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-groww-emerald">
              <Coins className="w-3.5 h-3.5" /> Systematic Investment Plan
            </span>
            <span className="text-content-muted">Rupee Cost Averaging</span>
          </div>
          <div className="flex items-center justify-between gap-1 p-2 rounded-xl bg-surface-card border border-border-default text-center">
            <div className="flex-1">
              <span className="text-[9px] text-content-muted block">Month 1</span>
              <span className="font-bold text-[10px] text-emerald-600">₹1,000</span>
            </div>
            <span className="text-content-muted">→</span>
            <div className="flex-1">
              <span className="text-[9px] text-content-muted block">Month 2</span>
              <span className="font-bold text-[10px] text-emerald-600">₹1,000</span>
            </div>
            <span className="text-content-muted">→</span>
            <div className="flex-1">
              <span className="text-[9px] text-content-muted block">Month 3</span>
              <span className="font-bold text-[10px] text-emerald-600">₹1,000</span>
            </div>
          </div>
        </div>
      );

    case 'market-risk':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" /> Broad Market Risk
            </span>
            <span className="text-content-muted">Systemic (Cannot be diversified away)</span>
          </div>
          <p className="text-[11px] text-content-secondary leading-tight">
            Macro factors like economic recessions, interest rate shifts, and geopolitical crises pull the whole stock market down together.
          </p>
        </div>
      );

    case 'company-specific-risk':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Building2 className="w-3.5 h-3.5" /> Company-Specific Risk
            </span>
            <span className="text-content-muted">Idiosyncratic (Can be diversified away)</span>
          </div>
          <p className="text-[11px] text-content-secondary leading-tight">
            Single company problems: scandal, poor earnings, or debt crisis. Holding multiple companies largely neutralizes this.
          </p>
        </div>
      );

    case 'active-vs-passive':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <Sliders className="w-3.5 h-3.5" /> Active vs. Passive Philosophy
            </span>
            <span className="text-content-muted">Human decision vs. Index rule</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-surface-card border border-purple-500/30">
              <span className="font-bold text-[10px] text-purple-600 dark:text-purple-400 block">Active</span>
              <span className="text-[9px] text-content-muted">Manager aims to beat market</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-card border border-emerald-500/30">
              <span className="font-bold text-[10px] text-emerald-600 dark:text-emerald-400 block">Passive</span>
              <span className="text-[9px] text-content-muted">Rules replicate benchmark index</span>
            </div>
          </div>
        </div>
      );

    case 'investment-time-horizon':
      return (
        <div className={`p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-2 text-xs ${className}`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-content-primary">
            <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
              <Clock className="w-3.5 h-3.5" /> Investment Horizon
            </span>
            <span className="text-content-muted">Matches your life goals</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="p-1.5 rounded-lg bg-surface-card border border-border-default">
              <span className="font-bold block">&lt; 1 Year</span>
              <span className="text-[9px] text-content-muted">Liquid / Debt</span>
            </div>
            <div className="p-1.5 rounded-lg bg-surface-card border border-border-default">
              <span className="font-bold block">1–3 Years</span>
              <span className="text-[9px] text-content-muted">Short Duration</span>
            </div>
            <div className="p-1.5 rounded-lg bg-surface-card border border-border-default">
              <span className="font-bold block">5+ Years</span>
              <span className="text-[9px] text-emerald-600">Equity / Index</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
