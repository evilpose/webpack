console.log('hello');

// !：忽略normalloader
// -!：忽略preloader和normalloader
// !!：忽略所有loader（pre / noraml / post ）
// let str = require('!!inline-loader!./a.js');

// loader 默认是由两部分组成的 pitch normal

// class bh {
//   constructor(){
//     this.name = 'bh';
//   }
//   getName(){
//     return this.name;
//   }
// };

// let bu = new bh();
// console.log(bu.getName());


// import p from './111.jpg';
// let img = document.createElement('img');
// img.src = p;
// document.body.appendChild(img);

import './index.less';