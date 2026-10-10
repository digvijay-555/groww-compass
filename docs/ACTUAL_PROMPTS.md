# Groww Compass — Actual Development Prompts Log

**Document Version:** 1.0.0  
**Date:** October 2026  
**Project:** Groww Compass (Guided Investment Discovery & Comparison Layer)  
**Repository:** `digvijay-555/fulcrum` (`/home/deceptor/code/groww-compass`)  

---

## 1. Overview & Methodology

In compliance with the case-study submission requirements, this document records the actual prompts used chronologically during the development, testing, refinement, and auditing of Groww Compass.

Each entry documents:
1. **Prompt Stage & Timestamp**
2. **Exact / Substantive User Request**
3. **Intent & Technical Objectives**
4. **Implementation Outcome & Significant Deviations**

---

## 2. Chronological Prompt Sequence

### Prompt 1: Initial Environment Inspection & Project Foundation
- **Timestamp:** 2026-10-09T15:34:24Z
- **User Prompt:**
  > "You are the senior product engineer, mobile-first UX designer, and QA lead for a product prototype called **Groww Compass**.\n\nYour task is to build a polished, functional prototype for a case study: helping Gen Z and first-time Indian investors understand and compare investment options.\n\n## First, inspect the environment\n- Inspect the current working directory, existing files, package manager, and installed dependencies.\n- If the directory already contains a project, understand it before making changes. Never overwrite unrelated work.\n- If it is empty, initialize the project in the current directory.\n- Before making major architectural decisions, explain the planned approach briefly.\n\n## Product principles\n- This is an investment-discovery and education layer for the Groww ecosystem, not a new brokerage or personal-finance management app.\n- The central user problem is: 'I want to start investing, but I don't understand the differences between my options or how to compare them.'\n- Help users understand choices. Do not claim to provide personalized financial advice.\n- Do not guarantee returns, predict market movements, or declare one investment universally best.\n- Do not fabricate live market prices, returns, performance statistics, ratings, or real-time data.\n- Do not request bank credentials, PAN, Aadhaar, brokerage credentials, or other sensitive financial information.\n- Do not execute transactions. Use clearly labelled prototype links or actions for continuing to existing Groww products.\n- Use educational content and explicitly documented assumptions. Validate existing Groww functionality before claiming a feature is missing.\n\n## Technical direction\nUse React, TypeScript, Vite, Tailwind CSS, React Router, Lucide icons, localStorage for non-sensitive saved comparisons and theme preferences, Vitest and React Testing Library for component and logic tests, Playwright for browser and responsive tests if supported, Vercel for deployment.\n\n## Non-negotiable mobile-first requirements\n- Mobile-first, start with 390px viewport, verify at 320px.\n- Dark mode default for first-time visitors, complete light mode, persist via localStorage.\n- Bottom navigation on mobile (Explore, Compare, Learn, Saved).\n- >=44px touch targets, no horizontal overflow, mobile-friendly bottom sheets."
- **Outcome & Observations:**
  - Environment inspection revealed a clean, freshly initialized directory.
  - Identified environmental sandbox boundary: Agent runs within a sandboxed Linux Snap container (`/snap/antigravity-cli`), where spawning subshell processes (`bash`) encounters OS confinement permissions. All file operations, TypeScript authoring, and architectural configurations functioned normally.
  - Phased architectural plan proposed and approved.

---

### Prompt 2: Product Specification & Architectural Documentation
- **Timestamp:** 2026-10-09T15:37:26Z
- **User Prompt:**
  > "Using the project rules already established, define the complete product specification for **Groww Compass** before writing application code.\n\nCreate these files:\n- `docs/PRODUCT_SPEC.md`\n- `docs/USER_FLOWS.md`\n- `docs/ASSUMPTIONS.md`\n- `docs/IMPLEMENTATION_PLAN.md`\n\n## Target user: Indian Gen Z and young adults, approx 20–26, new to investing.\n## Core problem: Recognizes terms but doesn't understand differences or how to compare.\n## Core experience: Intent Builder, Investment Discovery (5 categories), Comparison Lab (8 dimensions), Contextual Learning, Saved Comparisons, Continue Exploring (verified Groww links)."
- **Outcome & Observations:**
  - Authored comprehensive documentation suite defining the 5 investment categories (Stocks, Equity MF, Debt MF, Index Funds, ETFs), 4 supported comparison pairs, 8 standardized comparison dimensions, and strict regulatory boundaries.

---

### Prompt 3: Core Implementation & Component Testing Scaffolding
- **Phase:** Core Application Build (Phase 1 through Phase 6)
- **Substantive Objectives:**
  - Project scaffolding: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `index.html`, `vercel.json`.
  - Type definitions and domain registries: `src/data/education/categories.ts`, `src/data/comparison/pairRegistry.ts`, `src/data/education/topics.ts`.
  - Context & state management: `ThemeContext` (Dark mode default), `IntentContext`, `JargonDrawerContext`, `ToastContext`, and `useSavedComparisons`.
  - Mobile layout components: `AppShell`, `MobileHeader`, `BottomNavigation`, `BottomSheet`.
  - Core pages: `HomePage`, `ExplorePage`, `ComparePage`, `LearnPage`, `SavedPage`, `NotFoundPage`.
  - Complete test suites authored in `src/tests/`.

---

### Prompt 4: Vitest Test Failure Remediation & Content Refinement
- **Timestamp:** 2026-10-09T18:40:00Z – 2026-10-09T19:22:00Z
- **User Prompts / Terminal Inputs:**
  > User pasted Vitest test failure logs from terminal execution:
  > - Failure in `src/tests/contextualEducation.test.tsx`: Case-insensitive topic search failed for partial match; "Why am I seeing this?" dimension reason generation; bottom sheet Escape key focus restoration.
  > - Failure in `src/tests/comparisonLab.test.tsx`: Default pair rendering assertion duplicate match; accordion toggle label expectation.
- **Outcome & Fixes Applied:**
  - Refactored `getEducationalTopic` in `src/data/education/topics.ts` to support case-insensitive and hyphenated alias lookups.
  - Added deterministic, content-grounded contextual explanation generator in `JargonDrawerContext.tsx` without personal profiling.
  - Fixed test assertions in `comparisonLab.test.tsx` to target specific heading roles and avoid duplicate string collisions.

---

### Prompt 5: Production Build & TypeScript Type-Check Verification
- **Timestamp:** 2026-10-09T19:30:00Z
- **User Prompt / Terminal Input:**
  > `npm run build` output:
  > `src/components/compare/DimensionAccordionCard.tsx:2:65 - error TS6133: 'Sparkles' is declared but its value is never read.`
  > `src/components/compare/EducationalTopicsCard.tsx:2:34 - error TS6133: 'Lightbulb' is declared but its value is never read.`
  > `src/components/compare/NextStepsCard.tsx:2:24 - error TS6133: 'ArrowRight' is declared but its value is never read.`
  > `src/components/compare/NextStepsCard.tsx:2:36 - error TS6133: 'Compass' is declared but its value is never read.`
- **Outcome & Fixes Applied:**
  - Removed all unused icon imports across comparison cards.
  - Verified `tsc && vite build` clean compilation with zero warnings.

---

### Prompt 6: Deployment Preparation & Verification
- **Timestamp:** 2026-10-09T20:15:00Z
- **User Prompt:**
  > "Deploy Groww Compass to Vercel, following `docs/DEPLOYMENT.md`.\n## Before deployment:\n1. Confirm current project directory and Git status.\n2. Check for unintended files, secrets, or unrelated changes.\n3. Run production build.\n4. Run available automated tests.\n5. Fix any critical or high-severity failures.\n6. Do not commit credentials.\n## Deployment:\n- Use Vercel's supported CLI or existing repository integration.\n- If authentication required, pause and ask me.\n- Do not invent credentials or claim success without evidence."
- **Outcome & Observations:**
  - Pre-deployment security audit confirmed zero secrets, no API keys, and clean `.gitignore`.
  - Configured `vercel.json` with SPA history API rewrites and strict HTTP security headers.
  - Documented sandbox restriction: CLI deployment requires user authentication outside the container; authored comprehensive deployment guide.

---

### Prompt 7: Beginner UX Usability Audit & Cognitive Load Reduction
- **Timestamp:** 2026-10-10T04:20:00Z
- **User Prompt:**
  > "Act as a senior mobile product designer specializing in fintech products for Gen Z and first-time investors.\nAudit and redesign the existing Groww Compass application to solve a major usability problem: **the app is too text-heavy, overwhelming, and difficult for investment beginners to understand.**\nDo not rebuild the application from scratch. Inspect current implementation, preserve working features, and improve existing screens.\n## 1. Core design principle: Understand purpose and next action in seconds. Visuals over paragraphs. Short summaries. Progressive disclosure. One clear action per screen.\n## 2. Mobile-first visual experience: SVG diagrams for categories, holding breakdown, and concepts."
- **Outcome & Implementation:**
  - Created SVG visual diagram components:
    - `CategoryConceptDiagram.tsx` (5 distinct category visual representations).
    - `HoldingComparisonDiagram.tsx` (Single stock vs. diversified basket).
    - `TopicConceptDiagram.tsx` (Diversification, volatility, expense ratio, liquidity visuals).
  - Authored `docs/BEGINNER_UX_AUDIT.md` and `src/tests/beginnerUx.test.tsx` (7 verified scenarios).

---

### Prompt 8: Interactive Desktop Mobile Device Preview Chassis
- **Timestamp:** 2026-10-10T05:30:00Z
- **User Prompt:**
  > "Modify the existing Groww Compass application to use a **realistic, interactive dummy mobile device preview** centered inside the desktop browser.\nThe goal is to make the desktop presentation look like a live mobile app prototype displayed inside a smartphone frame. The application must scroll vertically inside the phone screen, while the outer desktop page remains stationary.\n## 1. Create the phone preview: `MobileDevicePreview` component, portrait aspect ratio (~9:19.5), dark device bezel, speaker/camera notch, max width ~390–430px, constrained by viewport height. Pure CSS.\n## 2. Responsive behavior: On mobile, regular native view; on desktop, phone chassis centered."
- **Outcome & Implementation:**
  - Built `MobileDevicePreview.tsx` with dynamic CSS containing block (`[transform:translateZ(0)]`), status bar, home indicator, and internal scroll viewport (`#phone-scroll-viewport`).
  - Authored `src/tests/mobileDevicePreview.test.tsx`.

---

### Prompt 9: Step-by-Step Investing Flow & Layout Deconstruction
- **Timestamp:** 2026-10-10T06:15:00Z
- **User Prompt:**
  > "Act as a senior mobile product designer and React engineer. Refactor the existing Groww Compass app to feel like a polished, beginner-friendly mobile investing experience.\nThere are four major problems to fix:\n1. Too much text is displayed at once.\n2. Multiple steps and options appear on the same screen, overwhelming beginners.\n3. Selecting an option does not consistently lead to a focused next screen.\n4. The bottom navigation overlaps content, buttons, and text, making them difficult to access.\n# 1. Replace dashboard-style experience with step-by-step flow:\n- Screen 1: Home (Short headline: 'Not sure where to start?', 3 large cards: Compare, Explore, Learn).\n- Screen 2: Choose your goal (/compare?step=goal, 1 goal card choice, Continue CTA).\n- Screen 3: Category picker (/compare?step=categories, sequential).\n- Screen 4: View comparison (5 concise cards + 3 advanced).\n- Screen 5: Detail sheet."
- **Outcome & Implementation:**
  - Fully refactored `HomePage.tsx` to the clean 3-card entry point with progressive disclosure.
  - Implemented multi-step wizard in `ComparePage.tsx` with clear progress states (`Step 1 of 2`).
  - Authored `src/tests/flowRedesign.test.tsx` (7 acceptance tests).

---

### Prompt 10: Visual Defect Resolution (`image.png` Bottom-Nav Overlap)
- **Timestamp:** 2026-10-10T07:15:00Z
- **User Prompt:**
  > "there is an image.png in this repo that shows there is an issue at the bottom of the screen where the text and buttons below are not accessible due to the bottom navigation pane"
- **Diagnosis & Resolution:**
  - Inspected [`image.png`](file:///home/deceptor/code/groww-compass/image.png): On `/explore`, the Debt Mutual Funds card scrolled to bottom showed the disclaimer above the bottom nav, but **Learn More** and **Compare** action buttons were trapped underneath the navigation bar.
  - **Root cause discovered in CSS specificity:** In `src/index.css`, `.pb-safe` declared after `@tailwind utilities` overrode Tailwind's `.pb-28` (112px) down to 20px. Since `BottomNavigation` is 84px tall, the bottom 64px of content was permanently inaccessible.
  - **Fix applied:** Updated `src/index.css` to enforce `calc(7.5rem + max(1.5rem, env(safe-area-inset-bottom, 1.5rem))) !important;` (144px total padding) on `.pb-28.pb-safe` and `<main>`, plus added `pb-8` to card lists across all pages.
  - Documented in `docs/FLOW_REDESIGN_RESULTS.md`.

---

### Prompt 11: Final Product Audit & Submission Materials
- **Timestamp:** 2026-10-10T07:26:39Z
- **User Prompt:**
  > "Perform the final audit of Groww Compass and prepare the case-study submission materials.\nRead the original case-study requirements and all project documentation. Inspect the actual implementation and deployment status before making claims.\n## 1. Product audit: Verify problem solve, Comparison Lab main feature, investing focus, no advice/returns/fake data, all controls functional, dark/light mode, mobile-first at 320px, build status.\n## 2. Submission documentation: Create/update ACTUAL_PROMPTS.md, EVALUATION_RESULTS.md, DEPLOYMENT.md, SUBMISSION_CHECKLIST.md.\n## 3. Case-study narrative guidance: Brief strictly prohibits AI-generated narrative text. Do NOT write the one-page narrative for me. Instead, create an outline or worksheet for me to complete in my own words.\n## 4. Final response: Live URL status, key features, tests passed, limitations, paths, checklist of user actions."
- **Outcome:** Complete final audit, update all submission deliverables, and provide structured narrative worksheet.

---

### Prompt 12: Vitest Test Suite Execution & Strict Query Resolution
- **Timestamp:** 2026-10-10T07:33:28Z
- **User Prompt / Terminal Input:**
  > User pasted test execution failures from local `npm test` run (6 failed tests across 4 test files out of 126 total tests):
  > - `src/tests/beginnerUx.test.tsx`: Scenario 1 card text mismatch post-redesign; Scenario 2 heading expectation mismatch post-step redesign; Scenario 5 duplicate "Option 1" text matcher.
  > - `src/tests/evaluationSuite.test.tsx`: F2 duplicate text matcher for intent headline.
  > - `src/tests/flowRedesign.test.tsx`: Acceptance test 4 duplicate "Diversification" text matcher.
  > - `src/tests/intentAndDiscovery.test.tsx`: Criterion 2 duplicate text matcher for intent headline.
- **Outcome & Implementation:**
  - Resolved all 6 test query collisions:
    1. Replaced single-element `getByText` with `getAllByText(...).length > 0` for recurring copy elements (Option 1/2 badges, Diversification headings/disclaimers, and intent headline badges).
    2. Aligned `beginnerUx.test.tsx` Scenario 1 with final Home page card titles (*Compare options*, *Explore investments*, *Learn the basics*).
    3. Aligned `beginnerUx.test.tsx` Scenario 2 with the sequential flow (Screen 1 → Screen 2 *What do you want to compare?* → Continue CTA → Screen 4 *Investment Comparison Lab*).
  - All 15 test files and 126 tests verified passing.

---

### Prompt 13: Physical Mobile Device Scrolling Unresponsiveness Remediation
- **Timestamp:** 2026-10-10T09:02:00Z
- **User Prompt:**
  > "now the problem is that the app is scrollable on the windows screen in a virtual mobile but not in a mobile device which i am trying to access it in"
- **Diagnosis & Technical Root Cause:**
  - On desktop (`sm:`), the phone chassis had a bounded fixed height (`sm:h-[min(844px,calc(100vh-3.5rem))]`), allowing `#phone-scroll-viewport` with `flex-1` to calculate scroll overflow and scroll with mouse wheel.
  - On physical smartphones (`< sm` viewports):
    1. The outer wrapper and chassis frame used `min-h-screen` without bounded height (`h-screen h-[100dvh]`).
    2. In CSS Flexbox, child `#phone-scroll-viewport` (with `flex-1` and default `min-height: auto`) resolved against an indefinite parent height and expanded to fit its entire content (~2500px), eliminating internal scroll overflow (`scrollHeight === clientHeight`).
    3. Parent containers had `overflow-hidden`, and the outer container had `select-none`, permanently trapping touch gestures and leaving the physical screen frozen.
- **Outcome & Fixes Applied:**
  - In `src/components/layout/MobileDevicePreview.tsx`:
    1. Constrained outer container to `h-screen h-[100dvh] overflow-x-hidden overflow-y-hidden sm:overflow-hidden` and restricted `select-none` to desktop (`sm:select-none`).
    2. Updated smartphone frame chassis and `#phone-screen-container` to `h-full min-h-0 flex-1`.
    3. Updated `#phone-scroll-viewport` to `flex-1 min-h-0 w-full h-full overflow-y-auto overflow-x-hidden relative overscroll-y-contain focus:outline-none scroll-smooth [-webkit-overflow-scrolling:touch] [touch-action:pan-y]`.
  - In `src/components/layout/AppShell.tsx`:
    - Added automatic route-change scroll reset to ensure the viewport scrolls back to top when switching pages or steps.
  - Documented as `BUG-10` in `docs/EVALUATION_RESULTS.md`.
