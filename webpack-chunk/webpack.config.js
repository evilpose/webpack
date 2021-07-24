let path = require('path');
let HtmlWebpackPlguin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    splitChunks: {
      chunks: 'all', 
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '~', 
      // name: true,
      // cacheGroups: {}
    }
  },
  plugins: [
    new HtmlWebpackPlguin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
}