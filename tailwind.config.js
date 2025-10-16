/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      padding: {
        paddingPC: "var(--paddingPC)",
        paddingPhone: "var(--paddingPhone)",
        padding: "var(--padding)",
      },
      colors: {
        main: "var(--main)",
        second: "var(--second)",
        mainHover: "var(--mainHover)",
        secondHover: "var(--secondHover)",
        wt: "var(--wt)",
        blk: "var(--blk)",
        grey: "var(--grey)",
        whiteHover: "var(--whiteHover)",
      },
      fontFamily: {
        A: ["Satoshi", "sans-serif"],
        B: ["SF Pro Display", "sans-serif"],
        C: ["Boska", "sans-serif"],
      },
    },
  },
  plugins: [],
};
