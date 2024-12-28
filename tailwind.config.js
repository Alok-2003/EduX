/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#77E4C8',
          DEFAULT: '#36C2CE',
          dark: '#478CCF',
        },
        accent: '#4535C1',
        dark: '#1A1A1A'
      }
    },
  },
  plugins: [],
};