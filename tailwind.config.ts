import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: {
          light: "#ffffff",
          dark: "#1a1a1a",
        },
        text: {
          light: "#000000",
          dark: "#ffffff",
        },
        // Add more colors as needed
      },
      boxShadow: {
        'dark-md': '0 10px 15px -3px rgba(0, 0, 0, 0.9), 0 4px 6px -2px rgba(0, 0, 0, 0.4), 0 0 8px rgba(255, 255, 255, 0.6)',
        'dark-lg': '0 15px 25px -5px rgba(0, 0, 0, 0.9), 0 8px 10px -4px rgba(0, 0, 0, 0.4), 0 0 12px rgba(255, 255, 255, 0.8), 0 20px 30px -10px rgba(0, 0, 0, 0.8)'
        // Add other custom shadows if needed
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      boxShadow: ['dark'],
      // Extend other utilities for dark mode
    },
  },
  plugins: [],
};
export default config;
