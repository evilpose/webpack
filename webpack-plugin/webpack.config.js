let path = require('path');
let DonePlugin = require('./plugin/DonePlugin');
let AsyncPlugin = require('./plugin/AsyncPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FileListPlugin = require('./plugin/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugin/InlineSourcePlugin');
let UploadPlugin = require('./plugin/UploadPlugin');

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
      match: /\.(js|css)$/
    }),
    new UploadPlugin({
      bucket: '',   // 上传到哪个资源上
      domin: '',    // 上传到哪个域名上
      accessKey: '',// 
      secretKey: '' // 
    })
  ]
}