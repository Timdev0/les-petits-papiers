/* eslint global-require: "off" */
module.exports = {
  plugins: [
    require('postcss-preset-env')({ stage: 0 }),
    require('tailwindcss')(),
    require('autoprefixer')(),
  ],
};
