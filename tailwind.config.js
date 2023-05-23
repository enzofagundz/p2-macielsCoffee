/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*.html'],
  theme: {
    extend: {
      colors: {
        'bg': '#EBEEF0',
        'bg-contrast': '#CCD4D9'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

