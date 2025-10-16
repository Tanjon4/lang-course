/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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

