/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5C6BC0',
        },
        coral: '#FF6B6B',
        blue: '#4E9FF5',
        purple: '#7E57C2',
        teal: '#26A69A',
        success: '#66BB6A',
        warning: '#FFA726',
        error: '#EF5350',
        sidebar: '#202636',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
