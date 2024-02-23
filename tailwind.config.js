/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
    "src/app/**/*.{js,ts,jsx,tsx}",
    "src/app/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      },
      gridTemplateColumns: {
        'layout': '16rem  1fr',
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      gridTemplateRows: {
        'layout': '4rem 1fr',
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      spacing: {},
      fontFamily: {
        montserrat: "Montserrat",
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