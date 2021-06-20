let { SyncWaterfallHook } = require('tapable');
// waterfall 瀑布

class Lesson{
  constructor(){
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }
  tap(){  // 注册监听函数
    this.hooks.arch.tap('node', function(name){
      console.log('node', name);
      return 'node学的还不错';
    });
    this.hooks.arch.tap('react', function(data){
      console.log('react', data);
    });
  }
  start(){
    this.hooks.arch.call('bu');
  }
}

let l = new Lesson();

l.tap();    // 注册了这两个事件
l.start();  // 启动钩子