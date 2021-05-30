// import calc from './test';
/**
 * import 在 生产环境(production) 下 会自动去除掉没用的代码
 * tree-shaking
 * 把没用到的代码自动删除掉
 */


// es6 模块会把的结果 放到 default 上
// require 是不支持 tree-shaing 语法的
// let calc = require('./test');

// console.log(calc.default.sum(1,2));

// scope hosting 作用域提升 （生产环境）
// 在 webpack 中会自动省略 一些可以简化的代码 比如 d_my可以直接为5了
// 也会直接把方法放进bundle.js中不用以引用的方式去使用
let a_my = 1;
let b_my = 2;
let c_my = 2;
let d_my = a_my + b_my + c_my;
console.log(d_my + '----------');