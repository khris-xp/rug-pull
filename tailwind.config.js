/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#102C57',
        secondary: '#DAC0A3',
        accent: '#EADBC8',
        light: '#FEFAF6',
        hover: '#F5F5F5',
      },
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
