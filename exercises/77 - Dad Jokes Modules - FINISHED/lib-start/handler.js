import {fetchJoke} from './index.js'
import {randomItemFromArray} from './utils.js';
import {jokeHolder,jokeButtonSpan} from './elements.js';
import buttonText from './../data/buttonText.js'

//name export
export async function handleClick() {
    const { joke } = await fetchJoke();

    jokeHolder.textContent = joke;
    jokeButtonSpan.textContent = randomItemFromArray(
        buttonText,
        jokeButtonSpan.textContent
    );
}