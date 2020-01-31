const myPargraph = document.createElement('p');

myPargraph.textContent='I am a P';
myPargraph.classList.add('special');
myPargraph.dataset.test='dd';
console.log(myPargraph)

const myImage = document.createElement('img');

myImage.src = 'https://picsum.photos/500';
myImage.alt = 'Nice phoot';

console.log(myImage);

const myDiv = document.createElement('div');
myDiv.classList.add('wrapper');

console.log(myDiv);


document.body.appendChild(myImage)