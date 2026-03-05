/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        jetBlack: "#060606",
        aircraftGrey: "#BFC7D5",
        warningRed: "#E63946",
        jetWhite: "#F1FAEE",
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hudPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease forwards',
        hudPulse: 'hudPulse 2s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
}

