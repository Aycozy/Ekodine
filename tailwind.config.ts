import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F59E0B",
          foreground: "#FAFAF9",
        },
        accent: {
          DEFAULT: "#1C1917",
          foreground: "#FAFAF9",
        },
        background: "#FAFAF9",
        foreground: "#1C1917",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)"],
        heading: ["var(--font-playfair)"],
      },
      borderRadius: {
        xl: "1rem", // rounded-xl throughout
      },
    },
  },
  plugins: [],
};
export default config;
