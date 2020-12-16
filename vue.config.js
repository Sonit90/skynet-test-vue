const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/variables.scss";@import "@/scss/global.scss";@import "@/scss/mixins.scss";',
      },
    },
  },
};
