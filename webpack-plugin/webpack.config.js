let path = require('path');
let DonePlugin = require('./plugin/DonePlugin');
let AsyncPlugin = require('./plugin/AsyncPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new AsyncPlugin(),
    new DonePlugin()
  ]
}