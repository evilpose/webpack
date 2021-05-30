// console.log('index');
// console.log('home');

// class Log {
//   constructor(){
//     console.log('出错了！');
//   }
// }

// let log = new Log();

// console.log(log);

// http-proxy

// import 'bootstrap';
import './style'

let url = '';
if(DEV === 'dev'){
  url = 'prod'
} else {
  url = 'test'
}
console.log('-------------');
console.log(DEV);
console.log(FLAG);
console.log(EXPORESSION);
console.log('-------------');

let xhr = new XMLHttpRequest();

xhr.open('GET', '/user', true);

xhr.onload = function(){
  console.log(xhr.response);
}

xhr.send()