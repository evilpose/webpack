let loaderUtils = require('loader-utils');
let validate = require('schema-utils');  // 对传过来的参数进行校验是否正确
let fs = require('fs');

function loader(source){
  this.cacheable && this.cacheable(); // 如果有缓存使用缓存
  // this.cacheable(false)  不使用缓存
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  let schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      filename: {
        type: 'string'
      }
    }
  }
  validate.validate(schema, options, 'banner-loader');
  if (options.filename) {
    this.addDependency(options.filename); // 添加文件依赖 watch 监听
    fs.readFile(options.filename, 'utf8', function(err, data){
      cb(err, `/** ${data} **/ ${source}`)
    })
  } else {
    cb(null, `/** ${options.text} **/ ${source}`)
  }
  // return sources;
}

module.exports = loader;
