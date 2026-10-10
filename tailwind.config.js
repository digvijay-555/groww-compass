/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        groww: {
          emerald: '#00D09C',
          'emerald-hover': '#00B386',
          'emerald-dark': '#008F6B',
          'emerald-subtle': 'rgba(0, 208, 156, 0.12)',
          'emerald-text': 'var(--brand-emerald-text)',
          'badge-bg': 'var(--brand-emerald-badge-bg)',
          'badge-border': 'var(--brand-emerald-badge-border)',
        },
        surface: {
          bg: 'var(--bg-primary)',
          card: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          hover: 'var(--bg-surface-hover)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          default: 'var(--border-default)',
          subtle: 'var(--border-subtle)',
        },
        semantic: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.14)',
        'modal': '0 20px 48px -10px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
