// webpack 是node写出来的 node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { web } = require('webpack');

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
    // publicPath: 'https://bbb.bb/'
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
      filename: 'css/main.css'
    }),
    // new webpack.ProvidePlugin({   // 在每个模块中都注入 $
    //   $: 'jquery'
    // }),
    new BundleAnalyzerPlugin()
  ],
  externals: {
    jquery: '$'
  },
  module: {   // 模块
    rules: [  // 规则
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)/,
        // 如果大于 limit 是用file-loader产生真实的图片
        use: {
          loader:'url-loader',
          options: {
            esModule: false,
            limit:1,
            outputPath: 'img/',
            publicPath: 'https://bbb.bb/'
          }
        },
      },
      {
        test: require.resolve('jquery'),
        use: {
          loader: 'expose-loader?$'
        }
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre'  // 强制置前执行
      //     }
      //   },
      // },
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
              ["@babel/plugin-transform-runtime",{ "regenerator": true }]
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