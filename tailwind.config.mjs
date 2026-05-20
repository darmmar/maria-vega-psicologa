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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.DEFAULT"),
            "--tw-prose-headings": theme("colors.ink.DEFAULT"),
            "--tw-prose-lead": theme("colors.ink.muted"),
            "--tw-prose-links": theme("colors.sage.700"),
            "--tw-prose-bold": theme("colors.ink.DEFAULT"),
            maxWidth: "none",
            h2: {
              fontFamily: theme("fontFamily.display").join(", "),
              fontSize: "1.875rem",
              fontWeight: "600",
              marginTop: "2.5rem",
              marginBottom: "1rem",
              lineHeight: "1.3",
              color: theme("colors.ink.DEFAULT"),
            },
            h3: {
              fontFamily: theme("fontFamily.display").join(", "),
              fontSize: "1.5rem",
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: "0.75rem",
              lineHeight: "1.4",
              color: theme("colors.ink.DEFAULT"),
            },
            h4: {
              fontFamily: theme("fontFamily.display").join(", "),
              fontSize: theme("fontSize.lg")[0],
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.8",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: theme("fontSize.3xl")[0],
              marginTop: "3rem",
              marginBottom: "1.25rem",
            },
            h3: {
              fontSize: theme("fontSize.2xl")[0],
              marginTop: "2.5rem",
              marginBottom: "1rem",
            },
            p: {
              lineHeight: "1.85",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
