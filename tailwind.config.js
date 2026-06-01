/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand base: deep navy-black instead of pure black so the whole
        // site (every bg-black / text-black usage) picks up the new theme.
        black: '#070c18',
        // Cool, navy-tinted neutral scale. Re-skins every bg-gray-* /
        // text-gray-* / border-gray-* across the site in one place.
        gray: {
          50: '#f4f7fc',
          100: '#e4ecf7',
          200: '#c6d3e6',
          300: '#9aacc8',
          400: '#8294b3',
          500: '#5d6e8c',
          600: '#3e4d68',
          700: '#283450',
          800: '#18223a',
          900: '#0e1730',
          950: '#0a0f24',
        },
        // Electric-blue accent pulled from the new logo.
        accent: {
          300: '#7cc3ff',
          400: '#56a8ff',
          500: '#2e8eff',
          600: '#1670e6',
          700: '#0f57b8',
        },
        primary: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#262626',
          700: '#171717',
          800: '#0a0a0a',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
