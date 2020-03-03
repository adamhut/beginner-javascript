console.log('it works');

const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');


async function fetchRecipes(query){
    
    
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`)

    const data = await res.json();

    return data;

}

async function handleSubmit(event){
    event.preventDefault();
    fetchAndDisplay(event.currentTarget.query.value)
    console.log(event.currentTarget);
    console.log(event.currentTarget.query);
    console.log(event.currentTarget.query.value);
    console.log(event.currentTarget.submit);
    console.log(form.submit.disabled);
   
   
}

async function fetchAndDisplay(query){

    form.submit.disabled = true;
    const recipes = await fetchRecipes(query);

    displayRecipes(recipes.results);

    form.submit.disabled = false;

}

function displayRecipes(recipes)
{
    console.log('create HTML from here');

    console.log(recipes);

    const html = recipes.map(recipe=>{
        return `
            <div class="recipe">
                <h2>${recipe.title}</h2>
                <p>
                    ${recipe.ingredients}
                </p>
                ${recipe.thumbnail &&  
                    `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`
                }
                <a href="${recipe.href}">View Recipe</a>
            </div>
        `
    });

    console.log(html);
    recipesGrid.innerHTML = html.join('');

}

form.addEventListener('submit',handleSubmit)

fetchAndDisplay('pizza');
