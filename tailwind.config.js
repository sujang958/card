module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu Mono", "monospace"],
      },
      colors: {
        mastercard: "#902100",
        visa: "#FCB702",
        discover: "#f38b00",
        unknown: "#fff",
      },
    },
  },
  plugins: [],
}
