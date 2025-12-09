/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        accent: "#3abff8", // Your primary color
        primary: "#0d9488", // Secondary color
        secondary: "#7c3aed", // Complement color
        "base-100": "#f8fafc", // Light background
        "base-200": "#f1f5f9",
        "base-300": "#e2e8f0",
        "base-content": "#1f2937", // Text color
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // Use Daisy UI's built-in themes
  },
};
