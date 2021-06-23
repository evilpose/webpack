function loader(source) { // loader参数就是源代码
  console.log('loader_3');
  return source;
};

module.exports = loader;