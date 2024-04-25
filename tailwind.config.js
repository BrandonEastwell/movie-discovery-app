/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
    "src/app/**/*.{js,ts,jsx,tsx}",
    "src/app/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(179.86deg, #121212 5.21%, #141217 31.71%)",
      },
      colors: {
        "pearl-white": "#fefdfd",
        "spun-pearl": "#b1bebb",
        gray: {
          "100": "#fefdfd",
          "200": "#121212",
          "300": "rgba(254, 253, 253, 0.4)",
          "400": "rgba(254, 253, 253, 0.51)",
        },
        midnight: "#121212",
        silver: "#b1bebb",
        mediumslateblue: "#8566e0",
        gainsboro: "#d9d9d9",
        black: "#000",
        Purple: '#5F43B2',
      },
      gridTemplateColumns: {
        'layout': 'minmax(2rem, 15rem) 1fr',
      },
      gridTemplateRows: {
        'layout': 'minmax(1rem, 5rem) minmax(1rem, 2.5rem) 1fr',
      },
      spacing: {},
      fontFamily: {
        montserrat: ["Montserrat", 'sans-serif'],
        vt323: "VT323",
        poppins: "Poppins",
        robotomono: ["Roboto Mono", 'monospace'],
        michroma: "Michroma",
      },
      borderRadius: {
        "8xs": "5px",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      xl: "20px",
      "5xl": "24px",
      "17xl": "36px",
      "13xl": "32px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};