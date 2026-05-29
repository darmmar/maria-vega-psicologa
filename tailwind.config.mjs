import typography from "@tailwindcss/typography";

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
        blush: {
          DEFAULT: "#c08d76",
          50: "#faf5f3",
          100: "#f5ece8",
          200: "#eeddd4",
          300: "#e2c9bd",
          400: "#d3ad9a",
          500: "#c08d76",
          600: "#a9725b",
          700: "#8f5945",
          800: "#754635",
          900: "#61382b",
        },
        ink: {
          DEFAULT: "#1b1c1a",
          muted: "#434843",
          faint: "#737873",
          border: "#c3c8c1",
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1120px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.muted"),
            "--tw-prose-headings": theme("colors.ink.DEFAULT"),
            "--tw-prose-links": theme("colors.sage.DEFAULT"),
            "--tw-prose-bold": theme("colors.ink.DEFAULT"),
            "--tw-prose-bullets": theme("colors.sage.DEFAULT"),
            maxWidth: "none",
          },
        },
      }),
      boxShadow: {
        premium: "0 4px 20px -2px rgba(71, 91, 76, 0.05), 0 2px 8px -1px rgba(71, 91, 76, 0.03)",
        "premium-hover": "0 12px 30px -4px rgba(71, 91, 76, 0.12), 0 4px 12px -2px rgba(71, 91, 76, 0.06)",
        soft: "0 2px 12px 0 rgba(0, 0, 0, 0.03)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [typography],
};