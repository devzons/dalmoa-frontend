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

        premium: "rgb(var(--color-premium) / <alpha-value>)",
        "premium-light": "rgb(var(--color-premium-light) / <alpha-value>)",

        featured: "rgb(var(--color-featured) / <alpha-value>)",
        "featured-light": "rgb(var(--color-featured-light) / <alpha-value>)",

        sponsored: "rgb(var(--color-sponsored) / <alpha-value>)",
        "sponsored-light": "rgb(var(--color-sponsored-light) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;