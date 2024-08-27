import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        copy: ["Inter", "sans-serif"],
        quote: ["Inter", "sans-serif"],
        topline: ["Inter", "sans-serif"],
        button: ["Poppins", "sans-serif"],
        header: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      lineHeight: {
        6.5: "26px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        xs: "92px",
        sm: "204px",
        md: "315px",
        lg: "427px",
        xl: "538px",
        "2xl": "650px",
        "3xl": "762px",
        desktop: "1320px",
        "desktop-half": "660px",
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
        "3xlarge": "2560px",
        "4xlarge": "3840px",
      },
    },
  },
  plugins: [],
};
export default config;
