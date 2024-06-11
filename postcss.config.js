module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      // options
      viewportWidth: 390,
      include: /\.tsx$/
      // exclude: [/(\/|\\)(pc)(\/|\\)/],
    }
  },
}
