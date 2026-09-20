/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          sand: "#A58868",
          umber: "#6B513B",
          espresso: "#342A23",
          cream: "#F5F0E8",
          ivory: "#FCFAF6",
          oyster: "#DED3C5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
    },
  },
};

export default config;
