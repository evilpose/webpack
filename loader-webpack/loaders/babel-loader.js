let babel = require('@babel/core');
let loaderUtils = require('loader-utils');  // 这是一个工具类

function loader(source) { // this loaderContext
  // 获取到 options 的 options
  let options = loaderUtils.getOptions(this);
  let cb = this.async(); 
  babel.transform(source, {
    ...options,
    sourceMap: true,
    filename: this.resourcePath.split('/').pop() // 文件名
  }, function(err, result){
    // 如果直接传一个值就报错处理
    cb(err, result.code, result.map);   // 异步
  })
  // return source;
}

module.exports = loader;


/**
 * 这里是使用了babel/core对源码进行配置项的处理，
 * 配置项是通过 loaderUtils 在 babel-loader 的 loader 的 options 中取出来的
 */