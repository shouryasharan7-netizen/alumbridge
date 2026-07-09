/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f2f8',
          100: '#dae0ed',
          200: '#b5c1db',
          300: '#8a9cc5',
          400: '#5f77af',
          500: '#3d5a96',
          600: '#1B2A4A',
          700: '#152238',
          800: '#0f1a2c',
          900: '#0a1220',
        },
        crimson: {
          50: '#fdf2f4',
          100: '#fbe5e9',
          200: '#f5cbd3',
          300: '#eda8b6',
          400: '#e07a8f',
          500: '#c94f68',
          600: '#8B1A2B',
          700: '#6e1522',
          800: '#55101a',
          900: '#3d0c13',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d5',
          200: '#f4dfa8',
          300: '#edca73',
          400: '#D4AF37',
          500: '#b8962e',
          600: '#9a7c26',
          700: '#7d641f',
          800: '#614e18',
          900: '#463911',
        },
        cream: '#FAF8F5',
        parchment: '#F5F0EA',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
