/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // ...
  content: ['node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bghome: "url('https://i.pinimg.com/originals/94/51/6c/94516cc63d94e695bc255da865c251c4.gif')",
        bglogin: "url('/src/bg@2x.png')"
      },
      fontFamily: {
        gsr: ["Grantha Sangam MN", "Regular"],
        dcb: ["DIN Condensed", "Bold"],
      },
      backgroundOpacity: {
        '10': '0.1',
        '20': '0.2',
        '95': '0.95',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}