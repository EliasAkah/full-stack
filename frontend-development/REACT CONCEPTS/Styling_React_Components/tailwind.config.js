/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pacifico', 'cursive'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#9a3412',
        secondary: '#a39191',
        tertiary: '#6b7280',
        fourth: '#f0b322',
        fifth: '#1f2937',
        sixth: '#f0920e',
        seventh: '#d1d5db'
      },
      backgroundImage:{
        'custom-gradient': 'linear-gradient(180deg, #474232 0%, #28271c 100%)',
      },
      bacgroundColor:{
        'second-color': '#f0b322',
        'third-color': '#f0920e',
      }
    },
  },
  plugins: [],
}

