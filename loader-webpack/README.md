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