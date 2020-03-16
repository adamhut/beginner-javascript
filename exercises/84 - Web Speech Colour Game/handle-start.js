import {isValidColor} from './colors.js';
function logWords(results){
    console.log(results[results.length-1][0].transcript);

}

export function handleResult(event){

    console.log('here');
    logWords(event.results);

    const results = event.results;
  
    const words = results[results.length - 1][0].transcript;

    //lowercase everything
    let color = words.toLowerCase();
    console.log(color);
    //strip any  space out
    color = color.replace(/\s/g,'');

    //check if it is a valid color
    if (!isValidColor(color))
    {
        //that is all , stop.
        // console.log('I am not Valid')
        return ;
    }

    //if it is , then show the UI for that
    const colorSpan = document.querySelector(`.${color}`);
    // const colorSpan = document.getElementsByClassName(color);
    
    // console.log(colorSpan);
    colorSpan.classList.add('got');

    console.log('this is a valid color; ');
    //chagne the background color
    document.body.style.backgroundColor = color;



}