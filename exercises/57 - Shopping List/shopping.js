console.log('it workd');
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');


//we need an array to hold our state

let items =[];

function handleSubmit(e){
    e.preventDefault();
    //console.log('submmited!!');
    //console.dir(e.currentTarget.item);
    
    const name = e.currentTarget.item.value;
    //if it is empty do not submit
    if(!name)
    {
        return;  
    }
    const item ={
        name:name,
        id:Date.now(),//make the id base on it millssecond,
        complete:false,
    }
    
    
    //push the item into our state
    items.push(item);
    // console.log(`there are anow ${items.length}  in you state`);

    // Reset the form
    // e.currentTarget.item.value = '';
    // or 
    e.target.reset();
    // or 
    //e.currentTarget.reset();
    //display it
    // displayItems();
    /*
    * first off a custom event that will tell anyone else who cares that 
    * the items have been updated
    */
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
    
}

function mirrorToLocalStorage(){
    console.info('save items to localstorage');
    localStorage.setItem('items',JSON.stringify(items));

    // localStorage.getItem('''name)
    // items = JSON.parse(localStorage.getItem('item'));

}


function restoreFromLocalStorage(){
    console.log('I am restore from local storage');

    const lsItems = JSON.parse(localStorage.getItem('items'));

    if (lsItems && lsItems.length) {
        // lsItems.forEach(item =>items.push(item));
        items.push(...lsItems);

        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id){
    console.log(`deleteing Item  ${id}`)
    //update our items array without this one
    itmes = itmes.filter(item => {
        return item.id!==id;
    })
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
    
}

function markAsComplete(id){

    console.log(`mark as complete  ${id}`)

    const itemRef = items.find(item => item.id ===id);
    
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}


function displayItems(){
    const html = items.map( item => {
        return `
        <li class="shopping-item">
            <input 
                type="checkbox" 
                value="${item.id}" 
                ${item.complete ? 'checked':''}    
            />
            <span className="itemName">
                ${item.name}    
            </span>  
            <button 
                aria-lable="Remove ${item.name}"
                value="${item.id}"
            >
                &times;
            </button>
        </li>`;
    }).join('');

    list.innerHTML = html;
}

shoppingForm.addEventListener('submit', handleSubmit);

list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
//Event Delegation : We listen of the click on the list <ul> but then delegate the click over tot the button if that is what was clicked
list.addEventListener('click',function(e){
    // console.log(e.target,e.currentTarget);
    if(e.target.matches('button'))
    {
        deleteItem(parseInt(e.target.value));
    }
    if (e.target.matches('input[type="checkbox"]')) 
    {
        markAsComplete(parseInt(e.target.value));
    }
})

restoreFromLocalStorage();


