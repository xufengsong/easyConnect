import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'accessible-sm': ['1.125rem', { lineHeight: '1.6' }],
        'accessible-base': ['1.25rem', { lineHeight: '1.6' }],
        'accessible-lg': ['1.5rem', { lineHeight: '1.5' }],
        'accessible-xl': ['1.875rem', { lineHeight: '1.4' }],
        'accessible-2xl': ['2.25rem', { lineHeight: '1.3' }],
        'accessible-3xl': ['3rem', { lineHeight: '1.2' }],
        'hero': ['4rem', { lineHeight: '1.1' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.2' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Golden Hour palette
        peach: {
          DEFAULT: "hsl(var(--peach))",
          light: "hsl(var(--peach-light))",
          dark: "hsl(var(--peach-dark))",
        },
        golden: {
          DEFAULT: "hsl(var(--golden))",
          light: "hsl(var(--golden-light))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          light: "hsl(var(--rose-light))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          warm: "hsl(var(--cream-warm))",
        },
        amber: "hsl(var(--amber))",
        terracotta: "hsl(var(--terracotta))",
        sage: "hsl(var(--sage))",
        // Legacy colors for compatibility
        coral: "hsl(var(--peach))",
        "coral-hover": "hsl(var(--peach-dark))",
        teal: "hsl(var(--terracotta))",
        "teal-light": "hsl(var(--sage))",
        "cream-dark": "hsl(var(--cream-warm))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "pill": "9999px",
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 30px -4px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 12px 40px -8px rgba(0, 0, 0, 0.1)',
        'glow-peach': '0 0 40px rgba(240, 140, 100, 0.25)',
        'glow-golden': '0 0 40px rgba(245, 180, 80, 0.25)',
        'warm': '0 4px 24px -4px rgba(200, 100, 60, 0.15)',
        'warm-lg': '0 8px 32px -6px rgba(200, 100, 60, 0.2)',
        // Legacy shadows
        'glow-coral': '0 0 30px rgba(240, 140, 100, 0.3)',
        'glow-teal': '0 0 30px rgba(150, 100, 80, 0.2)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        "wave": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "wave": "wave 1s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;