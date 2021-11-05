module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#FB6D62",
        secondary: "#DDDDDD42",
      },
      borderRadius: {
        circle: "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
