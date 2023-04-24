/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // ...
  content: ['node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bghome: "url('https://img.freepik.com/premium-photo/abstract-white-mosaic-tile-texture-background_293060-16321.jpg?w=1060')",
      },
      fontFamily: {
        snow: ["SNOW", "cursive"],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}