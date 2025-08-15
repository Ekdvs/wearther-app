/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'home-bg': "url('images/home-bg.svg')",
        'card-bg': "url('images/card-circle.png')",
        'card-bg-1': "linear-gradient(147.75deg, #905AD4 -0.02%, #3330A5 98.99%)",
        'card-bg-2': "linear-gradient(147.75deg, #6A11CB 0%, #2575FC 100%)",
        'card-bg-3': "linear-gradient(180deg, #10B19C 0%, #4FC3F7 100%)",
        'card-bg-4': "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)",
        'card-bg-5': "linear-gradient(180deg, #22C55E 0%, #10B981 100%)",
      },
      boxShadow: {
        'city-card': '#00000099 1px 1px 15px',
        'city-card-hover': "#00000099 5px 10px 15px",
        'city-card-selected': "#00ff1199 0px 4px 15px",
      }
    },
  },
  plugins: [],
}

