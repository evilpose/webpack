# 从0到手写webpack

## bh-pack 是 手写wepack的项目

### main.ejs模板内有webpack内置的解析构建完模块的方法。

1. Compiler 目前主要处理config来的配置内容，并根据配置内容的对源码进行处理，再按照 main.ejs 的模板打包输出出来。
2. Compiler 内处理入口文件和出口文件，保存了plugins的数组，使用了tapable 来对源码处理的每个生命周期加上钩子，然后循环给每个plugins传入不同生命周期的钩子，plugins在合适的生命周期内去触发。
3. 在build开始运行之后，执行构建模块，现根据入口拿到入口源码，拿到了源码之后根据，根据module的rules对代码进行loader的处理，并把每次处理之后的代码传递下去，拿到loader处理的源码再取到模块名字，如果是入口代码，再保留入口文件名。
4. 再对loader处理后的源码进行解析，先进行AST解析语法树，使用 traverse 来遍历 babylon 生成的语法树，解析出来此源码依赖的模块路径，再用generator把语法树解析回代码，并返回代码和此代码所依赖模块的路径。
5. 首先肯定是处理的入口文件，在处理入口文件的时候就能找到相关的代码依赖，然后再循环依赖，对模块不断的进行构建，最后生成一个路径对应代码模块的对象。
6. 当所有的模块构建完成之后，根据main.ejs的模板，把文件发射出去，就是输出到输出路径内。

## loader-webpack 是 手写 loader 的项目

1. 实现了 loader 的加载、
2. loader 的顺序 pre > normal > inline > post
3. 在内联loader中加上, -! 不会让文件通过 pre 和 normal 的 loader 来处理, ! 不让 normal 处理, !! 什么都不处理, 只剩行列的
4. loader 默认是由两部分组成的 pitch normal, 举例 use [a, b, c], 其处理的顺序是 a.pitch -> b.pitch -> c.pitch -> c.normal -> b.normal -> a.normal , 如果在这个过程中 pitch 有返回的值, 那么就直接返回给上一级的 normal 处理, 越过剩下的处理，包括本loader的normal。
相关具体内容可见 https://juejin.cn/post/6950092728919130126
5.  !：忽略normalloader
    -!：忽略preloader和normalloader
    !!：忽略所有loader（pre / noraml / post ）

6. babel-loader 的实现，使用loader-utils工具类获取 在 babel-loader 的 loader 的 options ，然后使用 bebel/core 对代码进行ast解析并进行babel的处理，如果有sourceMap就设置为true，然后异步输出。

7. banner-loader 的实现，先使用schema-utils工具类对loader的参数进行校验是否格式正确，然后使用 addDependency 添加文件依赖监听，异步读取模板文件对添加到源码头部，或者把手动添加的注释添加上，并输出。

8. css-loader  主要是用正则处理出来url()相关的处理，并拼接为require引入，然后吐出去

9. file-loader  使用了loader-utils interpolateName 根据文件内容返回一个可配置hash的文件名

10. style-loader  使用style-loader pitch 处理截住之后的loader，然后再用内联loader处理用remainingRequest获取到的之后less-loader和css-loader，只执行他们处理，得到的结果。因为按照正常流程，css-loader处理完返回的是js模块，直接放进style中不行，所以用require去引用生效，如果放在normal中执行，那么就会先执行一遍norma再执行一遍内联的之后的两个loader。如果requestPath中没有'!!'前缀，就会造成loader链被无限循环调用。
11. less-loder 

12. url-loader

## webpack-dev 是 bh-pack 的测试项目

## bh-pack 是 手写wepack的项目

## loader-webpack 是 手写 loader 的项目

1. config 支持基本配置，出入口
2. loader 的效果在 webpack-dev 中是使用下载的 less 处理以及手写的 style-loader 处理的 less
3. plugins 是在 bh-pack 的实现的，只不过是使用了在 bh-pack 中使用了 tapable 的钩子，然后在本项目的config.js中声明了class来往钩子里塞入了函数，借此实现代码在编译过程中各个生命周期的处理阶段进行 自定的处理。