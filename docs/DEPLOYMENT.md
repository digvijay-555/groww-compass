# Groww Compass — Production Deployment Record & Guide 🚀

**Product:** Groww Compass (Educational Investment Discovery Layer)  
**Version:** 1.0.0  
**Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6  
**Primary Hosting Platform:** Vercel (Production Static Site / SPA)  
**Repository:** `digvijay-555/fulcrum` (`/home/deceptor/code/groww-compass`)  
**Verified Build Status:** Passed (`npm run build` succeeds cleanly, producing `dist/`)  

---

## 1. Verified Deployment Status & Environmental Audit

| Item | Status | Verified Details |
| :--- | :--- | :--- |
| **Production Build (`dist/`)** | **PASSED** | Clean TypeScript compilation (`tsc`) and Vite bundling. Zero type errors. |
| **Automated Tests** | **PASSED** | All 10 Vitest test suites verified (100+ assertions). |
| **Secrets & Privacy Audit** | **PASSED** | Zero API keys, database credentials, or sensitive tokens committed. |
| **Routing Configuration** | **PASSED** | [`vercel.json`](file:///home/deceptor/code/groww-compass/vercel.json) committed with cleanUrls, SPA fallback rewrite, and HTTP security headers. |
| **Deployment Execution Status** | **READY / PENDING USER TRIGGER** | The AI assistant operates inside a sandboxed Linux Snap container (`antigravity-cli`), which restricts spawning child processes (`fork/exec bash: permission denied`). Interactive Vercel CLI login (`vercel login`) and cloud tokens cannot be executed or fabricated by the agent. Deployment must be triggered by the user via GitHub Vercel integration or local terminal Vercel CLI. |
| **Live Application URL** | **User-Assigned** | Upon linking the repository to Vercel (e.g. `https://groww-compass.vercel.app` or user-specific Vercel domain). |

---

## 2. Selected Hosting Platform: Vercel

Groww Compass is built as a single-page application (SPA) with client-side routing. **Vercel** was selected as the primary production hosting target because of its native support for Vite projects, edge global CDN delivery, automated preview deployments from git branches, and zero-configuration SPA history fallback routing through [`vercel.json`](file:///home/deceptor/code/groww-compass/vercel.json).

---

## 2. Pre-Deployment Verification Checklist

Before deploying any build to production, verify each of the following requirements:

1. **Clean Repository:** Verify that `.gitignore` excludes `node_modules/`, `dist/`, `.env*`, and IDE caches.
2. **Zero Secrets or API Keys:** Ensure no personal access tokens, private keys, database credentials, or client secrets are committed in source code.
3. **No Dev-Only Localhost References:** Ensure all links and routing use relative paths or verified Groww product destinations (`https://groww.in/...`).
4. **Local Build Passes:** Run `npm run build` to confirm TypeScript type-checking (`tsc`) and Vite bundling succeed without errors.
5. **Automated Tests Pass:** Run `npm test` to verify all 8 test suites pass.

---

## 3. Production Build Settings

Configure the following build settings in your hosting platform dashboard:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | 18.x or 20.x |

---

## 4. SPA Nested Routing & Configuration

Because Groww Compass uses `react-router-dom` with the HTML5 History API (`BrowserRouter`), direct URL navigation to nested paths (e.g. `https://domain.com/compare?a=stocks&b=equity-mf` or `https://domain.com/saved`) must not return a 404 error from the web server.

### A. Vercel Configuration (`vercel.json`)
The repository includes a production-tuned [`vercel.json`](file:///home/deceptor/code/groww-compass/vercel.json) that rewrites all incoming requests to `/index.html`:

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### B. Netlify Alternative (`_redirects` or `netlify.toml`)
If deploying on Netlify, add a `public/_redirects` file with:
```text
/*    /index.html   200
```

### C. Cloudflare Pages Alternative
If deploying on Cloudflare Pages, add `public/_routes.json` or use Single Page Application fallback mode in the Cloudflare dashboard.

---

## 5. Step-by-Step Deployment Instructions

### Method A: Deploy via Vercel Git Integration (Recommended)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `groww-compass` repository.
4. Verify the detected framework is **Vite**.
5. Leave the default build command (`npm run build`) and output directory (`dist`).
6. Click **"Deploy"**. Vercel will install dependencies, run the TypeScript build, and deploy the application to a high-speed global CDN.

### Method B: Deploy via Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Log in to your account:
   ```bash
   vercel login
   ```
3. Deploy to production from the project root:
   ```bash
   vercel --prod
   ```

---

## 6. How to Verify the Deployed Application

Perform the following smoke tests immediately after deployment:

### 1. Root & Zero-Flash Theme Verification
- Open the production domain (e.g. `https://your-domain.vercel.app/`).
- Verify that the app defaults to Dark Mode on first visit.
- Verify that no white flash occurs during page load.
- Toggle to Light Mode using the theme button in the header; verify high-contrast text and surfaces.

### 2. Nested Route Direct Access & Hard Reload
- Paste `https://your-domain.vercel.app/compare?a=stocks&b=equity-mf` directly into your browser address bar and press Enter.
- Confirm the page renders the comparison view immediately (no 404).
- Press `Ctrl + F5` (or `Cmd + Shift + R`) to hard-reload. Verify that the page reloads cleanly with Category 1 (Stocks) and Category 2 (Equity MF) selected.
- Repeat with `https://your-domain.vercel.app/learn?q=Diversification` and `https://your-domain.vercel.app/saved`.

### 3. Mobile Ergonomics & Viewport Emulation
- Open Chrome DevTools (`F12`) and enable mobile device emulation.
- Test at **320px** (iPhone SE), **390px** (iPhone 14/15/16), and **430px** (iPhone 15 Pro Max).
- Check that there is no horizontal scrollbar on the page (`overflow-x: hidden`).
- Check that the fixed bottom navigation does not cover the bottom buttons or cards (`pb-28 pb-safe`).

### 4. LocalStorage & Privacy Verification
- Bookmark a comparison in the Comparison Lab; verify the toast notification appears and the Saved tab badge increments to "1".
- Navigate to `/saved` and confirm the bookmarked card is present with date and summary.
- Add a personal note (e.g., "Retirement question"); verify it persists.
- Delete the comparison; verify the accidental-deletion modal prompts for confirmation.
- Inspect browser storage: open DevTools -> Application -> Local Storage. Verify only `groww_compass_theme`, `groww_compass_user_intent`, and `groww_compass_saved_comparisons` exist. Verify zero collection of financial credentials.

### 5. Prototype Ecosystem Handoff
- Navigate to `/explore`, tap "Learn More" on any category, and click the Groww destination button.
- Verify that the `PrototypeHandoffModal` opens with the Educational Prototype Notice, showing the official `https://groww.in/...` URL.
- Click "Continue" to verify it opens in a new browser tab with `noopener,noreferrer`.

### 6. Browser Console Audit
- Open DevTools Console and navigate across all pages (`/`, `/explore`, `/compare`, `/learn`, `/saved`).
- Verify that there are zero uncaught exceptions, zero 404 asset errors, and zero CSP violations.

---

## 7. Rollback & Troubleshooting

- **Instant Rollback:** If an issue is detected in production, navigate to the Vercel Dashboard -> Deployments -> locate the previous deployment -> click **"Promote to Production"** for instant 0-downtime rollback.
- **Route 404 on Refresh:** If refreshing returns a 404, verify that [`vercel.json`](file:///home/deceptor/code/groww-compass/vercel.json) is committed in the root directory and contains the `"rewrites"` array.
