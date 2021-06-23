## loader-webpack 是 手写 loader 的项目

1. 实现了 loader 的加载、
2. loader 的顺序 pre > normal > inline > post
3. 在内联loader中加上, -! 不会让文件通过 pre 和 normal 的 loader 来处理, ! 不让 normal 处理, !! 什么都不处理, 只剩行列的
4. loader 默认是由两部分组成的 pitch normal, 举例 use [a, b, c], 其处理的顺序是 c.pitch -> b.pitch -> a.pitch -> a.normal -> b.normal -> c.normal , 如果在这个过程中 pitch 有返回的值, 那么就直接返回给上一级的 normal 处理, 越过剩下的处理，包括本loader的normal。
相关具体内容可见 https://juejin.cn/post/6950092728919130126