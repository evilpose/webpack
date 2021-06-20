let { SyncBailHook } = require('tapable');

class Lesson{
  constructor(){
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }
  tap(){  // 注册监听函数
    this.hooks.arch.tap('node', function(name){
      console.log('node', name);
      return '停止';
    });
    this.hooks.arch.tap('react', function(name){
      console.log('react', name);
    });
  }
  start(){
    this.hooks.arch.call('bu');
  }
}

let l = new Lesson();

l.tap();    // 注册了这两个事件
l.start();  // 启动钩子