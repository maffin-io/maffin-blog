import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      colors: {
        primary: colors.fuchsia,
        gray: colors.neutral,
      },
      animation: {
        typing: 'typing 2s steps(20)',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '40ch' },
        },
      },
    },
  },
  plugins: [],
}

