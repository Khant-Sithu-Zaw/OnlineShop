/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'red', fill: 'white' },
        }
      },
      animation: {
        blink: 'blink 0.1s'
        
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

