import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#ffedd2',
        'cream-dark': '#f5d9a8',
        void: '#0d0d0d',
        charcoal: '#1f1f1f',
        'charcoal-light': '#2a2a2a',
        ash: '#9e9e9e',
        mist: '#5b7c99',
        hairline: '#e5e7eb',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        clay: '16px',
        'clay-lg': '24px',
        'clay-xl': '32px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'clay-sm': '0 2px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,237,210,0.08)',
        'clay-md': '0 4px 20px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,237,210,0.06)',
        'clay-lg': '0 8px 40px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,237,210,0.05)',
        'clay-cream': '0 4px 20px rgba(255,237,210,0.15), 0 2px 8px rgba(255,237,210,0.08)',
        'clay-hover': '0 12px 48px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,237,210,0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cream-glow': 'radial-gradient(ellipse at center, rgba(255,237,210,0.12) 0%, transparent 70%)',
        'hero-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-cream': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'scroll-indicator': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(8px)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'pulse-cream': 'pulse-cream 3s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
