class AsyncParallelHook{   // 钩子是同步的
  constructor(args){
    this.tasks = [];
  }
  tapPromise(name, task){
    this.tasks.push(task);
  }
  promise(...args){
    let tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks);
  }
};

let hook = new AsyncParallelHook(['name']);
let total = 0;
hook.tapPromise('react', function(name){
  return new Promise((resovle, reject)=>{
    setTimeout(() => {
      console.log('react', name);
      resovle();
    }, 1000);
  })
});
hook.tapPromise('node', function(name){
  return new Promise((resovle, reject)=>{
    setTimeout(() => {
      console.log('node', name);
      resovle();
    }, 1000);
  })
});

hook.promise('bu').then(function(){
  console.log('end');
});
// AsyncParralleBailHook() 带保险的异步并发的钩子