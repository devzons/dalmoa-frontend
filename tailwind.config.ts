import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--color-primary-hover) / <alpha-value>)",

        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "secondary-hover": "rgb(var(--color-secondary-hover) / <alpha-value>)",

        // Indigo 계열
        premium: "#4f46e5",
        "premium-light": "#e0e7ff",
     

        featured: "#6366f1",
        "featured-light": "#eef2ff",

        sponsored: "#818cf8",
        "sponsored-light": "#eef2ff",
      },
    },
  },
  plugins: [],
};

export default config;