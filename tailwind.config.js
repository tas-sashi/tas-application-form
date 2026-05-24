/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f0faf7',
          100: '#d8f3ec',
          200: '#b2e6d9',
          300: '#7dd1bf',
          400: '#45b5a0',
          500: '#2a9986',
          600: '#1e7d6c',
          700: '#186458',
          800: '#164f47',
          900: '#14423c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}