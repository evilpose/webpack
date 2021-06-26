
function loader(source){
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let current;
  let arr = ['let list = []'];
  while(current = reg.exec(source)){  // [matchUrl, g]
    let [matchUrl, g] = current;
    // console.log([matchUrl, g]);
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    pos = reg.lastIndex;
    // 把 g 替换成 require 的写法 => url(require('xxx'))
    arr.push(`list.push('url('+require(${g})+')')`);
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
  arr.push(`module.exports = list.join('')`)
  return arr.join('\r\n');
}

module.exports = loader;

// 这儿主要是用正则处理url()并拼接字符串，然后再吐出去