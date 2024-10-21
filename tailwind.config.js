/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#131316',
        'dark-components': '#212126',
        'dark-primary-text': '#ffffff',
        'dark-secondary-text': '#9394a1',
        'white-primary-text': '#131316',
        'white-secondary-text': '#5e5f6e',
      },
      fontFamily: {
        inter: ['Inter']
      }
    },
  },
  plugins: [],
}

