/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4F46E5', // Primary Color
          600: '#3B82F6', // Secondary Color
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10B981', // Accent Color
          600: '#059669',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          700: '#334155', // Border Color
          800: '#1E293B', // Card Background
          900: '#0F172A', // Background Color
          950: '#020617',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        metrics: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
      },
    },
  },
  plugins: [],
}
