/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "HN": ["Helvetica", "sans-serif"],
        "Avenir": ["Avenir", "sans-serif"],
      }
    },
  },
  plugins: [],
}

