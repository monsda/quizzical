/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blackIndigo': '#293264',
        'incorrectRed' : '#F8BCBC',
        'correctGreen' : '#94D7A2',
        'selectedColor' : '#D6DBF5',
        'indigoButton' : '#4D5B9E',
        'whiteText' : '#F5F7FB'
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Karla: ['Karla', 'sans-serif']
      }
    },
  },
  plugins: [],
}
