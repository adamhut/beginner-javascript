const jokeButton = document.querySelector('.getJoke');;
const jokeHolder = document.querySelector('.joke p');
const jokeButtonSpan = jokeButton.querySelector('.jokeText');
const loader = jokeButton.querySelector('.loader');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];


async function fetchJoke(){


    jokeButtonSpan.classList.add('hidden');
    const response = await fetch("https://icanhazdadjoke.com",{
        headers:{
            Accept: 'application/json',
            // Accept: 'text/plain',
        }
    });

    const data = await response.json();
    jokeButtonSpan.classList.remove('hidden');
    return data
    // console.log(joke);

}

function randomItemFromArray(arr, not){

  const item = arr[(Math.floor(Math.random() * arr.length)) ];

  if(item === not)
  {
      console.log('Ahh we used taht one last time, look again');
      return randomItemFromArray(arr, not);
  }

  return item;

}

async function handleClick(){
    loader.classList.remove('hidden');
    const {joke}  = await fetchJoke();
    // console.log(joke);
    jokeHolder.textContent = joke;
    jokeButtonSpan.textContent = randomItemFromArray(buttonText, jokeButtonSpan.textContent);
    loader.classList.add('hidden');
}

jokeButton.addEventListener('click', handleClick);


fetchJoke();

