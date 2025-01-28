/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        didone: ["Antic Didone", "serif"],
        bowlby: ["Bowlby One SC", "serif"],
      },
      colors: {
        primary: "#0F183E",
        secondary: "#2F5CF8",
        light: "#FFFFFF0F",
        dark: "#FFFFFFB3",
      },
    },
  },
  plugins: [],
};
