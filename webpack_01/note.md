## webpack 安装
- 安装本地 webpack
- webpack webpack-cli -D

## webpack 可以进行0配置
- 打包工具 -> 输出后的结果（js模块）
- 打包 （支持我们的js的模块化）

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js

"babel-core": "^6.26.0",   // 核心包
"babel-loader": "^7.1.2",   // 基础包

"babel-preset-env": "^1.6.1",  // 根据配置转换成浏览器支持的 es5  

"babel-plugin-transform-runtime": "^6.23.0",  //promise的转换
"babel-preset-react": "^6.24.1", //react语法的转换
"babel-plugin-import": "^1.6.3",  // import的转换 

"babel-preset-stage-0": "^6.24.1", //babel-preset-stage-0 打包处于 strawman 阶段的语法）