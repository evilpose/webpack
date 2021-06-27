class FileListPlugin{
  constructor(obj){
    this.filename = obj.filename;
  }
  apply(compiler){
    // 文件已经准备好了，要进行发射
    // emit
    console.log(this.filename);
    compiler.hooks.emit.tap('FileListPlugin', (compilcation)=>{
      let assets = compilcation.assets;
      let content = `## 文件名 资源大小\r\n`
      // [[bundle.js, {}], [index.html, {}]]
      Object.entries(assets).forEach(([filename, stateObj])=>{
        content += `- ${filename}   ${stateObj.size()}\r\n`
      });
      // 资源对象
      assets[this.filename] = {
        source(){
          return content;
        },
        size(){
          return content.length;
        }
      }
    })
  }
}

module.exports = FileListPlugin;