/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#3498DB',
        background: '#ECF0F1',
      },
    },
  },
  plugins: [],
};