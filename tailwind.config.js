/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/src/**/*.{js,ts,jsx,tsx,html}',
    './libs/**/src/**/*.{js,ts,jsx,tsx,html}',
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
        
        // Additional brand colors
        'executive-gold': '#D4AF37',
        'authority-purple': '#6B46C1',
        'caring-yellow': '#FCD34D',
        'student-green': '#10B981',
        'doctor-blue': '#3B82F6',
        'clinical-white': '#F9FAFB',
        'healthcare-red': '#EF4444',
        'production-blue': '#2563EB',
        'output-orange': '#F97316',
        'quality-green': '#059669',
        'compliance-blue': '#0891B2',
        'maintenance-orange': '#EA580C',
        'reliability-purple': '#7C3AED',
      },
    },
  },
  plugins: [],
};
