module.exports = {
  entry: 'src/index.js',
  hash: true,
  publicPath: './',
  vendor: false,
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
  ],
};
