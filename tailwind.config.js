/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#db2777',
          pinkHover: '#be185d',
          pinkDark: '#9d174d',
          pinkLight: '#fdf2f8',
          pinkBorder: '#fbcfe8',
          blue: '#1d4ed8',
          orange: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
