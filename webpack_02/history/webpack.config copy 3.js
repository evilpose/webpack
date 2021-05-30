let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

// 1. cleanWebpackPlugin
// 2. copyWebpackPlugin
// 3. bannerPlugin 内置

module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
  // watch 的是 build 文件的生成
  watch:true,
  watchOptions: { // 监控的选项
    poll: 1000, // 每秒 问我1000次
    aggregateTimeout: 500, // 防抖
    ignored: /node_modules/ // 不需要监控的
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ]
}