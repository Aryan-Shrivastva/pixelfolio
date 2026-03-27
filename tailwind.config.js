/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFF00',
        background: '#05050A',
        surface: '#11111A',
        text: '#FFFFFF',
        muted: '#888888',
        accent: '#FF003C',
        cardline: '#2A2A2A' // Darker grey for card borders
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'monospace'],
        vt323: ['"VT323"', 'monospace']
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'hard-yellow': '4px 4px 0px 0px #FFFF00',
      }
    },
  },
  plugins: [],
}
