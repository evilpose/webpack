function loader(source) { // loader参数就是源代码
  console.log('loader_1');
  return source;
};


module.exports = loader;

// module.exports.pitch = function (){
//   console.log('pitch');
//   return 'x'
// }