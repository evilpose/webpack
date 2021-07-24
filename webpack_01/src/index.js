// webpack 打包我们的图片
// 1 在js中创建图片赖引入
// 2 把图片引入，返回的结果是一个新的图片地址
// file-loader 默认会在内部生成一张图片 到 build 目录下
// 把生成的图片的名字返回回来
import './index.css'
import logo from './img/img.jpg';
console.log(logo);
let image = new Image();
image.src = logo;
document.body.appendChild(image)

import $ from 'jquery'
console.log($);

// 2 在css引入  bgc(url)
// 3 <img src="" />
// 4 

// import $ from 'jquery'; 
// // expose-loader 暴露 全局的 loader 内联的 loader
// // pre 前面执行的 loader   normal 普通loader  内联loader  后置 postloader
// console.log($); // 在每个模块注入 $ 对象
// console.log(window.$);

/**
 * 1 expose-loader 暴露到 window 上
 * 2 providePlugin 给每个人提供一个 $
 * 3 引入不打包
 */


// let str = require('./a.js');

// console.log(str);

// // require('./index.css');

// // require('./index.less');

// require('@babel/polyfill');


// let fn = () => {
//   console.log('log')
// }

// fn()

// @log
// class A{
//   a = 1;
// }
// let a = new A();
// console.log(a.a);

// function log(target) {
//   console.log(target, '23');
// }


// 'aaaa'.includes('a')