import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Scale,
  Check,
  BookOpen,
  Layers,
  Info,
} from 'lucide-react';
import { USER_INTENTS, EXPERIENCE_LEVELS, getGuidanceForUser } from '@/data/intent/options';
import { useIntent } from '@/context/IntentContext';
import { UserIntentId, ExperienceLevelId } from '@/types/intent';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { intent, experienceLevel, setIntent, setExperienceLevel } = useIntent();

  const selectedIntent = USER_INTENTS.find((i) => i.id === intent) || USER_INTENTS[0];
  const selectedExperience =
    EXPERIENCE_LEVELS.find((l) => l.id === experienceLevel) || EXPERIENCE_LEVELS[0];

  const guidance = getGuidanceForUser(intent, experienceLevel);

  return (
    <div className="space-y-6">
      {/* SCREEN 1: Clean, Focused Home View — One Primary Purpose */}
      <section
        aria-labelledby="home-headline"
        className="p-5 sm:p-6 rounded-3xl bg-surface-card border border-border-default shadow-soft space-y-5"
      >
        {/* Subtle Brand Tag */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald" aria-hidden="true" />
            Groww Compass
          </span>
          <span className="text-[11px] font-medium text-content-muted">
            Discovery Layer
          </span>
        </div>

        {/* Short Headline & Supporting Text */}
        <div className="space-y-1.5">
          <h1
            id="home-headline"
            className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight leading-tight"
          >
            Not sure where to start?
          </h1>
          <p className="text-sm sm:text-base text-content-secondary font-medium leading-snug">
            Understand your investment options.
          </p>
        </div>

        {/* Three Large Action Cards */}
        <div className="grid grid-cols-1 gap-3 pt-1">
          {/* Card 1: Compare options */}
          <button
            type="button"
            onClick={() => navigate('/compare?step=goal')}
            className="p-4 sm:p-5 rounded-2xl bg-surface-elevated hover:bg-surface-elevated/80 border-2 border-groww-emerald/40 hover:border-groww-emerald transition-all text-left flex items-center justify-between gap-4 group focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none min-h-[96px]"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-groww-emerald/20 text-emerald-700 dark:text-groww-emerald flex items-center justify-center font-bold shrink-0">
                <Scale className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-content-primary group-hover:text-emerald-700 dark:group-hover:text-groww-emerald">
                    Compare options
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald">
                    Popular
                  </span>
                </div>
                <p className="text-xs text-content-secondary mt-1 leading-snug">
                  Contrast two investments side-by-side to understand trade-offs.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-content-muted group-hover:text-groww-emerald transition-transform group-hover:translate-x-1 shrink-0" aria-hidden="true" />
          </button>

          {/* Card 2: Explore investments */}
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="p-4 sm:p-5 rounded-2xl bg-surface-elevated hover:bg-surface-elevated/80 border border-border-default hover:border-border-default/80 transition-all text-left flex items-center justify-between gap-4 group focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none min-h-[96px]"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
                <Layers className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-content-primary group-hover:text-sky-700 dark:group-hover:text-sky-400">
                    Explore investments
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-card text-content-muted border border-border-default">
                    5 Categories
                  </span>
                </div>
                <p className="text-xs text-content-secondary mt-1 leading-snug">
                  Discover stocks, mutual funds, index funds, and ETFs.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-content-muted group-hover:text-sky-400 transition-transform group-hover:translate-x-1 shrink-0" aria-hidden="true" />
          </button>

          {/* Card 3: Learn the basics */}
          <button
            type="button"
            onClick={() => navigate('/learn')}
            className="p-4 sm:p-5 rounded-2xl bg-surface-elevated hover:bg-surface-elevated/80 border border-border-default hover:border-border-default/80 transition-all text-left flex items-center justify-between gap-4 group focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none min-h-[96px]"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-content-primary group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    Learn the basics
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-card text-content-muted border border-border-default">
                    11 Topics
                  </span>
                </div>
                <p className="text-xs text-content-secondary mt-1 leading-snug">
                  Understand diversification, expense ratios, and volatility.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-content-muted group-hover:text-amber-400 transition-transform group-hover:translate-x-1 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Product Purpose & Principles */}
      <section
        aria-label="About Groww Compass"
        className="p-5 rounded-3xl border border-border-default bg-surface-card space-y-4 shadow-soft text-xs"
      >
        <div className="flex items-center gap-2 text-content-primary">
          <Info className="w-4 h-4 text-emerald-700 dark:text-groww-emerald shrink-0" aria-hidden="true" />
          <h2 className="font-bold text-sm">What is Groww Compass?</h2>
        </div>

        <p className="text-content-secondary leading-relaxed">
          A calm, unbiased discovery guide designed for first-time Indian investors to understand how different
          asset categories work before committing real capital.
        </p>

        {/* 3 Quick Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
            <span className="font-bold text-content-primary flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-groww-emerald shrink-0" aria-hidden="true" />
              1. Cut Jargon
            </span>
            <p className="text-content-secondary text-[11px] leading-relaxed">
              Understand what you actually own in plain English.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
            <span className="font-bold text-content-primary flex items-center gap-1.5 text-[11px]">
              <Scale className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true" />
              2. Compare Honestly
            </span>
            <p className="text-content-secondary text-[11px] leading-relaxed">
              Contrast risk, lock-in, and fees side-by-side.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-surface-elevated border border-border-default space-y-1">
            <span className="font-bold text-content-primary flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
              3. No Sales Push
            </span>
            <p className="text-content-secondary text-[11px] leading-relaxed">
              General education only. No account or login required.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-content-muted italic leading-relaxed pt-1">
          * Groww Compass never declares one asset universally superior. Every investment serves
          different goals, risk tolerances, and time horizons.
        </p>
      </section>

      {/* Discovery Intent Customizer */}
      <section
        aria-label="Customize Discovery Intent"
        className="p-5 rounded-3xl border border-border-default bg-surface-card space-y-5 shadow-soft mb-8"
      >
        <div className="flex items-center gap-2 text-content-primary">
          <Compass className="w-4 h-4 text-emerald-700 dark:text-groww-emerald shrink-0" aria-hidden="true" />
          <h2 className="font-bold text-sm">Customize your focus (Optional)</h2>
        </div>

        {/* Intent Selection */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider block">
            Step 1 of 2
          </span>
          <h3 className="text-sm sm:text-base font-bold text-content-primary">
            What do you want to understand today?
          </h3>
          <div role="radiogroup" aria-label="Investment Intent" className="space-y-2">
            {USER_INTENTS.map((item) => {
              const isSelected = item.id === intent;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setIntent(item.id as UserIntentId)}
                  className={`w-full text-left p-3.5 min-h-touch rounded-2xl border transition-all flex items-start justify-between gap-3 focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                    isSelected
                      ? 'bg-surface-elevated border-groww-emerald shadow-soft ring-1 ring-groww-emerald'
                      : 'bg-surface-card border-border-default hover:bg-surface-elevated'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-semibold text-xs sm:text-sm text-content-primary block leading-tight">
                      {item.label}
                    </span>
                    <p className="mt-1 text-[11px] text-content-secondary leading-snug">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-groww-emerald bg-groww-emerald text-gray-950'
                        : 'border-border-default bg-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block">
            Step 2 of 2
          </span>
          <h3 className="text-sm sm:text-base font-bold text-content-primary">
            What is your experience with investing?
          </h3>
          <div role="radiogroup" aria-label="Experience Level" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {EXPERIENCE_LEVELS.map((level) => {
              const isSelected = level.id === experienceLevel;
              return (
                <button
                  key={level.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setExperienceLevel(level.id as ExperienceLevelId)}
                  className={`text-left p-3 min-h-touch rounded-2xl border transition-all flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-groww-emerald focus:outline-none ${
                    isSelected
                      ? 'bg-surface-elevated border-groww-emerald shadow-soft ring-1 ring-groww-emerald'
                      : 'bg-surface-card border-border-default hover:bg-surface-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-semibold text-xs text-content-primary">
                      {level.label}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-surface-elevated text-content-muted border border-border-default">
                      {level.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-content-secondary leading-tight">
                    {level.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tailored guidance summary */}
        <div className="p-3.5 rounded-2xl bg-surface-elevated border border-border-default text-xs space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider block">
            Focusing on: {selectedIntent.label} · Level: {selectedExperience.label}
          </span>
          <p className="text-content-secondary font-medium leading-relaxed">
            {guidance.headline}
          </p>
        </div>
      </section>
    </div>
  );
};
