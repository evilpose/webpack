let { AsyncSeriesHook } = require('tapable');

class Lesson{
  constructor(){
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap(){  // 注册监听函数
    this.hooks.arch.tapPromise('node', function(name, cb){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name);
          resolve();
        }, 1000);
      })
    });
    this.hooks.arch.tapPromise('react', function(name, cb){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name);
          resolve();
        }, 1000);
      })
    });
  }
  start(){
    this.hooks.arch.promise('bu').then(function(){
      console.log('end');
    })
  }
}

let l = new Lesson();

l.tap();    // 注册了这两个事件
l.start();  // 启动钩子