/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#475b4c",
          50: "#f0f4f1",
          100: "#d1e8d5",
          200: "#b5ccb9",
          300: "#8fa99a",
          400: "#6b8a75",
          500: "#475b4c",
          600: "#374b3d",
          700: "#2a3a2f",
          800: "#1e2921",
          900: "#0c1f13",
        },
        warm: {
          DEFAULT: "#f4dfcb",
          50: "#fefcfa",
          100: "#fbf9f6",
          200: "#f5f3f0",
          300: "#f0edea",
          400: "#eae8e5",
          500: "#dcdad7",
          600: "#f4dfcb",
          700: "#d7c3b0",
          800: "#6b5c4c",
          900: "#241a0e",
        },
        ink: {
          DEFAULT: "#1b1c1a",
          muted: "#434843",
          faint: "#737873",
          border: "#c3c8c1",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1120px",
      },
    },
  },
  plugins: [],
};
