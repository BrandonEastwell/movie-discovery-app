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
        'layout': 'auto 1fr',
      },
      gridTemplateRows: {
        'layout': 'auto auto 1fr',
      },
      fontFamily: {
        montserrat: ["Montserrat", 'sans-serif'],
        vt323: "VT323",
        poppins: "Poppins",
        robotomono: ["Roboto-Mono", 'sans-serif'],
        michroma: "Michroma",
        iconsolata: ["Inconsolata", 'monospace']
      },
      borderRadius: {
        "8xs": "5px",
      },
    },
  corePlugins: {
    preflight: false,
  },
};