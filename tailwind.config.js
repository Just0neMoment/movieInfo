/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      "white": "#e4e4e4",
      "primary": "ff4848",
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}