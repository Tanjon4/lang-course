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
        // backround : "white",
        // foreground : "black",
        // primary: "#d89cf0ff",
        // text: "black",
        // dark:{
        //   backround : "black",
        //   foreground : "white",
        //   primary: "#8aa3eeff",
        //   text: "white",

        // }
        donezo: {
          50: "#F6FBF8",
          100: "#EAF7EE",
          200: "#C9EED4",
          300: "#98E2AB",
          400: "#40D06A",
          500: "#0A8A40", // primary deep green
          600: "#0a7a37",
          700: "#0b662f",
        }
      },
      boxShadow: {
        soft: '0 6px 18px rgba(15,23,42,0.06)',
        innersoft: 'inset 0 1px 0 rgba(255,255,255,0.02)'
      }
    },
  },
  plugins: [],
}

