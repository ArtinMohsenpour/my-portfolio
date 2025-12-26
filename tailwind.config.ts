import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sanity/**/*.{js,ts,jsx,tsx,mdx}", // Ensure sanity paths are included
  ],
  theme: {
    extend: {
      // 1. ADD THIS ANIMATION SECTION
      animation: {
        meteor: "meteor 5s linear infinite",
      },
      // 2. ADD THIS KEYFRAMES SECTION
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      // ... keep your other extensions (colors, fonts) if any
    },
  },
  plugins: [],
};

export default config;
