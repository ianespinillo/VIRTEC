import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors:{
        "virtec-blue-dark": "#0C1A2F",
        "virtec-blue-light": "#6AB0E7",
        "virtec-orange": "#FF8C00"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config