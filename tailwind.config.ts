import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Flex Variable"', ...defaultTheme.fontFamily.sans],
        primary: ["Raleway Variable", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#aa2f47",
        },
        secondary: {
          DEFAULT: "#039be5",
        },
        background: {
          DEFAULT: "#18181b",
        },
        footer: {
          DEFAULT: "#27272a",
        },
        omg: {
          DEFAULT: "#fafafa",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
