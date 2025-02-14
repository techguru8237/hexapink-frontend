import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: "#333333",
        green: "#39AC39",
        pink: "#FF6699",
        red: "#BF4040",
        "light-red-1": "#F2D9D9",
        "light-red-2": "#FCF7F7",
        "light-pink": "#FFE5EE",
        "light-dark": "#666666",
        "light-gray": "#FBFBFE",
        "light-gray-1": "#ECECF9",
        "light-gray-2": "#F7F7FC",
        "light-gray-3": "#D9D9F2",
        "dark-blue": "#4040BF",
        "dark-red": "#BF4040",
        "light-green-1": "#D9F2D9",
        "light-green-2": "#F7FCF7",
      },
      fontFamily: {
        "redacted-script": ["Redacted Script", "cursive"],
        kanit: ["Kanit", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} as Config;
