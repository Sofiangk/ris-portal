/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1E3A', // Slightly lighter and less intense navy
        'navy-light': '#1A2F4A', // A lighter navy for hover or backgrounds
        'navy-lighter': '#22395A', // A soft navy for contrast against darker elements
        'bloody-red': '#D90429', // A deep crimson red for accents, less harsh than pure red
        'bloody-red-light': '#EF233C', // A lighter version of crimson red
        gold: '#F4C430', // A softer, richer gold for primary accents
        'gold-light': '#F8D56A', // A pale gold for backgrounds or subtle highlights
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
};
