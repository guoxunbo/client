const path = require('path');

module.exports = {
  entry: 'src/index.js',
  hash: true,
  publicPath: './',
  vendor: false,
  define: {
    ENV_MODE: JSON.stringify(process.env.ENV_MODE),
  },
  alias: {
    '@': path.resolve(__dirname, './src/'),
    '@components': path.resolve(__dirname, './src/components/'),
    '@utils': path.resolve(__dirname, './src/api/utils/'),
    '@const': path.resolve(__dirname, './src/api/const/'),
    '@api': path.resolve(__dirname, './src/api/'),
    '@layouts': path.resolve(__dirname, './src/layouts'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@properties': path.resolve(__dirname, './src/pages/Properties/'),
  },
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
  ],
};
