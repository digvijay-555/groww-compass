# Groww Compass 🧭

An educational investment-discovery and comparison experience tailored for Indian Gen Z and first-time investors (ages 20–26) within the Groww ecosystem.

---

## 💡 What is Groww Compass?

Groww Compass provides a guided discovery layer that helps first-time investors clarify their learning intent, explore foundational asset categories (Stocks, Mutual Funds, Debt Funds, Index Funds, ETFs), conduct head-to-head comparisons across 8 standardized dimensions, and look up financial jargon with everyday Indian analogies without leaving their flow.

> **Product Boundary Notice:**  
> Groww Compass is an educational prototype and discovery layer. It does not provide personalized investment advice, does not recommend specific stocks or funds, does not fabricate live tickers, does not request financial credentials (PAN/Aadhaar/Bank credentials), and does not execute financial transactions. External links point to verified Groww product exploration destinations.

---

## 📱 Mobile-First Design & Architecture

- **Primary Viewport:** Designed strictly at 390px baseline (iPhone 14/15/16) and verified across 320px (iPhone SE), 360px (Android), 390px, and 430px (Pro Max).
- **Default Theme:** Dark mode by default (`#0D1117`), with full high-contrast Light Mode support persisted in `localStorage`. Zero theme-flash script before first DOM paint.
- **One-Thumb Reachability:** Fixed bottom navigation (`Explore`, `Compare`, `Learn`, `Saved`) with `pb-safe` (safe area insets) and minimum 44×44px touch targets.
- **Content Overlap Guard:** Main layout enforces `pb-28 pb-safe` so bottom navigation never obscures content or action buttons.
- **Zero Horizontal Overflow:** Mobile card stacks instead of wide desktop tables.
- **Contextual Learning:** Tapping highlighted terms or "Why am I seeing this?" triggers an accessible slide-up Bottom Sheet Drawer without navigating away or losing comparison state.

---

## 🛠️ Technology Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with Groww custom color tokens & CSS variables
- **Navigation:** React Router v6 (HTML5 History API with SPA fallback)
- **Icons:** Lucide React
- **Storage:** Browser `localStorage` for non-sensitive theme and bookmarked comparisons (strictly isolated from sensitive credentials)
- **Testing:** Vitest + React Testing Library + `@testing-library/jest-dom`
- **Hosting / CDN:** Vercel (Production Static Site / SPA with custom headers & rewrites)

---

## ✨ Features

1. **Intent Builder & Experience Profiling (`/`):**
   - 5 intent prompts helping beginners articulate what they want to understand.
   - 3 experience levels adjusting explanation depth without generating automated advice.
   - Dynamic discovery path card highlighting core focus dimensions.
2. **Investment Discovery (`/explore`):**
   - 5 core asset categories: Individual Stocks, Equity Mutual Funds, Debt Mutual Funds, Index Funds, ETFs.
   - Plain-English definitions, ownership models, important considerations, and provider dependency notices.
   - Detailed bottom sheet overview with checklists and ecosystem exploration destinations.
3. **Comparison Lab (`/compare`):**
   - Head-to-head trade-off contrast across 8 standardized dimensions (What You Own, Diversification, Main Risks, Liquidity, Costs & Fees, Research Effort, Time Horizon, Beginner Checklist).
   - Curated quick-switcher chips for 4 supported pairs.
   - Pedagogical alternatives view for unsupported pairs.
   - Expand/Collapse All accordion controls.
4. **Contextual Education Layer (`/learn` & drawers):**
   - 11 core financial concepts (Diversification, Volatility, Expense Ratio, Liquidity, SIP, Market Risk, Company-specific Risk, Index Fund, ETF, Time Horizon, Active vs. Passive).
   - "Why am I seeing this?" contextual generator explaining why specific dimensions matter for the active comparison pair.
   - Real-time search library with category filters and empty states.
5. **Saved Comparisons Hub (`/saved`):**
   - Bookmark comparisons from the lab with toast feedback and bottom nav badge counter.
   - Reopen comparisons with URL query parameters pre-selected.
   - Personal user notes editor per saved item.
   - Accidental-deletion protection with confirmation modals.
   - Clear disclaimer that comparisons are stored locally on the browser/device without cloud syncing.

---

## 🚀 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. Use Chrome DevTools device mode to emulate mobile viewports (320px, 360px, 390px, 430px).

### 3. Run Test Suite
```bash
# Run all Vitest test suites once
npm test

# Run tests in watch mode
npm run test:watch
```

### 4. Build for Production
```bash
# Typecheck with tsc and bundle with Vite
npm run build
```
Production assets are generated in the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🚢 Production Deployment

The project is pre-configured for one-click deployment on **Vercel** with custom cache control and SPA rewrites in [`vercel.json`](file:///home/deceptor/code/groww-compass/vercel.json).

```bash
# Deploy to production via Vercel CLI
vercel --prod
```

For complete deployment instructions, hosting alternatives (Netlify, Cloudflare Pages), and post-deployment smoke tests, refer to [`docs/DEPLOYMENT.md`](file:///home/deceptor/code/groww-compass/docs/DEPLOYMENT.md).

---

## ⚠️ Known Limitations

1. **Local-Only Storage:** Bookmarked comparisons are stored in the user's browser `localStorage`. They do not sync across devices or browsers since Groww Compass intentionally avoids user accounts and cloud storage to respect user privacy.
2. **Curated Comparison Pairs (4 Pairs):** To maintain rigorous pedagogical quality, direct head-to-head comparisons are limited to 4 supported pairs (`stocks-vs-equity-mf`, `equity-mf-vs-debt-mf`, `index-funds-vs-equity-mf`, `index-funds-vs-etfs`). Unaligned cross-asset pairs display educational alternatives.
3. **Static Regulatory References:** Indian capital gains taxation references reflect Budget 2024 rules (20% STCG, 12.5% LTCG above ₹1.25L). Future union budget amendments will require static data updates.
4. **Prototype Boundaries:** External links lead to official Groww destinations via a modal notice, but Groww Compass does not directly execute trades, sync brokerage portfolios, or collect KYC data.

---

## 📚 Project Documentation

- [`docs/PRODUCT_SPEC.md`](file:///home/deceptor/code/groww-compass/docs/PRODUCT_SPEC.md) — Comprehensive product specification & behavioral rules
- [`docs/USER_FLOWS.md`](file:///home/deceptor/code/groww-compass/docs/USER_FLOWS.md) — Detailed user journeys and wireframe specifications
- [`docs/ASSUMPTIONS.md`](file:///home/deceptor/code/groww-compass/docs/ASSUMPTIONS.md) — User mental models, regulatory framing, and ecosystem boundaries
- [`docs/IMPLEMENTATION_PLAN.md`](file:///home/deceptor/code/groww-compass/docs/IMPLEMENTATION_PLAN.md) — Phased architecture roadmap
- [`docs/EVALUATION_PLAN.md`](file:///home/deceptor/code/groww-compass/docs/EVALUATION_PLAN.md) — Formal evaluation criteria and test harness specification
- [`docs/EVALUATION_RESULTS.md`](file:///home/deceptor/code/groww-compass/docs/EVALUATION_RESULTS.md) — Test execution evidence, bug fixes, and usability walkthroughs
- [`docs/DEPLOYMENT.md`](file:///home/deceptor/code/groww-compass/docs/DEPLOYMENT.md) — Production hosting, routing configuration, and smoke tests
