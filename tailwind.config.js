/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/*.tsx',
    './src/components/*.tsx'

  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7D47A5',
        'custom-red': '#ca5656'
      }
    }
  },
  plugins: []
}
