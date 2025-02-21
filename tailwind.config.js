/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 3px rgba(0,0,0,0.5)",
        md: "2px 2px 5px rgba(0,0,0,0.7)",
        lg: "3px 3px 7px rgba(0,0,0,0.9)",
      },
    },
  },
  plugins: [],
};
