## webpack-dev 是 bh-pack 的测试项目

## bh-pack 是 手写wepack的项目

## loader-webpack 是 手写 loader 的项目

1. config 支持基本配置，出入口
2. loader 的效果在 webpack-dev 中是使用下载的 less 处理以及手写的 style-loader 处理的 less
3. plugins 是在 bh-pack 的实现的，只不过是使用了在 bh-pack 中使用了 tapable 的钩子，然后在本项目的config.js中声明了class来往钩子里塞入了函数，借此实现代码在编译过程中各个生命周期的处理阶段进行 自定的处理。