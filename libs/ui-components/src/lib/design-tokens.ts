/**
 * Apex Providers Design Tokens
 * Version 4.0 & 5.0 - Universal Design System
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    'apex-deep-blue': '#0F2B5B',
    'quantum-teal': '#00A3B5',
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    'charcoal-gray': '#2D3436',
    'light-gray': '#F8F9FA',
  },
  
  // Role-Based Colors
  executive: {
    gold: '#D4AF37',
    navy: '#0F2B5B',
  },
  
  education: {
    'authority-purple': '#6B46C1',
    'academic-gold': '#D4AF37',
    'student-green': '#10B981',
    'caring-yellow': '#FCD34D',
  },
  
  healthcare: {
    'executive-navy': '#0F2B5B',
    'healthcare-red': '#EF4444',
    'clinical-white': '#F9FAFB',
    'doctor-blue': '#3B82F6',
    'caring-lavender': '#C4B5FD',
    'patient-green': '#10B981',
    'comforting-blue': '#60A5FA',
  },
  
  manufacturing: {
    'industrial-gray': '#6B7280',
    'efficiency-green': '#10B981',
    'production-blue': '#2563EB',
    'output-orange': '#F97316',
    'quality-green': '#059669',
    'compliance-blue': '#0891B2',
    'maintenance-orange': '#EA580C',
    'reliability-purple': '#7C3AED',
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};
