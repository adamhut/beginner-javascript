console.log('it works ');
// Make a div
const div = document.createElement('div');

// add a class of wradivper to it
div.classList.add('wrapper')

// put it into the body
document.body.appendChild(div)

// make an unordered list
// add three list items with the words "one, two three" in them
const ul = `<ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
</ul>`;

// put that list into the above wrapper
div.innerHTML = ul;

// create an image
const image = document.createElement('img');
// set the source to an image
image.src = 'https://picsum.photos/500';
// set the width to 250
image.width = 250;
image.height = 250;

// add a class of cute
image.classList.add('cute');
// add an alt of Cute Puppy
image.alt = 'Cute Puppy';

// Append that image to the wrapper
div.appendChild(image)

// with HTML string, make a div, with two paragraphs inside of it
const myHtml= `
    <div>
        <p>paragraph one</p>
        <p>paragraph two</p>
    </div>
`;

// put this div before the unordered list from above
const ulElement = div.querySelector('ul');

// ulElement.insertAdjacentElement('beforebegin',myHtml); //myHtml is not an element yet
ulElement.insertAdjacentHTML('beforebegin',myHtml);
// add a class to the second paragraph called warning
const myDiv =div.querySelector('div');
//or 
// const myDiv = div.firstElementChild;
console.log(myDiv);
myDiv.children[1].classList.add('warning');

// remove the first paragraph
myDiv.firstElementChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>
function generatePlayerCard(name,age,height)
{
    return `
        <div class = "playerCard">
            <h2>${name} — ${age}</h2>
            <p>They are height is ${height} and  ${age} years old. In Dog years this person would be ${age*7} . That would be a tall dog!</p>
            <button type="button" class="delete">&times; Delete Me</button>
        </div>
    `
}

// make a new div with a class of cards
const myCard = document.createElement('div');
myCard.classList.add('cards');

// Have that function make 4 cards
let cardsHtml = generatePlayerCard('wes',12,150);
cardsHtml = cardsHtml + generatePlayerCard('wes2', 12, 150);
cardsHtml = cardsHtml + generatePlayerCard('wes3', 12, 150);
cardsHtml = cardsHtml + generatePlayerCard('wes4', 12, 150);

// append those cards to the div
// myCard.insertAdjacentHTML('afterbegin',cardsHtml);
//or
myCard.innerHTML =cardsHtml;
// myCard.parentElement
// put the div into the DOM just before the wrapper element
div.insertAdjacentElement('beforebegin',myCard);

// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
const buttons = document.querySelectorAll('.delete');
// make out delete function
function deleteCard(event){
    console.log('delete cards ! TODO');
    const buttonThatGotClicked = event.currentTarget;
    console.log(event.currentTarget);
    console.log(event.target);
    // btn.remove();
    // event.target.parentElement.remove();
    //or
    event.target.closest('.playerCard').remove();
}
// loop over them and attach a listener

buttons.forEach(button=>{
    button.addEventListener('click',(event)=>{
        deleteCard(event);
    })
})


