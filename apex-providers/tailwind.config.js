/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apex Brand Palette
        'apex-deep-blue': '#0F2B5B',
        'quantum-teal': '#00A3B5',
        'neutral-white': '#FFFFFF',
        'charcoal-gray': '#2D3436',
        'light-gray': '#F8F9FA',
        
        // Additional colors for verticals
        'education-gold': '#FFD700',
        'healthcare-red': '#DC2626',
        'manufacturing-gray': '#6B7280',
        'success-green': '#10B981',
        'warning-orange': '#F59E0B',
        'error-red': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}