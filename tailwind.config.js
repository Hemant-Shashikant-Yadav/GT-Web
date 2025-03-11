/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8B5CF6',
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
        },
        secondary: {
          light: '#818CF8',
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
        background: '#F3F4F6',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        '11': '2.75rem',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};