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
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'hard-yellow': '4px 4px 0px 0px #FFFF00',
      }
    },
  },
  plugins: [],
}
