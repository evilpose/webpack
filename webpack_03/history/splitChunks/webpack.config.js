let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  optimization: {     // commonChunkPlugins
    splitChunks: {  // 分割代码块
      cacheGroups: {  // 缓存组
        common: { // 公共模块
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          priority: 1,  // 权重 先抽离权重高的
          test: /node_modules/, // 把node_modules引入多次的文件抽离出来
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  mode: 'production',  // production
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  module: {
    noParse: /jquery/,    // 不去解析jquery的依赖关系 提高速度
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}