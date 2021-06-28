let path = require('path');
let DonePlugin = require('./plugin/DonePlugin');
let AsyncPlugin = require('./plugin/AsyncPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FileListPlugin = require('./plugin/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugin/InlineSourcePlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FileListPlugin({
      filename: 'list.md'
    }),
    new InlineSourcePlugin({
      test: /\.(js|css)$/
    })
  ]
}