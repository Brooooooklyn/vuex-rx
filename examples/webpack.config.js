var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: 'vue-loader',
        query: {
          presets: ['es2015', 'react'],
          babelrc: false
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
  }
};
