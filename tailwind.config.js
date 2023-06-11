/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        dance :   ["'Dancing Script', cursive"],
        josefin : ["'Josefin Sans', sans-serif"]
      }
    },
  },
  plugins: [],
}