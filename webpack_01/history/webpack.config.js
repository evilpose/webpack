// webpack 是node写出来的 node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    compress: true
  },
  optimization: { // 优化项
    minimizer: [
      new OptimizeCss(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [  // webpack插件数组
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {   // 模块
    rules: [  // 规则 css-loader 解析 @import
      // style-loader 把 css 插入到 header 中
      // loader 特点： 功能单一
      // loader 用法 字符串只用一个loader
      // 多个 loader 需要 []
      // loader 的顺序，默认是从右往左执行 从下到上执行
      // loader 还可以写成 对象方式 可参数
      {
        test: /\.css$/, use:[
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader'
        ]
      },
      {
        test: /\.less$/, use:[
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader', 'less-loader'
        ]
      }
    ]
  }
}