/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Editorial display serif — used for headlines throughout
        display: ['"Instrument Serif"', '"DM Serif Display"', 'serif'],
        // Clean grotesk for UI / body copy
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // ── Editorial studio palette ──────────────────────────
        // "brand" is remapped from SaaS blue/purple to the studio's
        // single deliberate accent blue so every existing
        // text-brand-*/bg-brand-*/border-brand-* utility across the
        // app automatically inherits the new art direction.
        brand: {
          50:  '#eef1ff',
          100: '#dce3ff',
          200: '#b6c2ff',
          300: '#8a9bff',
          400: '#5c72ff',
          500: '#3157FF',
          600: '#2645e6',
          700: '#1d36b8',
          800: '#182c93',
          900: '#152677',
          950: '#0d1747',
        },
        // Kept for compatibility with existing accent-* usages —
        // now a muted editorial rust instead of a neon orange glow.
        accent: {
          400: '#c46a3f',
          500: '#b5562b',
          600: '#96431f',
        },
        // Warm paper / ivory system — replaces the old near-black "dark" scale.
        paper: {
          DEFAULT: '#F5F3EE',
          50: '#FBFAF7',
          100: '#F5F3EE',
          200: '#EFEBE1',
          300: '#E7E2D5',
        },
        ink: {
          DEFAULT: '#111111',
          900: '#111111',
          800: '#1B1B1A',
          700: '#232322',
        },
        stone: {
          DEFAULT: '#6B6A65',
          400: '#8B8A84',
          500: '#6B6A65',
          600: '#54524D',
        },
        line: {
          DEFAULT: '#D8D5CE',
        },
        // "dark" kept as an alias to ink so any un-migrated bg-dark-900
        // references still render as the new near-black ink tone
        // instead of breaking the build.
        dark: {
          950: '#111111',
          900: '#111111',
          850: '#1B1B1A',
          800: '#1B1B1A',
          750: '#232322',
          700: '#232322',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-1': 'radial-gradient(at 40% 20%, hsla(228,100%,74%,0.06) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(20,40%,50%,0.05) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(228,100%,74%,0.04) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'reveal-up': 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 rgba(49,87,255,0)' },
          '100%': { boxShadow: '0 0 0 rgba(49,87,255,0)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        revealUp: {
          from: { opacity: 0, transform: 'translateY(100%)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-sm': 'none',
        'glow': 'none',
        'glow-lg': 'none',
        'card': '0 1px 2px rgba(17,17,17,0.04)',
        'card-hover': '0 12px 32px rgba(17,17,17,0.08)',
        'editorial': '0 24px 64px -16px rgba(17,17,17,0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
