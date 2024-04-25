/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
    "src/app/**/*.{js,ts,jsx,tsx}",
    "src/app/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'midnight': "#121212",
      'silver': "#b1bebb",
      'mediumslateblue': "#8566e0",
      'gainsboro': "#d9d9d9",
      'black': "#000",
    },
      gridTemplateColumns: {
        'layout': 'minmax(2rem, 25rem) 1fr',
      },
      gridTemplateRows: {
        'layout': 'minmax(1rem, 5rem) minmax(1rem, 2.5rem) 1fr',
      },
      spacing: {},
      fontFamily: {
        montserrat: ["Montserrat", 'sans-serif'],
        vt323: "VT323",
        poppins: "Poppins",
        robotomono: ["Roboto-Mono", 'sans-serif'],
        michroma: "Michroma"
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
  corePlugins: {
    preflight: false,
  },
};