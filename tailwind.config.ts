// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0099FF", // Thunder Client Blue
        dark: "#2D2D2D", // Dark Gray
        background: "#1E1E1E", // Background Black
        accent: "#007ACC", // Light Blue Accent
        white: "#FFFFFF",
        muted: "#BBBBBB",
      },
    },
  },
  plugins: [],
};

export default config;
