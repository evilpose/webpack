console.log('hello');

// -! 不会让文件 再去通过pre + normal loader 来处理了
// ! 没有 normal
// !! 什么都没 只剩行列的
let str = require('!!inline-loader!./a.js');


// loader 默认是由两部分组成的 pitch normal