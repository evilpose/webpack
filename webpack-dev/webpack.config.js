let path = require('path');
class P {
  apply(compiler){
    console.log('start-emit');
    compiler.hooks.emit.tap('emit', function(params){
      console.log('emit');
    })
  }
};
class P1 {
  apply(compiler){
    console.log('start-afterPlugins');
    compiler.hooks.afterPlugins.tap('afterPlugins', function(params){
      console.log('afterPlugins');
    })
  }
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  modules: {
    rules: [
      {
        test: /\.less$/,
        use:[
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader')
        ]
      }
    ]
  },
  plugins: [
    new P(),
    new P1()
  ]
}