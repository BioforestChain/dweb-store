/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'placeholder': "url('/src/media/placeholder.svg')",
      }
    },
  },
  plugins: [],
};
