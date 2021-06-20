let { SyncLoopHook} = require('tapable');
// 同步遇到某个不返回undefined的监听函数会多次执行

class Lesson{
  constructor(){
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }
  tap(){  // 注册监听函数
    this.hooks.arch.tap('node', (name) =>{
      console.log('node', name);
      return ++this.index === 3 ? undefined : '继续学';
    });
    this.hooks.arch.tap('react', (name) => {
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