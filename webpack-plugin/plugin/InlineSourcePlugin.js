// 把 外链 的标签 变成 内联的
const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineSourcePlugin{
  constructor(match){
    this.reg = match.match; // 正则
  }

  processTag(tag, compilation){ // 处理某一个标签的
    let newTag, url;
    if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
      newTag = {
        tagName: 'style',
        atrributes: { type: 'text/css'}
      }
      url = tag.attributes.href;
    };
    if(tag.tagName === 'script' && this.reg.test(tag.attributes.src)){
      newTag = {
        tagName: 'script',
        attributes: { type: 'application/javascript' }
      }
      url = tag.attributes.src;
    };
    if(url){
      newTag.innerHTML = compilation.assets[url].source();  // 文件内容 放到innerHTML属性上
      delete compilation.assets[url];
    }
    return newTag;
  }

  processTags(data, compilation){  // 处理引入标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach((headTag)=>{
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach((bodyTag)=>{
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    console.log({...data, headTags, bodyTags});
    return {...data, headTags, bodyTags};
  }

  apply(compiler){
    // 要通过 webpackPlugin 来实现整个功能
    compiler.hooks.compilation.tap('MyPlguin', (compilation)=>{
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlguin',(data, cb)=>{
        data = this.processTags(data, compilation); // compilation assets
        cb(null, data)
      });
    })
  }
}

module.exports = InlineSourcePlugin;