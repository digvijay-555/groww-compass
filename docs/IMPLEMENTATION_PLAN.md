# Groww Compass — Phased Implementation Plan & Technical Architecture

**Version:** 1.0.0  
**Stack:** React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, Vitest, React Testing Library, Playwright  
**Document Owner:** Senior Product Engineer & QA Lead  

---

## 1. Technical Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Groww Compass App                    │
├────────────────────────────────────────────────────────┤
│  Routes: / (Explore) | /compare | /learn | /saved      │
├──────────────────────────┬─────────────────────────────┤
│  UI Components Layer     │  State & Persistence Layer  │
│  - Navigation Shell      │  - Theme Context (Dark/Lt)  │
│  - Bottom Sheet Drawer   │  - Saved Comparisons Store  │
│  - Dimension Matrix Card │  - Intent Matcher Engine    │
│  - Category Catalog Grid │  - LocalStorage Adapters    │
├──────────────────────────┴─────────────────────────────┤
│  Educational Domain Data Model                         │
│  - 5 Core Asset Categories                             │
│  - 8 Standardized Comparison Dimensions                │
│  - 25+ Jargon Terms with Indian Analogies               │
│  - Indian Tax & SEBI Context Registry                  │
├────────────────────────────────────────────────────────┤
│  Build & Tooling: Vite + TypeScript + Tailwind CSS     │
│  Testing: Vitest + Testing Library + Playwright Specs  │
│  Hosting: Vercel SPA Configuration                     │
└────────────────────────────────────────────────────────┘
```

### Directory Structure
```
/home/deceptor/code/groww-compass/
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── USER_FLOWS.md
│   ├── ASSUMPTIONS.md
│   └── IMPLEMENTATION_PLAN.md
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MobileContainer.tsx
│   │   │   ├── TopHeader.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── BottomSheetDrawer.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── PrototypeHandoffModal.tsx
│   │   ├── explore/
│   │   │   ├── IntentBuilder.tsx
│   │   │   └── CategoryCard.tsx
│   │   ├── compare/
│   │   │   ├── ComparisonSelector.tsx
│   │   │   ├── DimensionCard.tsx
│   │   │   └── ComparisonMatrix.tsx
│   │   ├── learn/
│   │   │   ├── JargonGlossary.tsx
│   │   │   └── MythBusterCard.tsx
│   │   └── saved/
│   │       ├── SavedList.tsx
│   │       └── EmptySavedState.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── JargonDrawerContext.tsx
│   ├── data/
│   │   ├── assetCategories.ts
│   │   ├── comparisons.ts
│   │   ├── jargonGlossary.ts
│   │   └── intentOptions.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useSavedComparisons.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── investment.ts
│   │   └── jargon.ts
│   ├── utils/
│   │   └── analytics.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── setup.ts
│   ├── comparisonEngine.test.ts
│   ├── intentBuilder.test.ts
│   ├── useLocalStorage.test.ts
│   ├── responsiveLayout.test.ts
│   └── e2e/
│       └── mobileViewport.spec.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

## 2. Phased Implementation Sequence

### Phase 1: Tooling Scaffolding & Configuration
- **Dependencies:** None
- **Tasks:**
  1. Author `package.json` with compatible, maintained dependencies:
     - `react`, `react-dom` (v18.3.1)
     - `react-router-dom` (v6.26.2)
     - `lucide-react` (v0.446.0)
     - `tailwindcss` (v3.4.13), `postcss`, `autoprefixer`
     - `typescript` (v5.5.4), `vite` (v5.4.8), `@vitejs/plugin-react`
     - `vitest` (v2.1.1), `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
     - `@playwright/test`
  2. Setup `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`.
  3. Create `vercel.json` with client-side routing rewrite rules.
  4. Create `index.html` with mobile viewport meta tag (`viewport-fit=cover`).
- **Verification Gate:** Verified syntactically, configs aligned with zero dependency conflicts.

### Phase 2: Domain Data Models & Educational Registry
- **Dependencies:** Phase 1
- **Tasks:**
  1. Create TypeScript types (`src/types/investment.ts`, `src/types/jargon.ts`).
  2. Author `src/data/assetCategories.ts` covering 5 core categories (Individual Stocks, Equity Mutual Funds, Debt Mutual Funds, Index Funds, ETFs).
  3. Author `src/data/comparisons.ts` defining exhaustive dimensional breakdowns across all 8 dimensions:
     - *What You Own*
     - *Diversification*
     - *Main Risks*
     - *Liquidity & Restrictions*
     - *Costs & Fee Considerations*
     - *Research & Monitoring Effort*
     - *Time Horizon Considerations*
     - *What a Beginner Should Understand First*
  4. Author `src/data/jargonGlossary.ts` with 25+ essential terms, plain-English definitions, and everyday Indian analogies.
  5. Author `src/data/intentOptions.ts` with questions, answers, and mapping matrix.
- **Verification Gate:** 100% TypeScript type coverage without `any`. Comprehensive data for all combinations.

### Phase 3: Design System, Layout Shell & Contextual Drawer
- **Dependencies:** Phase 1, Phase 2
- **Tasks:**
  1. Author Tailwind color tokens (`groww-dark`, `groww-surface`, `groww-emerald`, `groww-border`, etc.).
  2. Create `ThemeContext.tsx` with Dark mode default and persistent `localStorage` synchronization.
  3. Create `MobileContainer.tsx` with 390px mobile frame baseline and clean centered presentation on larger screens.
  4. Create `TopHeader.tsx` with brand mark, theme toggle, and intent reset.
  5. Create `BottomNav.tsx` with 4 tabs (`Explore`, `Compare`, `Learn`, `Saved`), active state indicators, and safe-area padding (`pb-[env(safe-area-inset-bottom)]`).
  6. Create `BottomSheetDrawer.tsx` with gesture support, backdrop blur, and accessible focus management.
- **Verification Gate:** Layout displays properly at 320px and 390px widths with no horizontal scroll. Theme toggle switches theme without page reloads.

### Phase 4: Feature Implementation — Explore & Intent Builder
- **Dependencies:** Phase 3
- **Tasks:**
  1. Build `IntentBuilder.tsx`: 3-question guided flow with interactive option pills, dynamic match card, and 1-tap comparison transition.
  2. Build `CategoryCard.tsx`: Visual category cards with risk badges, effort indicators, and quick-action buttons.
  3. Build `CategoryDetailModal.tsx` or expander for deep-dive category view.
  4. Wire up Groww prototype handoff modals.
- **Verification Gate:** Completing the Intent Builder generates accurate recommendations. Category cards render cleanly.

### Phase 5: Feature Implementation — Comparison Lab
- **Dependencies:** Phase 3, Phase 4
- **Tasks:**
  1. Build `ComparisonSelector.tsx`: Two category pickers with smart validation preventing identical selection.
  2. Build `ComparisonMatrix.tsx`: Mobile card stack rendering the 8 dimensions.
  3. Implement in-line Jargon Buster triggers (dotted mint underline with info icon) opening the `BottomSheetDrawer`.
  4. Implement `Bookmark` action saving the active pair to `localStorage`.
  5. Implement prototype handoff CTAs for both selected categories.
- **Verification Gate:** All category pairs render rich dimensional data. In-line terms trigger bottom sheet without losing scroll position.

### Phase 6: Feature Implementation — Learn & Saved Hubs
- **Dependencies:** Phase 3, Phase 5
- **Tasks:**
  1. Build `JargonGlossary.tsx`: Searchable, filterable list of financial terms with tap-to-inspect drawers.
  2. Build `MythBusterCard.tsx`: Interactive flip/expand cards for common beginner misconceptions (e.g. *"Mutual funds are only for rich people"*, *"Stocks guarantee quick double returns"*).
  3. Build `SavedList.tsx`: Render bookmarked comparisons with timestamps, quick-open links, and delete actions.
  4. Build `EmptySavedState.tsx`: High-polish empty state with quick CTA to compare.
- **Verification Gate:** Search works instantaneously. Bookmarked comparisons persist across refreshes, load with one tap, and can be deleted.

### Phase 7: Testing, Responsive Verification & Polish
- **Dependencies:** Phase 1–6
- **Tasks:**
  1. Unit tests in `tests/comparisonEngine.test.ts` (pair resolution, dimension data integrity).
  2. Logic tests in `tests/intentBuilder.test.ts` (scoring and suggestion algorithm).
  3. Storage tests in `tests/useLocalStorage.test.ts` (fallback and persistence).
  4. Responsive test specs for 320px, 375px, 390px, and 414px viewports.
  5. Comprehensive `README.md` with product story, UX decisions, and local setup guide.
- **Verification Gate:** All unit and component tests passing. Zero horizontal overflow across all mobile viewports.

---

## 3. Testing Strategy & Quality Assurance Gates

| Test Level | Tooling | Scope | Target Threshold |
| :--- | :--- | :--- | :--- |
| **Logic / Unit** | Vitest | Comparison pair mapper, Intent scoring, LocalStorage hook | 100% test pass rate |
| **Component** | Testing Library | Theme toggle, Bottom sheet drawer open/close, Comparison selector validation | Core flows covered |
| **Mobile Layout** | Playwright / CSS specs | Viewport widths 320px, 375px, 390px; touch target sizes >= 44px; overflow-x: hidden | Zero horizontal scroll |
| **Accessibility** | Axe / ARIA | Contrast ratios in dark/light mode, drawer focus trapping, button ARIA labels | WCAG 2.1 AA |

---

## 4. Deployment Readiness (Vercel)

- Single-page application rewrites defined in `vercel.json`:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
- Build output configured to `dist/`.
- Optimized SVG icons and zero external CDN script dependencies.
