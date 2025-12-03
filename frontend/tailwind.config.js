/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        neonA: '#7B3FF2',
        neonB: '#00E0FF',
        neonC: '#FF2D75',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg,#7B3FF2 0%, #00E0FF 45%, #FF2D75 100%)',
        'neon-glass': 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      },
      boxShadow: {
        'neon-lg': '0 10px 30px rgba(123,63,242,0.18), 0 0 50px rgba(0,224,255,0.06)',
      },
    },
  },
  plugins: [],
};
