import { generateOptions } from './utils-start.js';
import  currencies from './currencies-start.js';
import { handleInput } from './handlers-start.js';
import {fromSelect,toSelect } from './elements-start.js';


export function init(){
    //when the page loaded
    const form = document.querySelector('.app form');
    // fectchRate();
    const optionsHtml = generateOptions(currencies);
    fromSelect.innerHTML = optionsHtml;
    toSelect.innerHTML = optionsHtml;
    form.addEventListener('input', handleInput)
    
    // console.log(optionsHtml);


}
