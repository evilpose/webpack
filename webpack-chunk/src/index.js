// import $ from 'jquery';
// console.log($);

import(/* webpackChunkName: "async-jquery" */ 'jquery').then(component => {
  console.log(component)
})

import('./b.js');
import './c.js';