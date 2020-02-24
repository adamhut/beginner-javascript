console.log('it workds');

function Gallery(gallery)
{

    // console.log(gallery);
    if(!gallery)
    {
        throw new Error('No Gallery Found!!');
    }

    //select elements we need

    const images = Array.from(gallery.querySelectorAll('img'));
    // console.log(images);
    const modal = document.querySelector('.modal');

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentImage;

    function openModal()
    {
        // console.log('open modal');

        //first check if the modal is alrady open 
        if(modal.matches('.open'))
        {
            // console.info('Modal already open')
            return;
        }

        modal.classList.add('open');

        //Event listener to be bound when we open the modal
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);

    }

    function closeModal(){
        modal.classList.remove('open');

        //TODO: add event listener for click and keyboard

        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function handleClickOutside(e)
    {
        if(e.target == e.currentTarget)
        {
            closeModal();
        }
        // console.log(e.target,'target');
        // console.log(e.currentTarget,'current target');
    }

    function handleKeyUp(event)
    {
        if(event.key ==='Escape')
        {
            return closeModal();
        }

        if (event.key === 'ArrowRight') 
        {
            return showNextImage();
        }

        if (event.key === 'ArrowLeft') 
        {
            return showPrevImage();
        }
    }

    function showNextImage()
    {
        // console.log(currentImage);
        // console.log(currentImage.nextElementSibling);
       
        // showImage(currentImage.nextElementSibling  || gallery.querySelector('img'));
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
       
    }

    function showPrevImage() {
        // console.log(currentImage);
        // console.log(currentImage.prevElementSibling);
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showImage(el)
    {
        if(!el)
        {
            console.log('there is no image to show');
            return;
        }
        //update the modal with this info
        // console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('figcaption h2').textContent = el.title;
        modal.querySelector('figcaption p').textContent = el.dataset.description;
        
        currentImage = el;

        openModal();
    }
   
    //These are event listeners
    images.forEach(image => image.addEventListener('click', (e)=>{
        showImage(e.currentTarget);
    }));

    //loop over each image
    images.forEach(image => {
        //attach an event listener for each image
        image.addEventListener('keyup', (e) => {
            // when that is keyup  check if it was enter
            if(e.key==='Enter')
            {
                //if it is show the image
                showImage(e.currentTarget);
            }
        })
    });

    modal.addEventListener('click',handleClickOutside);
    


}


const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery1'));


