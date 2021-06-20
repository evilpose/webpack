let { AsyncParallelHook } = require('tapable');
// 异步的钩子 （串行） 并行 需要等待所有并发的异步事件执行后再执行回调方法
// 同时发送多个请求
// tapable 库中有三种注册方法 tap 同步注册 tapAsync(cb)注册 tapPromise(注册是promise)
// call callAsync promise

class Lesson{
  constructor(){
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap(){  // 注册监听函数
    this.hooks.arch.tapPromise('node', (name) =>{
      return new Promise((resovle, reject)=>{
        setTimeout(() => {
          console.log('node', name);
          resovle();
        }, 1000);
      })
    });
    this.hooks.arch.tapPromise('react', (name) => {
      return new Promise((resovle, reject)=>{
        setTimeout(() => {
          console.log('react', name);
          resovle();
        }, 1000);
      })
    });
  }
  start(){
    this.hooks.arch.promise('bu').then(function(){
      console.log('end');
    });
  }
}

let l = new Lesson();

l.tap();    // 注册了这两个事件
l.start();  // 启动钩子