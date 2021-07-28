module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono:["JetBrains MOno","monospace"]
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
