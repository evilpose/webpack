let loaderUtils = require('loader-utils');

function loader(source){
  // 我们可以在style-loader中导出一个脚本
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `
  return str;
}

// 在 style-loader 上写了 pitch 
// style-loader less-loader!css-loader/./index.less
loader.pitch = function(remainingRequest){
  // 让 style-lodaer 去处理 less-loader!css-loader!/./index.less
  // require 路径 返回的就算 css-loader 处理好的结果
  // require('css-loader!less-loader!index.less')
  // 这儿就是到style-pitch这儿之后就不正常处理下面的东西，而去直接用行内loader的形式去处理，然后拿到处理完之后的数据，用 require去引用
  let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `
  return str;
}

module.exports = loader;