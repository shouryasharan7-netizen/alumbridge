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
        bg: {
          DEFAULT: '#eae8e4',
          dark: '#120f0a',
        },
        fg: {
          DEFAULT: '#120f0a',
          dark: '#fee9cf',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#1e0509',
        },
        crimson: {
          DEFAULT: '#97192c',
          dark: '#97192c',
        },
        orange: {
          DEFAULT: '#fc920d',
          hover: '#e6830b',
        },
        cream: {
          DEFAULT: '#faf8f5',
          secondary: '#fee9cf',
        },
        border: {
          DEFAULT: '#120f0a',
          dark: '#fee9cf',
        },
      },
      fontFamily: {
        display: ['Norwester', 'Impact', 'Arial Narrow', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Georgia Pro', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px var(--border-color)',
        'brutal': '3px 3px 0px 0px var(--border-color)',
        'brutal-md': '4px 4px 0px 0px var(--border-color)',
        'brutal-lg': '6px 6px 0px 0px var(--border-color)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-x': 'bounceX 1s infinite',
        'marquee': 'marquee 30s linear infinite',
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
        glow: {
          '0%': { boxShadow: '2px 2px 0px 0px var(--border-color)' },
          '100%': { boxShadow: '4px 4px 0px 0px var(--border-color)' },
        },
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
