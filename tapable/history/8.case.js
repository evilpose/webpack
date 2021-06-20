class AsyncSeries{   // 钩子是同步的
  constructor(args){
    this.tasks = [];
  }
  tapPromise(name, task){
    this.tasks.push(task);
  }
  promise(...args){
    let [first, ...others] = this.tasks;
    return others.reduce((p, n)=>{  // redux 源码一样
      return p.then(() => n(...args))
    }, first(...args));
  }
}

let hook = new AsyncSeries(['name']);
hook.tapPromise('react', function(name, cb){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 1000);
  })
});
hook.tapPromise('node', function(name, cb){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 1000);
  })
});

hook.promise('bu').then(function(){
  console.log('end');
});