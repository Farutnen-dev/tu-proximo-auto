/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'toyota-red': '#EB0A1E',
        'toyota-red-dark': '#C00918',
        'toyota-gray': '#333333',
      },
    },
  },
  plugins: [],
} 