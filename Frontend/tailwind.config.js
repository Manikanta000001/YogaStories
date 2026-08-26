/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        display: ["Syne", "sans-serif"],
      },

      colors: {
        lightBg: "#F8F6F0",
        lightCream: "#EFE9DD",
        lightSage: "#718064",
        lightTerracotta: "#C97960",
        lightGold: "#D0A75A",
        lightCharcoal: "#242521",

        darkBg: "#080909",
        darkCharcoal: "#111313",
        darkForest: "#304133",
        darkSage: "#829274",
        darkCoral: "#D97860",
        darkGold: "#D1AA63",
        darkWhite: "#F4F1E9",
      },

      animation: {
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse-slow": "spin-reverse 35s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },

      keyframes: {
        "spin-reverse": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },

        pulseGlow: {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
      },
    },
  },

  plugins: [],
};