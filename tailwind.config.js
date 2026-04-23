/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#02040a",
        card: "rgba(10, 15, 25, 0.4)",
        card2: "rgba(20, 25, 40, 0.45)",
        accent: "#00d2ff",
        secondary: "#9d50bb",
        violet: "#a78bfa",
        teal: "#2dd4bf",
        border: "rgba(255,255,255,0.05)",
        border2: "rgba(255,255,255,0.08)",
        muted: "#7c82a0",
        dimmed: "#454960",
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
