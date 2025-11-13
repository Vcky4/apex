/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "../../libs/ui-components/src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn-ui colors
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
        // Apex Brand Palette
        'apex-deep-blue': '#0F2B5B',
        'quantum-teal': '#00A3B5',
        'neutral-white': '#FFFFFF',
        'charcoal-gray': '#2D3436',
        'light-gray': '#F8F9FA',
        'executive-gold': '#D4AF37',
        'authority-purple': '#6B46C1',
        'caring-yellow': '#FCD34D',
        'student-green': '#10B981',
        'doctor-blue': '#3B82F6',
        'clinical-white': '#F9FAFB',
        'healthcare-red': '#EF4444',
        'patient-green': '#10B981',
        'caring-lavender': '#C4B5FD',
        'comforting-blue': '#60A5FA',
        'production-blue': '#2563EB',
        'output-orange': '#F97316',
        'quality-green': '#059669',
        'compliance-blue': '#0891B2',
        'maintenance-orange': '#EA580C',
        'reliability-purple': '#7C3AED',
        'industrial-gray': '#4B5563',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

