/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#747bff',
        mainDark: '#646cff',
        darkGrey: '#242424',
        lightGrey: '#e0e0e0',
      }
    },
  },
  plugins: [],
}

