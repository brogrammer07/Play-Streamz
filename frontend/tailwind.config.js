/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        900: "#D48F2F",
        800: "#DF9B3C",
        700: "#EDAA4B",
        600: "#FAB95E",
        500: "#FECA81",
        400: "#FFD9A3",
        300: "#FFE8C7",
      },
      neutral: {
        900: "#70716F",
        800: "#888887",
        700: "#A4A4A4",
        600: "#BEBEBE",
        500: "#DCDCDC",
        400: "#EDEDED",
        300: "#FFFFFF",
      },
      yellow: {
        900: "#AD8959",
        700: "#BFA27A",
        500: "#D5BA96",
        300: "#EBDAC2",
      },
      red: {
        900: "#921E1E",
        700: "#A01819",
        500: "#B82F30",
        300: "#CF4142",
      },
      black: {
        900: "#0F0F0D",
        800: "#252522",
        700: "#333333",
        600: "#4B4B45",
        500: "#5E5E54",
        400: "#78786F",
      },
    },
    borderRadius: {
      sm: "12px",
      md: "6px",
      lg: "10px",
      xl: "26px",
    },
    fontFamily: {
      "eb-garamond": ["EB Garamond", "serif"],
      "open-sans": ["Open Sans", "sans-serif"],
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "40px",
    },
    lineHeight: {
      1: "125%",
      2: "150%",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      "semi-bold": 600,
      bold: 700,
    },
  },
  plugins: [],
};
