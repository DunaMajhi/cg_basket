/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kraft: {
          100: '#FDFBF7',
          200: '#F0EAD6', 
          DEFAULT: '#D2B48C',
          800: '#8D6E63', 
        },
        tribal: {
          clay: '#BC4A3C',
          turmeric: '#FBC02D',
          charcoal: '#2D2D2D',
          forest: '#33691E',
          mahua: '#5D4037',
        }
      },
      fontFamily: {
        heading: ['serif'], 
        body: ['sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/images/kraft-texture.png')",
      },
      boxShadow: {
        'pouch': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};