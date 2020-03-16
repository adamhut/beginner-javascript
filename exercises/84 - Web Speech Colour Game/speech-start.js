console.log('it works');

import {handleResult} from './handle-start.js';
import {colorsByLength , isDark}  from  './colors.js';


const colorsEl = document.querySelector('.colors');

function displayColors(colors){
    return colors.map(color=>{
        return `
            <span class="color ${color} ${isDark(color) ? 'dark':'' }" style="background:${color}">${color}</span>
        `   
    }).join('');
}

window.SpeechRecognition = window.SpeechRecognition  || window.webkitSpeechRecognition

function start(){

    //see if the browswer support this
    // window.webkitSpeechRecognition()
    if ( !( 'SpeechRecognition' in window))
    {
        console.log('Your Browswer does not support speech reco.');
        return;
    }

    //it does work.

    // console.log('starting')

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = handleResult;
    recognition.start();
    // console.log(recognition);



}

start();

displayColors(colorsByLength);
// console.log(colorsByLength);

colorsEl.innerHTML=displayColors(colorsByLength);