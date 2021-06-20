class SyncWaterfallHook{   // 钩子是同步的
  constructor(args){
    this.tasks = [];
  }
  tap(name, task){
    this.tasks.push(task);
  }
  call(...args){
    let [first, ...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a, b) => {
      b(a)
    }, ret)
  }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function(...name){
  console.log('react', name);
  return 'react停一下'
})
hook.tap('node', function(data){
  console.log('node停一下', data);
})
hook.tap('webpack', function(data){
  console.log('webpack', data);
})
hook.call('bu','he');