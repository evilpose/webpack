function loader(source) { // loader参数就是源代码
  console.log('loader_2');
  // console.log(source);
  return source;
};

module.exports = loader;