// let button = document.createElement('button');
// button.innerText = 'button'
// // vue 和 react 的懒加载都是这样的实现的

// button.addEventListener('click', function(params){
//   console.log('click');
//   // es6 草案中的语法 jsonp 实现动态加载文件
//   import('./source.js').then(data=>{
//     console.log(data.default);
//   });
// });

// document.body.appendChild(button);

import str from './source';
console.log(str);

if(module.hot){
  module.hot.accept('./source', ()=>{
    console.log('文件更新了');
    let a = require('./source');
    console.log(a.default);
  })
}