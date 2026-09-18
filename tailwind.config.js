/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
        colors: {
            ivory: '#fdfbf7',
            deepgreen: '#0f3d30',
            tomato: '#e04836',
        },
        fontFamily: {
            editorial: ['"Playfair Display"', 'serif'],
            sans: ['"Inter"', 'sans-serif'],
        },
        aspectRatio: {
            '4/5': '4 / 5',
            '3/4': '3 / 4',
            '16/9': '16 / 9',
        }
    }
  },
  plugins: [],
}
