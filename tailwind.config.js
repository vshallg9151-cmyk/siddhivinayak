/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',      // Royal Blue
          blueHover: '#1D4ED8',
          navy: '#0F172A',      // Dark Navy
          navyLight: '#1E293B',
          gold: '#D4AF37',      // Luxury Gold
          goldLight: '#F3E5AB',
          goldHover: '#B59325',
          bgLight: '#F8FAFC',    // Light Gray Card BG
          textDark: '#111827',   // Dark Gray Text
          slateGray: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(15, 23, 42, 0.15)',
        'luxury-gold': '0 10px 30px -5px rgba(212, 175, 55, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #B59325 100%)',
        'blue-gradient': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F172A 0%, #020617 100%)',
      }
    },
  },
  plugins: [],
}
