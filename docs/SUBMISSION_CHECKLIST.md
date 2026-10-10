# Groww Compass — Case-Study Submission Checklist & Narrative Worksheet 📋

**Document Version:** 1.0.0  
**Date:** October 2026  
**Product:** Groww Compass (Guided Investment Discovery & Comparison Layer)  
**Target Submission Format:** PDF / Markdown Case Study Document  

---

## 1. The Four Required Deliverables Checklist

The case-study brief specifies four mandatory submission components. Use this checklist to verify readiness before final submission:

| Deliverable | Requirement | Location / Reference | Status | Action Required by User |
| :--- | :--- | :--- | :--- | :--- |
| **Deliverable 1** | **One-Page Case-Study Narrative** (~300–700 words). Must be authored directly by the human applicant; AI-authored narrative is strictly prohibited by the brief. | Section 2 of this document contains the **Narrative Worksheet & Outline**. | ⏳ **PENDING USER AUTHORING** | Draft your 300–700 word narrative in your own voice using the Section 2 worksheet prompts. |
| **Deliverable 2** | **Actual Prompts Used** to create the tool, preserving substantive instructions and deviations. | [`docs/ACTUAL_PROMPTS.md`](file:///home/deceptor/code/groww-compass/docs/ACTUAL_PROMPTS.md) | ✅ **COMPLETE** | Review chronological prompt log; copy into your submission appendix or link to file. |
| **Deliverable 3** | **Evaluations Used to Test the Solution**, including test plans, real results, verified bug fixes, and environmental limitations. | [`docs/EVALUATION_PLAN.md`](file:///home/deceptor/code/groww-compass/docs/EVALUATION_PLAN.md) & [`docs/EVALUATION_RESULTS.md`](file:///home/deceptor/code/groww-compass/docs/EVALUATION_RESULTS.md) | ✅ **COMPLETE** | Reference test matrix (F1–F12, P1–P8, R1–R7, S1–S7) and documented defect resolutions (BUG-01 to BUG-08). |
| **Deliverable 4** | **Accessible Live Application URL**, with zero login gates and full public access. | [`docs/DEPLOYMENT.md`](file:///home/deceptor/code/groww-compass/docs/DEPLOYMENT.md) | ⏳ **PENDING USER TRIGGER** | Deploy to Vercel via GitHub or Vercel CLI (`vercel --prod`) and paste production URL below. |

---

## 2. Case-Study Narrative Worksheet & Authoring Outline

> [!IMPORTANT]
> **Strict Brief Rule:** The one-page case-study narrative must be written in **your own words** as the candidate. The evaluation panel assesses your product thinking, prioritization rationale, and personal takeaways. Below is a structured worksheet designed to help you synthesize the project effectively within the 300–700 word target.

### Section A: Understanding the Beginner-Investor Problem (~75–125 words)
*Prompts to answer:*
- What exact friction do Indian Gen Z and young adults (ages 20–26) face when entering the market?
- Why is frictionless account opening (Demat / UPI SIP) not enough to build confident investors?
- What happens when beginners encounter terms like NAV, expense ratio, or equity vs. debt without mental models?

*Verified Facts from the Project:*
- Indian fintechs have solved account-opening friction, but the **cognitive barrier** remains high.
- Beginners recognize instrument names but cannot differentiate what they actually own, what risks they take, or how fees compound.

---

### Section B: Scope Definition & Deliberate Exclusions (~75–125 words)
*Prompts to answer:*
- What did you deliberately choose **NOT** to build, and why?
- Why did you avoid building a full brokerage, automated robo-advisor, or expense tracker?
- Why did you cap the head-to-head comparison to 4 curated pairs instead of arbitrary multi-asset matrixes?

*Verified Facts from the Project:*
- **Deliberately Excluded:** No stock trading execution, no portfolio tracking, no personal expense logging, no guaranteed return promises, no algorithmic robo-advice, and zero collection of financial credentials (PAN/Aadhaar/Bank credentials).
- **Scope Boundary:** Kept strictly to pre-investment category discovery, trade-off comparisons across 8 standardized dimensions, and plain-English jargon busting.
- **Why 4 Curated Pairs:** Only pairs sharing a parallel structural basis (Stocks vs Equity MF, Equity MF vs Debt MF, Index Funds vs Equity MF, Index Funds vs ETFs) offer pedagogically valid comparisons. Unsupported cross-asset pairings provide educational alternatives instead of forced, misleading comparisons.

---

### Section C: The Core Solution — Investment Comparison Lab (~100–150 words)
*Prompts to answer:*
- What is the Investment Comparison Lab and how does it differentiate Groww Compass?
- How does the step-by-step flow (Screen 1: Goal -> Screen 2: Pair -> Screen 3: 5 Core Cards -> Detail Sheet) prevent beginner overwhelm?
- How did visual explanations (SVG concept diagrams, holding breakdown) replace wall-of-text fatigue?
- Why does the product explicitly refuse to declare any option as a "winner" or "universally best"?

*Verified Facts from the Project:*
- Single-decision step-by-step architecture: Screen 1 (Home, 3 distinct cards) -> Screen 2 (`/compare?step=goal`, picking 1 goal) -> Screen 3 (Sequential custom category picker) -> Screen 4 (5 primary cards + progressive disclosure for advanced dimensions).
- SVG diagrams visually contrast 1 single stock holding against a diversified 40+ stock basket.
- In-flow contextual education ("Why am I seeing this?") explains trade-offs without breaking user flow or losing comparison state.

---

### Section D: Ecosystem Support & Handoff (~50–100 words)
*Prompts to answer:*
- How does Groww Compass fit into the larger Groww ecosystem?
- How do users continue their journey once they understand the trade-offs?
- How is the transition handled transparently without misleading the user?

*Verified Facts from the Project:*
- Acts as a pre-transaction educational companion.
- External links point to verified Groww product endpoints (`https://groww.in/stocks`, `https://groww.in/mutual-funds`).
- Every outgoing click opens the `PrototypeHandoffModal`, disclosing that Compass is an educational discovery prototype and will open official Groww schemes in a new browser tab.

---

### Section E: What You Built & What You Learned from Testing (~100–150 words)
*Prompts to answer:*
- What did automated testing and visual auditing reveal during the build?
- How did real defect discovery (e.g. the bottom navigation overlap in `image.png` caused by CSS specificity) sharpen your engineering decisions?
- What are the real limitations today, and what would you explore in future iterations?

*Verified Facts from the Project:*
- **Key Engineering Fix:** Resolving `BUG-06` (the bottom navigation bar overlapping content and buttons in `image.png`), where `.pb-safe` declared after `@tailwind utilities` overrode `pb-28` to 20px, trapping action buttons behind the 84px navigation bar. Resolved with `calc(7.5rem + max(1.5rem, env(safe-area-inset-bottom, 1.5rem))) !important;` (144px clearance).
- **Visual Desktop Chassis:** Built an interactive smartphone preview frame (`MobileDevicePreview`) using CSS transforms (`[transform:translateZ(0)]`) for desktop viewing while retaining native responsive layouts on physical mobile viewports.
- **Testing Scale:** Authored 10 Vitest test suites (100+ assertions) covering F1–F12, P1–P8, flow redesign, and responsive layout constraints.
- **Future Enhancements:** Community feedback on terminology analogies, bilingual support (Hindi/Hinglish), and automated sync with future Union Budget tax policy updates.

---

## 3. Deployment & Access Permissions Checklist

| Item | Requirement | Verification Method | Pass? |
| :--- | :--- | :--- | :--- |
| **Publicly Accessible URL** | The URL must be accessible to evaluators without login, VPN, or password. | Open URL in an Incognito / Private window. | [ ] |
| **Zero Authentication Barrier** | App must open directly into Home view without requiring signup, phone OTP, or Google SSO. | Verify first visit lands directly on `/`. | [ ] |
| **Dark Mode Default** | App must load in dark mode for first-time visitors, with zero theme flash. | Clear browser storage and reload; verify dark theme. | [ ] |
| **Deep Route Direct Navigation** | Navigating directly to `/compare?a=stocks&b=equity-mf` or `/saved` must not 404. | Test URL refresh in browser; verified by `vercel.json` rewrites. | [ ] |
| **Mobile Viewport Usability** | Usable at 320px–430px mobile screen widths with zero horizontal page scroll. | Test DevTools mobile device toggle. | [ ] |
| **Bottom Navigation Clearance** | Buttons and disclaimers at the bottom of long lists must never be trapped under the navigation bar. | Scroll to bottom of `/explore` (Debt MF card); verify buttons are 84px clear. | [ ] |

---

## 4. Final Pre-Submission Verification Steps for the User

Follow these concrete steps before submitting your case study:

1. **Push Clean Git Working Tree:**
   ```bash
   git status
   git add .
   git commit -m "docs: finalize case study submission materials and verification audits"
   git push origin main
   ```
2. **Deploy to Vercel:**
   - Link repository on [vercel.com](https://vercel.com) or run `vercel --prod` in your terminal.
   - Record the resulting production URL (e.g. `https://groww-compass.vercel.app`).
3. **Verify Production URL Smoke Tests:**
   - Follow Section 6 of [`docs/DEPLOYMENT.md`](file:///home/deceptor/code/groww-compass/docs/DEPLOYMENT.md).
   - Test `/`, `/explore`, `/compare`, `/learn`, and `/saved`.
4. **Author Your One-Page Narrative:**
   - Use the worksheet in Section 2 above to write your 300–700 word narrative.
5. **Assemble Final Submission Package:**
   - One-page narrative (written by you).
   - Live URL link.
   - Link / reference to `docs/ACTUAL_PROMPTS.md`.
   - Link / reference to `docs/EVALUATION_RESULTS.md` and `docs/DEPLOYMENT.md`.
