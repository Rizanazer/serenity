module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: { 100: "#f2f2f2", 500: "#979697" },
        blue_gray: { 50: "#eaedf2" },
        black: { 900: "#000000", "900_0c": "#0000000c" },
        pink: { A400: "#ff0150" },
        white: { A700_01: "#fffcfc", A700: "#ffffff" },
        deep_purple: { A200: "#5e4ae3" },
      },
      fontFamily: { inter: "Inter" },
      boxShadow: { bs: "4px 4px  8px 0px #0000000c" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
