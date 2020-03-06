import {init} from './init-start.js'
// import init from './init-start.js';
//start the app
const app = document.querySelector('.app');
app.addEventListener('mouseenter',init,{once:true});