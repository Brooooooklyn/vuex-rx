const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vuex-observable': path.join(__dirname, '..', 'dist'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [path.resolve(process.cwd(), 'node_modules')]
  },
  devServer: {
    port: 8080
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
  ]
}
