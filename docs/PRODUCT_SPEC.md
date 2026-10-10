# Groww Compass — Product Specification

**Version:** 1.0.0  
**Status:** Approved for Implementation  
**Target Viewport:** Mobile-first (390px baseline, 320px minimum support)  
**Theme:** Dark mode default, complete Light mode support  
**Document Owner:** Senior Product Engineer & Mobile-First UX Lead  

---

## 1. Executive Summary & Context

**Groww Compass** is an educational investment-discovery and comparison experience tailored for Indian Gen Z and young adults (aged approximately 20–26) embarking on their investing journey within the **Groww** ecosystem.

While modern fintech apps in India have made opening a demat account and setting up an auto-debit SIP friction-free, the **cognitive barrier to entry** remains steep. First-time investors frequently encounter terminology such as *large cap*, *index fund*, *expense ratio*, *direct stock volatility*, and *NAV*, without a grounded mental model of what these instruments actually represent, how they differ, or which dimensions matter for their specific horizon and comfort level.

Groww Compass solves this by acting as an **exploratory pre-investment compass**—enabling users to clarify their intent, understand the structural mechanics of 5 core asset categories, conduct head-to-head comparisons across 8 standardized dimensions, look up jargon in plain language, and transition with confidence to relevant Groww product destinations.

---

## 2. Core Product Principles & Non-Negotiables

| Principle | Specification & Boundary |
| :--- | :--- |
| **Education, Not Advice** | Groww Compass never provides personalized investment advice, does not recommend specific stocks or funds, and does not declare any option "the best". All content is purely pedagogical and comparative. |
| **No Fabricated Real-Time Data** | The prototype does not simulate live market tickers, fluctuating prices, fake star ratings, or guaranteed returns. Where numerical illustrations are shown (e.g. expense ratio ranges), they are clearly cited as industry benchmarks. |
| **Zero Sensitive Financial Data** | Never prompt for or store PAN, Aadhaar, bank credentials, MPIN, or brokerage logins. All user preferences (theme, saved comparisons) live solely in browser `localStorage`. |
| **No In-App Transactions** | No order execution, UPI mandates, or SIP creations. Next-step actions are clearly labeled as prototype handoffs connecting to existing Groww platforms. |
| **Honest Transparency & Nuance** | If a metric differs across specific schemes or fund houses (e.g., exit load periods, minimum investment amounts), Compass explicitly states *"Varies by scheme"* rather than overgeneralizing. |
| **Calm, High-Trust Fintech Design** | Avoid gamified tokens, cartoonish graphics, casino-style confetti, and high-pressure FOMO banners. Maintain clean dark-charcoal surfaces with restrained lime-green accents (`#00D09C` / `#22C55E`). |

---

## 3. Target User & Persona Profiles

### Primary Audience
- **Demographic:** Indian young adults (20–26 years old), including college final-year students, early career professionals, and entry-level gig/tech workers.
- **Financial Baseline:** Discretionary savings of ₹1,000 to ₹10,000 per month; bank balance typically in a low-interest savings account.
- **Pain Points:** 
  1. Overwhelmed by financial acronyms (CAGR, TER, AUM, ETF, LTCG).
  2. Confusion about the difference between seemingly similar products (e.g. Index Fund vs. Active Large Cap Fund vs. ETF).
  3. Fear of capital loss combined with social media FOMO (crypto, F&O, day trading tips).
  4. Decision paralysis leading to procrastination.

### User Personas

```
┌───────────────────────────────────┐    ┌───────────────────────────────────┐
│ Persona A: "Aarav" (Age 22)       │    │ Persona B: "Priya" (Age 24)       │
│ Role: Fresher Software Engineer   │    │ Role: Associate Product Marketer  │
│ Monthly Savings: ₹8,000           │    │ Monthly Savings: ₹15,000          │
├───────────────────────────────────┤    ├───────────────────────────────────┤
│ Goal: Wants to start first SIP    │    │ Goal: Wants to compare Index      │
│ Hurdle: Confused between Mutual   │    │       Funds vs ETFs vs Stocks     │
│         Funds and Direct Stocks   │    │ Hurdle: Doesn't understand fees,  │
│ Mindset: "I want long-term growth │    │         Demat requirements, or    │
│          without daily tracking." │    │         liquidity nuances.        │
└───────────────────────────────────┘    └───────────────────────────────────┘
```

---

## 4. Product Scope

### In-Scope Features
1. **Intent Builder:** A 3-question guided mental-model generator that clarifies the user's learning goal (e.g., "Understand Funds", "Direct Stocks vs Basket", "Low-Risk / Stable Options").
2. **Investment Discovery Hub:** Detailed structural breakdown of the **5 Core Investment Categories**:
   - **Individual Stocks** (Direct equity ownership)
   - **Equity Mutual Funds** (Active diversified pool managed by professional AMCs)
   - **Debt Mutual Funds** (Fixed-income securities, commercial papers, government bonds)
   - **Index Funds** (Passive rule-based replication of benchmarks like Nifty 50 or Sensex)
   - **Exchange Traded Funds (ETFs)** (Passive baskets traded live on stock exchanges)
3. **Investment Comparison Lab:** Interactive 2-way comparison engine evaluating any supported pair across **8 Standard Dimensions**.
4. **Contextual Learning (Drawer Jargon Buster):** Persistent in-line tap-to-inspect trigger for 20+ financial terms that opens a mobile bottom sheet with plain-English analogies without losing place.
5. **Saved Comparisons Hub:** Local persistence (`localStorage`) allowing users to bookmark, review, and delete comparisons across sessions.
6. **Ecosystem Continuity ("Continue Exploring on Groww"):** Clear, contextual next steps mapping comparison insights to official Groww product exploration surfaces.

### Explicitly Out-of-Scope
- Real-time stock/fund price streaming or chart order books.
- Personalized financial advice, portfolio risk scoring algorithms, or automated asset allocation recommendations.
- User account registration, login, KYC, bank account integration, or Aadhaar authentication.
- Order execution, payment gateway integration, or SIP registration.
- Speculative products: Crypto, Futures & Options (F&O), Intraday leverage trading, or Forex.

---

## 5. Overlap Analysis with Existing Groww Capabilities

| Potential Overlap Area | Existing Groww Capability | Groww Compass Role & Differentiation | Validation Need |
| :--- | :--- | :--- | :--- |
| **Mutual Fund Explorer** | Groww offers fund search, filtering by category (Large, Mid, Small Cap), 1Y/3Y/5Y returns, and AMC details. | Groww Compass is **pre-selection education**. It does not list individual schemes (e.g. *Parag Parikh Flexi Cap*), but rather explains *what an Equity Mutual Fund is* and *how it compares to an Index Fund*. | Verify whether users understand the category distinction before filtering individual mutual funds in the main app. |
| **Stock Screener** | Groww provides live candlestick charts, fundamentals, balance sheets, and technical indicators for NSE/BSE stocks. | Compass clarifies *what owning a single stock entails* (company-specific risk, research time) vs. *owning an Index Fund*. No tickers or price charts are rendered. | Validate if first-time investors looking at stocks know when an index fund is more appropriate for passive investing. |
| **Groww Academy / Blogs** | Groww has long-form articles, YouTube tutorials, and educational blog posts. | Groww Compass delivers **in-flow, bite-sized, interactive comparison tools** rather than static 2,000-word articles. It integrates context directly at the decision moment. | Assess user drop-off between reading static blog posts and taking action in Groww. |
| **Compare Funds Feature** | Groww web has a scheme-level comparison tool (e.g. comparing Fund A vs Fund B by NAV, Sharpe Ratio, Top Holdings). | Compass compares **asset classes and structural mechanisms** (e.g. ETF vs Index Fund, Debt vs Equity), not individual scheme performance. | Ensure users clearly understand asset-class differences before entering scheme-level comparisons. |

---

## 6. Detailed Feature Specifications

### 6.1 Feature 1: Intent Builder
- **Purpose:** Frame the user's entry point so they are not faced with a blank canvas or dense terminology.
- **Structure:**
  - Question 1: *"What brings you to Groww Compass today?"*
    - Options: "I have some savings and don't know where to start", "I want to understand the difference between Stocks and Funds", "I want low-stress, passive investing options", "I want to learn how regular monthly investing works".
  - Question 2: *"What is your primary investment mindset right now?"*
    - Options: "Safety & capital protection first", "Long-term wealth creation (5+ years)", "Curious about high growth, willing to accept ups and downs".
  - Question 3: *"How much time do you want to spend tracking your investments?"*
    - Options: "Virtually zero (set and forget)", "An hour or two every month", "I enjoy researching companies actively".
- **Outcome:** Generates a personalized **Compass Recommendation Card** directing the user to relevant categories in Discovery or a pre-populated comparison pair.

### 6.2 Feature 2: Investment Discovery Hub
- **Purpose:** Clearly differentiate the 5 core asset categories.
- **Card Content per Category:**
  - Name, Badge (e.g. "Passive Growth", "Capital Preservation", "High Involvement").
  - Plain-English 1-liner ("What is it?").
  - Structural Anatomy: What you actually own (e.g. fractional ownership in 50 companies vs debt issued by the government).
  - Risk & Volatility Indicator: Visual discrete meter (Low, Moderate, High, Very High).
  - Effort required: Passive / Moderate / Active.
  - Typical Horizon: < 1 year / 1–3 years / 3–5 years / 5+ years.
  - Quick action: "Compare with another asset" or "View deep-dive".

### 6.3 Feature 3: Investment Comparison Lab
- **Purpose:** Provide a side-by-side, dimension-by-dimension breakdown of any 2 selected asset categories.
- **Comparison Selectors:** Segmented picker / pill selection allowing any 2 of the 5 categories (with smart defaults like *Index Funds vs Equity Mutual Funds* or *Index Funds vs ETFs*).
- **The 8 Standardized Comparison Dimensions:**
  1. **What You Own:** Underlying legal structure and asset backing.
  2. **Diversification:** Number of underlying assets, concentration risk.
  3. **Main Risks:** Market risk, volatility, credit risk, manager underperformance risk, liquidity risk.
  4. **Liquidity & Restrictions:** Trading hours, settlement time (T+1), lock-in periods, exit loads.
  5. **Costs & Fee Considerations:** Total Expense Ratio (TER), brokerage, demat charges, tracking error, bid-ask spread.
  6. **Research & Monitoring Effort:** Passive hands-off vs periodic rebalancing vs active daily tracking.
  7. **Time Horizon Considerations:** Ideal holding duration for the instrument's risk profile.
  8. **What a Beginner Must Know First:** Critical gotchas (e.g. ETFs require a Demat account and trading during market hours; Debt funds no longer have indexation benefits under Indian tax law).
- **UX Form Factor:** Card-based mobile stack with toggleable dimension accordions and "Key Takeaway" pill summary.

### 6.4 Feature 4: Contextual Learning & Bottom Sheet Jargon Buster
- **Purpose:** Allow users to clarify terminology immediately without breaking their train of thought or leaving the comparison view.
- **Interaction:** Any highlighted term (e.g., *Expense Ratio*, *Tracking Error*, *Demat Account*, *Exit Load*, *NAV*, *Beta*, *Indexation*) features an underline/badge. Tapping it opens a smooth **Bottom Sheet Drawer**.
- **Drawer Content:**
  - Official definition in plain English.
  - Everyday analogy (e.g., *Expense Ratio = The maintenance fee deducted automatically by the fund house for managing your basket*).
  - How it impacts Indian investors (e.g., *SEBI caps equity fund expense ratios at 2.25%*).
  - Dismiss button and tap-outside to close.

### 6.5 Feature 5: Saved Comparisons Hub
- **Purpose:** Support asynchronous learning—users can save comparisons they found enlightening and return to them later.
- **Capabilities:**
  - Bookmark current comparison pair with one tap.
  - View all saved comparisons in the "Saved" tab.
  - Timestamp of when it was saved.
  - Delete individual comparisons or clear all.
  - Persisted in browser `localStorage`.

### 6.6 Feature 6: Continue Exploring on Groww (Ecosystem Handoff)
- **Purpose:** Provide a clear, honest transition from education to official Groww exploration surfaces.
- **Handoff Destinations:**
  - Stocks -> Groww Stocks Explorer (`/stocks`)
  - Equity / Debt / Index Funds -> Groww Mutual Funds Explorer (`/mutual-funds`)
  - ETFs -> Groww ETF Explorer (`/etfs`)
- **Prototype Styling:** Clearly labeled with a subtle pill badge *"Prototype Destination"* and a confirmation modal stating: *"In the live Groww app, this opens the verified category explorer."*

---

## 7. Design System & Aesthetics

- **Mobile Viewport Baseline:** 390px (iPhone 14/15/16). Layout verified down to 320px (iPhone SE).
- **Color Palette (Dark Mode - Default):**
  - Background Base: `#0D1117` (Deep dark slate)
  - Surface Elevated: `#161B22` (Charcoal card container)
  - Surface Border: `#30363D` (Subtle boundary definition)
  - Primary Accent: `#00D09C` (Groww signature emerald/mint)
  - Secondary Accent: `#22C55E` (Vibrant green indicator)
  - Text Primary: `#F0F6FC` (High-contrast white)
  - Text Secondary: `#8B949E` (Muted silver)
  - Alert / Highlight: `#E3B341` (Amber / gold note)
- **Color Palette (Light Mode):**
  - Background Base: `#F8F9FA`
  - Surface Elevated: `#FFFFFF`
  - Surface Border: `#E5E7EB`
  - Primary Accent: `#00B386`
  - Text Primary: `#111827`
  - Text Secondary: `#6B7280`
- **Typography:** Inter / system-ui, high legibility at 13px–16px, line-height 1.5.
- **Touch Ergonomics:** Minimum 44×44px interactive targets, bottom navigation bar fixed above mobile safe area, primary controls within lower 60% thumb zone.

---

## 8. Non-Functional Requirements & Performance

- **Bundle Size:** Under 180 KB initial gzipped JavaScript.
- **Zero Layout Shift (CLS):** 0.00 score; images and icons use fixed dimensions.
- **Offline / Local Persistence:** All state stored in `localStorage` under `groww_compass_*` keys.
- **Browser Compatibility:** Chromium, Safari iOS 15+, Firefox, Edge.

---

## 9. Acceptance Criteria Summary

- [ ] Intent Builder completes in under 60 seconds and suggests at least 1 tailored comparison.
- [ ] All 5 investment categories are browsable with complete definitions.
- [ ] Comparison Lab supports all 10 pairwise combinations across all 8 dimensions without missing data.
- [ ] Tapping any financial jargon term triggers a contextual bottom sheet without navigating away.
- [ ] Theme toggles between Dark and Light mode seamlessly and persists across browser refreshes.
- [ ] Saved comparisons persist in `localStorage` and can be reloaded or deleted.
- [ ] 0 horizontal scroll at 320px, 375px, and 390px viewport widths.
- [ ] Handoff CTAs clearly state prototype destination context.
