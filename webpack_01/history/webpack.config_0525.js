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
  // optimization: { // 优化项
  //   minimizer: [
  //     new OptimizeCss(),
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true
  //     })
  //   ]
  // },
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
    rules: [  // 规则
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', {"legacy": true}],
              ['@babel/plugin-proposal-class-properties', {"loose": true}],
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
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