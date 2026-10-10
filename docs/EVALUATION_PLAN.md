# Groww Compass — Structured Evaluation Plan

**Version:** 1.0.0  
**Product:** Groww Compass (Guided Investment Discovery & Comparison Layer)  
**Target Audience:** Indian Gen Z and first-time investors (ages 20–26)  
**Evaluation Owner:** Senior Product Engineer & QA Lead  
**Last Updated:** October 2026  

---

## 1. Executive Summary & Evaluation Goals

The primary goal of Groww Compass is to provide Indian young adults with transparent, unbiased mental models of core investment asset categories before they commit capital. This evaluation plan defines the rigorous test criteria and execution protocols required to validate:

1. **Functional Integrity:** Complete user flows across Intent Builder, Asset Discovery, Comparison Lab, Contextual Education Drawer, and Saved Comparisons.
2. **Product & Pedagogical Compliance:** Strict adherence to discovery principles—zero personalized investment advice, zero return guarantees, zero fabricated prices, zero collection of sensitive credentials (PAN/Aadhaar/Bank credentials), and accurate local browser storage attribution.
3. **Mobile-First Ergonomics:** Flawless usability across standard Indian mobile screen sizes (320px, 360px, 390px, 430px), one-handed reachability, 44px minimum touch targets, and contrast compliance across both Dark (primary) and Light themes.
4. **Beginner Usability:** Walkthroughs of common beginner dilemma scenarios.

---

## 2. Evaluation Environment & Tooling Protocols

### A. Automated Component & DOM Testing Stack
- **Framework:** Vitest 2.1.1 + `@testing-library/react` 16.0.1 + `@testing-library/jest-dom` 6.5.0
- **Virtual DOM Environment:** `jsdom` 25.0.1
- **Dedicated Test Suites:**
  - `src/tests/evaluationSuite.test.tsx` (Unified F1–F12, P1–P8, and D1–D5 suite)
  - `src/tests/uiUxRefinement.test.tsx` (Focus trap, contrast, reduced-motion, and viewport constraints)
  - `src/tests/savedComparisons.test.tsx` (Storage failure, deduplication, corruption resilience, accidental deletion prevention)
  - `src/tests/comparisonLab.test.tsx` (8 dimensions, symmetry, alternatives)
  - `src/tests/contextualEducation.test.tsx` (11 core topics, "Why am I seeing this?" generator)
  - `src/tests/intentAndDiscovery.test.tsx` (Intent selection and category exploration)
  - `src/tests/theme.test.tsx`, `src/tests/layout.test.tsx`, `src/tests/navigation.test.tsx`

### B. Environmental Boundary & Live Browser Tooling Disclosure
- **Agent Sandbox Constraint:** The current AI development environment operates inside a sandboxed Linux Snap container (`antigravity-cli`), which restricts the agent from directly spawning child processes (`fork/exec bash: permission denied`).
- **Methodology Applied:**
  1. Component DOM tree rendering, user event dispatching, URL state transitions, focus management, `localStorage` read/write resilience, and content verification are fully authored as reproducible React Testing Library specs in `src/tests/`.
  2. All code and test files are statically validated and verified against the TypeScript compiler schema (`tsconfig.json`).
  3. Live browser layout testing (e.g., automated headless Chromium viewport rendering via Playwright or physical device GPU testing) cannot be spawned directly by the agent inside this Snap container. Therefore, all test specs are delivered in `src/tests/` for the user to execute natively via `npm test` and `npm run dev`. No unexecuted browser tests will be reported as live passes.

---

## 3. Test Suites & Evaluation Criteria

### Section A: Functional Verification (F1 – F12)

| Test ID | Scenario Description | Acceptance Criteria |
| :--- | :--- | :--- |
| **F1** | Product Purpose Understanding | A first-time visitor immediately sees what Groww Compass is, the 3 value pillars ("Cut Jargon", "Compare Honestly", "No Sales Push"), and that no account/login is needed. |
| **F2** | Intent & Experience Level Selection | User can select any of the 5 prompt intents and 3 experience depths. The dynamic tailored discovery guidance card updates in real time. |
| **F3** | Investment Category Discovery | User can browse all 5 categories (Stocks, Equity MF, Debt MF, Index Funds, ETFs) with plain-English definitions, ownership details, and important considerations. |
| **F4** | Comparison Lab Launch | User can launch a head-to-head comparison from Home, Explore, or directly via URL with 8 standardized dimensions. |
| **F5** | Dynamic Category Switching & Alternatives | User can change either category dropdown in real time. Unsupported combinations display pedagogical explanations and 1-tap supported alternatives. |
| **F6** | Contextual Education In-Flow | User can tap "Why am I seeing this?" or highlighted jargon chips to open a bottom sheet. Closing the sheet preserves comparison state. |
| **F7** | Save & Reopen Comparison | User can bookmark a comparison in Comparison Lab with toast feedback, and reopen it from the Saved Hub (`/saved`). |
| **F8** | Accidental-Deletion Safe Removal | Deleting a saved comparison requires confirmation via modal bottom sheet before permanent removal. |
| **F9** | Storage Persistence Across Sessions | Saved comparisons remain intact after page reload or remount, verified from `groww_compass_saved_comparisons`. |
| **F10** | Theme Persistence Across Navigation | Switching between Dark and Light mode persists across navigation, remounts, and avoids startup theme flash. |
| **F11** | Bottom Navigation Integrity | All 4 fixed navigation tabs (`/explore`, `/compare`, `/learn`, `/saved`) route to the correct screen with active indicators. |
| **F12** | Nested Route & URL Query Refresh | Direct navigation to deep URLs (e.g. `/compare?a=stocks&b=equity-mf` or `/learn?q=Volatility`) initializes the correct state. |

---

### Section B: Product & Content Principles (P1 – P8)

| Test ID | Principle Evaluated | Verification Rule |
| :--- | :--- | :--- |
| **P1** | Neutral Framing (No "Best" Asset) | No category is labeled universally best, optimal, or an undisputed winner. |
| **P2** | Zero Return Guarantees | No claims of guaranteed returns, assured gains, or risk-free growth appear in any copy or examples. |
| **P3** | Zero Fabricated Live Data | No simulated stock tickers, live ticking market prices, or fake real-time performance graphs are rendered. |
| **P4** | Dimensional Separation | Content cleanly differentiates risk, diversification, liquidity, fee structures, and research effort across both options. |
| **P5** | Verified Ecosystem Destinations | External product links point strictly to official Groww endpoints (`https://groww.in/...`) and prompt an Educational Prototype notice before proceeding. |
| **P6** | Zero Sensitive Data Collection | The application never asks for or stores PAN, Aadhaar, bank accounts, UPI PINs, or brokerage credentials. |
| **P7** | Accurate Local Storage Attribution | Saved items explicitly display a banner clarifying that records reside purely in browser `localStorage` without cloud syncing. |
| **P8** | Strict Discovery Scope | Product remains focused on investment discovery and comparison without scope creep into budgeting, bank scraping, or portfolio management. |

---

### Section C: Mobile & Responsive Layout Criteria

Evaluated against the core Indian smartphone screen spectrum:
- **320×640px** (Small entry-level phones / iPhone SE)
- **360×800px** (Mainstream Android devices)
- **390×844px** (Standard iPhone 14/15/16 baseline)
- **430×932px** (Large flagship devices / Pro Max)
- **768×1024px** (Tablet / Desktop centered presentation)

#### Responsive Checkpoints:
1. **Zero Horizontal Page Overflow:** No element triggers horizontal scrollbars on the root document (`overflow-x-hidden`).
2. **Safe Area Clearances:** Main container maintains `pb-28 pb-safe` so fixed bottom navigation never covers content or action buttons.
3. **Ergonomic Touch Targets:** All interactive controls maintain minimum 44×44px hitboxes (`min-h-touch min-w-touch`).
4. **Single-Column Mobile Stacking:** Comparison dimension sides stack vertically on phone viewports instead of cramming into wide desktop tables.
5. **Keyboard Accessibility:** Bottom sheets trap `Tab`/`Shift+Tab` within the dialog and dismiss with `Escape`.

---

### Section D: Beginner Usability Scenarios

Walkthroughs evaluating real-world beginner mental models:
1. **Scenario 1:** *“I have heard of stocks and mutual funds but don't understand the difference.”*
2. **Scenario 2:** *“I want to compare index funds and ETFs.”*
3. **Scenario 3:** *“I don't understand what diversification means.”*
4. **Scenario 4:** *“I want to save a comparison and read it later.”*
5. **Scenario 5:** *“I prefer light mode and want the app to remember my choice.”*

---

## 4. Execution Protocols & Defect Severity Matrix

- **Critical:** Prevents core discovery/comparison flow, crashes the application, or requests sensitive credentials.
- **High:** Misleading financial claim, broken navigation, data loss on refresh, or touch targets < 44px.
- **Medium:** Layout awkwardness on 320px screens, contrast ratio below WCAG AA, or missing focus states.
- **Low:** Minor copy polish or non-blocking animation timing.
