let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

// 1. cleanWebpackPlugin
// 2. copyWebpackPlugin
// 3. bannerPlugin 内置 版权声明插件 插入到js文件的最前面的注释中

module.exports = {
  mode: 'production',
  devServer: {
    // 1.
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   } // 配置了一个代理
    // },
    // 2. 前端只想单传赖模拟数据
    // before(app) {  // 提供方法 钩子
    //   app.get('/user', (req, res) => {
    //     res.send({
    //       name: 'bu-before'
    //     })
    //   });
    // }
    // 3. 有服务端 不用代理来处理 能不能再服务端中启动webpack 端口用服务端端口
  },
  entry: {
    home: './src/index.js',
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
    }),
    new CleanWebpackPlugin('./dist'),
    new CopyWebpackPlugin([
      {
        from:'./doc',
        to: './'
      }
    ]),
    new webpack.BannerPlugin('make 2021 by bu')
  ]
}