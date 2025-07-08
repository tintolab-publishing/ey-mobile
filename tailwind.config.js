export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgBk': 'var(--bg-bk)',
        'bgGr': 'var(--bg-gray)',
        'bgLg': 'var(--bg-lightgray)',
        'bgSr': 'var(--bg-search)'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
      }
      addUtilities(newUtilities);
    }
  ],
}