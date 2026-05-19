/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e4",
          200: "#bae5cc",
          300: "#8dd1ab",
          400: "#5ab585",
          500: "#369a65",
          600: "#267b50",
          700: "#1f6240",
          800: "#1c4e35",
          900: "#19402d",
          950: "#0d2419",
        },
        warm: {
          50: "#fdf8f0",
          100: "#faeedd",
          200: "#f4d9b5",
          300: "#ecbf82",
          400: "#e29e4d",
          500: "#d9832a",
          600: "#c96b1f",
          700: "#a7521b",
          800: "#86421c",
          900: "#6d3719",
          950: "#3a1b0b",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
