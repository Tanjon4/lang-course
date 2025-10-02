/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    darkMode: ['selector', '[data-mode="dark"]'],
    extend: {
      colors :{
        backround : "white",
        foreground : "black",
        primary: "#d89cf0ff",
        text: "black",
        dark:{
          backround : "black",
          foreground : "white",
          primary: "#8aa3eeff",
          text: "white",

        }
      }
    },
  },
  plugins: [],
}

