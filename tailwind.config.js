/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    'bg': '#F7F9FD', // 背景颜色
    'bg-btn': 'rgba(0, 104, 255, 0.06)',
    'bg-btn-hover': 'rgba(0, 104, 255, 0.04)',
    'theme': '#34F1FF',
    'theme2': '#0068FF',
    screens: {
      "360": "360px",
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'main-gradient': 'linear-gradient(167deg, #c3f5fe 0%, #dbe9fd 27%, #f7f9fd 95%)',
        "header": "url('/home/headerBg.png')"
      },
      textColor: {
        "tran-gray": "rgba(0, 0, 0, 0.65)",
        'regal-blue': '#005ef9',
      },
      backgroundColor: {
        'regal-blue': '#005ef9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    //  backgroundRepeat: false,
  }
}

