// module.exports = 'zzzz'

require('@babel/polyfill')

class B{

}

function * gen(parrams){
  yield 1;
}

console.log(gen().next());