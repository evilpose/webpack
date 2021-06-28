// 把 外链 的标签 变成 内联的
const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineSourcePlugin{
  constructor(match){
    this.reg = match; // 正则
  }

  processTag(tag, compilation){ // 处理某一个标签的
    let newTag, url;
    if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
      newTag = {
        tagName: 'style',
      }
      url = tag.attributes.href;
    };
    if(tag.tagName === 'script' && this.reg.test(tag.attributes.src)){
      newTag = {
        tagName: 'script'
      }
      url = tag.attributes.src;
    };
    return tag;
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