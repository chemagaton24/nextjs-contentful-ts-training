import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mustard: "#f4e640",
        gray: {
          "400": "#BBB",
          "500": "#777",
        },
      },
      fontSize: {
        "3xl": [
          "1.75rem",
          {
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
