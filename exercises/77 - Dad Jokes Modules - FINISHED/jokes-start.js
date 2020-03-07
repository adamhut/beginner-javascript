import {handleClick} from './lib-start/handler.js';
import {jokeButton} from './lib-start/elements.js';




jokeButton.addEventListener('click', handleClick);
// jokeButton.addEventListener('click', ()=> handleClick(loader) );

// jokeButton.addEventListener('click', handleClick.bind(null,loader) );
// jokeButton.addEventListener('click',function(){
//     handleClick(loader)
// });