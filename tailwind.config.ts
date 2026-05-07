import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#3BEA3B",
          dark: "#080808",
        },
      },
      fontFamily: {
        headline: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      fontSize: {
        /* +25% on the two small utility sizes used throughout */
        sm:   ["1.1rem",   { lineHeight: "1.625" }],
        base: ["1.15rem",  { lineHeight: "1.75"  }],
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan-line": {
          "0%":   { left: "-4px",  opacity: "0" },
          "5%":   { opacity: "1" },
          "95%":  { opacity: "0.6" },
          "100%": { left: "calc(100% + 4px)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "scan-line": "scan-line 4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
