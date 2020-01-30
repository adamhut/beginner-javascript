console.log('it works');

const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButtonClick(event){
    console.log('YA clicked it');
    const button  = event.currentTarget;
    const card = button.closest('.card');
    // console.log(card);
    const imgSrc = card.querySelector('img').src;
    
    const name = card.querySelector('h2').textContent;

    console.log(imgSrc);

    const desc = card.dataset.description;

    console.log(desc);

    //populate the modal with the new info
    modalInner.innerHTML =`
        <img width="600" height="600" src="${imgSrc.replace('200','600')} alt="${name}" />
        <p>
        ${desc}
        </p>
    `;

    modalOuter.classList.add('open');

}

cardButtons.forEach(button=> button.addEventListener('click',handleCardButtonClick));

function closeModal(){
    modalOuter.classList.remove('open');
}


modalOuter.addEventListener('click',function(event){
    const isOutside = ! event.currentTarget.closest('.modal-innder');
    
    if(isOutside )
    {
        closeModal();
    }
    // console.log(event);

});

window.addEventListener('keydown',(event) => {
    console.log(event.key);

    if(event.key==='Escape')
    {
         closeModal();
    }
});
