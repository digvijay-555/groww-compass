# Groww Compass — User Flows & Screen Specifications

**Version:** 1.0.0  
**Target Viewport:** Mobile-first (390px baseline, 320px minimum)  
**Document Owner:** Senior Product Engineer & Mobile-First UX Lead  

---

## 1. User Journey Architecture

Groww Compass provides a focused, low-cognitive-load navigation structure anchored by a **Fixed Bottom Navigation Bar**:
1. **Explore (🧭)**: Intent Builder & Investment Category Catalog
2. **Compare (⚖️)**: Interactive 2-Way Comparison Lab
3. **Learn (💡)**: Jargon Buster Glossary & Mental Model Guides
4. **Saved (🔖)**: Saved Comparisons & Bookmarks

```mermaid
flowchart TD
    Start([First-Time Visitor]) --> IB[Intent Builder (3 Steps)]
    IB --> Disc[Discovery Hub (5 Asset Categories)]
    Disc -->|Select Category| Detail[Category Deep Dive View]
    Detail -->|Tap Compare| Lab[Comparison Lab (2-Way Dimension Matrix)]
    Disc -->|Direct Compare CTA| Lab
    
    Lab -->|Tap Jargon Underline| Drawer[Contextual Bottom Sheet Drawer]
    Drawer -->|Close Drawer| Lab
    
    Lab -->|Tap Bookmark| SavedStore[(Local Storage)]
    SavedStore --> SavedTab[Saved Hub View]
    SavedTab -->|Click Saved Item| Lab
    
    Lab -->|Click Next Step| Handoff[Ecosystem Handoff Modal]
    Handoff --> GrowwDest[Groww Native Product Explorer]
```

---

## 2. Core User Flows

### Flow 1: First-Time Onboarding & Intent Discovery
1. **Entry:** User lands on `/` (Defaults to Dark Mode, Explore tab active).
2. **Intent Prompt:** Prominently featured top banner: *"Not sure where to begin? Build your investing intent in 30 seconds."*
3. **Step 1:** User selects their immediate goal (e.g., *"Understand the difference between Stocks & Funds"*).
4. **Step 2:** User selects their risk comfort (e.g., *"Long-term growth, can handle market dips"*).
5. **Step 3:** User selects their monitoring preference (e.g., *"Passive, low day-to-day effort"*).
6. **Result Card:** System displays dynamic match:
   - Recommendation: *"Start with Index Funds vs Active Equity Funds"*
   - 1-sentence rationale: *"You want market growth without spending hours analyzing quarterly earnings reports."*
   - Direct CTA: `Launch Comparison` (deep-links to Compare tab with pre-filled pair) or `Explore Index Funds`.

### Flow 2: Exploring & Comparing Two Categories
1. **Entry:** User navigates to the **Compare (⚖️)** tab.
2. **Category Selection:** 
   - Dropdown or pill selector for **Category A** (default: *Index Funds*).
   - Dropdown or pill selector for **Category B** (default: *Equity Mutual Funds*).
3. **Validation Rule:** If user selects the same category for both slots (e.g. Category A = *Index Funds*, Category B = *Index Funds*), system shows inline banner: *"Select two different categories to see contrast."* and disables comparison rendering until a distinct pair is chosen.
4. **Dimension Navigation:** User views the 8 standardized dimensions presented as clean, stacked mobile cards:
   - *What You Own*
   - *Diversification*
   - *Main Risks*
   - *Liquidity & Restrictions*
   - *Costs & Fee Considerations*
   - *Research & Monitoring Effort*
   - *Time Horizon*
   - *Beginner Gotchas*
5. **Quick Takeaway Pill:** Summary at top highlights key trade-off (e.g. *"Lower fees & benchmark returns vs. Potential outperformance with active fund management"*).

### Flow 3: Contextual Jargon Buster (No-Exit Learning)
1. **Trigger:** Inside any comparison card or category view, key terms (e.g. *Expense Ratio*, *Tracking Error*, *Demat*, *Exit Load*) are displayed with a dotted mint underline and an `(i)` indicator.
2. **Action:** User taps the term.
3. **Drawer Slide-up:** A mobile **Bottom Sheet Drawer** animates from the bottom of the screen (occupying 60% viewport height).
4. **Drawer Content:**
   - Term name with phonetic pronunciation badge.
   - Plain English definition.
   - Everyday Indian analogy (e.g. *"Like a taxi fare with an automatic maintenance charge"*).
   - Practical example in an Indian portfolio context.
5. **Dismissal:** User taps the `Close (✕)` button, taps the darkened scrim backdrop, or swipes down. Focus returns smoothly to the previous scroll position.

### Flow 4: Saving & Managing Comparisons
1. **Save Action:** In the Comparison Lab, user taps the `Bookmark` icon in the sticky top action bar.
2. **Feedback:** Instant toast notification: *"Saved to your comparisons"*. Bookmark icon fills with lime-green accent (`#00D09C`).
3. **Review:** User taps **Saved (🔖)** tab in bottom navigation.
4. **Management:**
   - User sees list of saved pairs with timestamp and key takeaway snippet.
   - Tapping an item opens that exact comparison in the Compare tab.
   - Tapping the `Trash` icon removes the comparison with an undo toast.
   - `Clear All` button with confirmation prompt.

### Flow 5: Ecosystem Continuity Handoff
1. **Trigger:** At the bottom of any category or comparison view, user sees:
   *"Ready to explore real schemes? Continue on Groww"*.
2. **CTA Action:** User taps `"Explore Index Funds on Groww"`.
3. **Feedback Modal:** Prototype explanation dialog appears:
   - *"You are transitioning to Groww's verified product catalog."*
   - Explains that in a live environment, this deep-links directly into the Groww Mutual Funds or Stocks explorer with pre-applied category filters.
   - Secondary button: `Return to Compass` / Primary: `Simulate Transition`.

---

## 3. Screen Wireframes & Layout Hierarchy

### Mobile Baseline: 390px (Safe Area Conscious)

```
┌──────────────────────────────────────────────┐
│  Groww 🧭 COMPASS             [☀️/🌙] [Help]  │ <-- Header (56px)
├──────────────────────────────────────────────┤
│                                              │
│  🧭 INVESTING INTENT                         │
│  ┌────────────────────────────────────────┐  │
│  │ What is your primary focus today?      │  │
│  │ [●] Understand Funds vs Stocks         │  │
│  │ [ ] Compare Low-Risk Options           │  │
│  │ [ ] Passive / Set-and-Forget           │  │
│  │                                        │  │
│  │ Match: Index Funds vs Active Funds    │  │
│  │ [ Compare Now -> ]                     │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  POPULAR INVESTMENT CATEGORIES               │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │ 📈 Stocks        │  │ 📊 Index Funds   │  │
│  │ Direct Ownership │  │ Nifty 50 Tracker │  │
│  │ High Involvement │  │ Low Cost Passive │  │
│  │ [Explore]        │  │ [Explore]        │  │
│  └──────────────────┘  └──────────────────┘  │
│                                              │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │ 💼 Equity Funds  │  │ 🛡️ Debt Funds    │  │
│  │ Active Managers  │  │ Capital Preserv. │  │
│  └──────────────────┘  └──────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│  [🧭 Explore]   [⚖️ Compare]   [💡 Learn]   [🔖]│ <-- Bottom Nav (64px)
└──────────────────────────────────────────────┘
```

### Comparison Lab Screen (Mobile Card Stack)

```
┌──────────────────────────────────────────────┐
│  ⚖️ COMPARISON LAB             [Bookmark ★]   │
├──────────────────────────────────────────────┤
│  Select Categories to Compare:               │
│  ┌───────────────────┐ vs ┌─────────────────┐│
│  │ Index Funds    ▼  │    │ Equity Funds  ▼ ││
│  └───────────────────┘    └─────────────────┘│
│                                              │
│  💡 Key Difference in 10 Seconds:            │
│  "Index funds copy the market at rock-bottom │
│   fees. Equity funds hire managers trying to │
│   beat the market at higher expense."        │
│                                              │
│  DIMENSION BREAKDOWN:                        │
│  ┌────────────────────────────────────────┐  │
│  │ 1. WHAT YOU OWN                        │  │
│  │ Index Funds: Basket of 50 top cos.     │  │
│  │ Equity Funds: 30-60 analyst-picked cos.│  │
│  ├────────────────────────────────────────┤  │
│  │ 2. COSTS & FEES                        │  │
│  │ Index Funds: 0.1% - 0.4% TER           │  │
│  │ Equity Funds: 1.0% - 2.2% TER          │  │
│  │ (Tap [Expense Ratio] to inspect)       │  │
│  ├────────────────────────────────────────┤  │
│  │ 3. RESEARCH & MONITORING               │  │
│  │ Index Funds: Passive (Check yearly)    │  │
│  │ Equity Funds: Moderate (Review fund mgr)│ │
│  └────────────────────────────────────────┘  │
│                                              │
│  [ Explore Index Funds on Groww  ↗ ]         │
├──────────────────────────────────────────────┤
│  [🧭 Explore]   [⚖️ Compare]   [💡 Learn]   [🔖]│
└──────────────────────────────────────────────┘
```

### Contextual Jargon Drawer (Slide-Up Sheet)

```
┌──────────────────────────────────────────────┐
│                  ─── (Drag Handle)           │
│                                              │
│  💡 JARGON BUSTER                    [✕]     │
│  Expense Ratio (TER)                         │
│  Tag: Cost / Annual Fee                      │
│  ──────────────────────────────────────────  │
│                                              │
│  Plain English:                              │
│  The percentage fee the mutual fund house    │
│  deducts every year from your total invested │
│  amount to manage the fund.                  │
│                                              │
│  The Real-World Analogy:                     │
│  "Think of it like a maintenance charge on a │
│   housing society. Whether property prices go│
│   up or down, the maintenance is deducted."  │
│                                              │
│  Why It Matters for You:                     │
│  A 1.5% difference in expense ratio over 20  │
│  years can eat up over 20-30% of your total  │
│  compounded wealth.                          │
│                                              │
│  [ Got it, back to comparison ]              │
└──────────────────────────────────────────────┘
```

---

## 4. State Matrix & Edge Cases

| Screen / Component | Normal / Active State | Loading State | Empty State | Error / Validation State |
| :--- | :--- | :--- | :--- | :--- |
| **Intent Builder** | 3-step interactive options with selection checkmark. | Subtle skeleton card on calculation. | Pre-filled default option active. | Validation if skipped step: highlights unanswered question. |
| **Category Discovery** | 5 cards rendered with badges, risk meters, and descriptions. | Skeleton cards with pulsing placeholders. | N/A (Static catalog). | Error boundary fallback with reload button. |
| **Comparison Lab** | Two distinct categories selected; 8 dimension cards populated. | Micro-spinner during pair transition (<100ms). | If no categories selected: prompt dropdown picker. | **Identical Category Error:** Banner: *"Please pick two different categories to compare."* |
| **Saved Comparisons** | List of saved cards with timestamps and delete buttons. | Instant retrieval from localStorage. | Friendly illustration + *"No saved comparisons yet. Try comparing Index Funds vs ETFs!"* + CTA to Compare tab. | If localStorage is corrupted or blocked: gracefully fall back to in-memory state. |
| **Jargon Drawer** | Bottom sheet opens smoothly with title, definition, and analogy. | Instant render (<50ms). | N/A (Term ID always resolved). | If term key missing: shows generic glossary fallback. |
| **Theme Switcher** | Toggles between Dark and Light mode. | Zero-flash transition. | Defaults to Dark Mode. | Fallback to user's OS preference (`prefers-color-scheme`). |

---

## 5. Touch Targets & Ergonomic Constraints

- **Minimum Tap Target:** 44×44 CSS pixels for all buttons, pills, dropdown triggers, and navigation icons.
- **Thumb Zone Optimization:** Primary actions (`Compare Now`, `Bookmark`, `Select Category`, `Next Step`) are placed within the bottom 60% of the viewport.
- **Scroll Containment:** Body has `overflow-x: hidden`. No horizontal table scrolling is permitted; all data wraps within cards or vertical accordions.
- **Safe Area Insets:** Fixed bottom navigation has `padding-bottom: env(safe-area-inset-bottom, 16px)` to prevent iPhone home bar collision.
