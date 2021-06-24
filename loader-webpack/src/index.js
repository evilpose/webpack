console.log('hello');

// !：忽略normalloader
// -!：忽略preloader和normalloader
// !!：忽略所有loader（pre / noraml / post ）
let str = require('!!inline-loader!./a.js');

// loader 默认是由两部分组成的 pitch normal