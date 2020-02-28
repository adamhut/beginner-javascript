console.log('it workds');

function Gallery(gallery)
{

    // console.log(gallery);
    if(!gallery)
    {
        throw new Error('No Gallery Found!!');
    }

    this.gallery = gallery;

    //select elements we need

    this.images = Array.from(gallery.querySelectorAll('img'));
    // console.log(images);
    this.modal = document.querySelector('.modal');

    this.prevButton = document.querySelector('.prev');
    this.nextButton = document.querySelector('.next');

    this.currentImage;

    //bind our methods to the instance when we need them
    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside(this);
   
    //These are event listeners
    this.images.forEach(image => image.addEventListener('click', (e)=>{
        this.showImage(e.currentTarget);
    }));

    //loop over each image
    this.images.forEach(image => {
        //attach an event listener for each image
        image.addEventListener('keyup', (e) => {
            // when that is keyup  check if it was enter
            if(e.key==='Enter')
            {
                //if it is show the image
                this.showImage(e.currentTarget);
            }
        })
    });

    this.modal.addEventListener('click',this.handleClickOutside);
    
}


Gallery.prototype.openModal=function() {
  
     if (this.modal.matches('.open')) {
         return;
     }

     this.modal.classList.add('open');

     window.addEventListener('keyup', this.handleKeyUp);
     this.nextButton.addEventListener('click', this.showNextImage);
     this.prevButton.addEventListener('click', this.showPrevImage);

}

Gallery.prototype.closeModal=function() {
     this.modal.classList.remove('open');

     //TODO: add event listener for click and keyboard

     window.removeEventListener('keyup', this.handleKeyUp);
     this.nextButton.removeEventListener('click', this.showNextImage);
     this.prevButton.removeEventListener('click', this.showPrevImage);
 }

 Gallery.prototype.handleClickOutside = function(e) {
     if (e.target == e.currentTarget) {
         this.closeModal();
     }
  
 }

 Gallery.prototype.handleKeyUp=function(event) {
     if (event.key === 'Escape') {
         return this.closeModal();
     }

     if (event.key === 'ArrowRight') {
         return this.showNextImage();
     }

     if (event.key === 'ArrowLeft') {
         return this.showPrevImage();
     }
 }

Gallery.prototype.showNextImage=function() {
      // showImage(currentImage.nextElementSibling  || gallery.querySelector('img'));
     this.showImage(this.currentImage.nextElementSibling || gallery.firstElementChild);

}

Gallery.prototype.showPrevImage=function() {
    this.showImage(this.currentImage.previousElementSibling || gallery.lastElementChild);
}

Gallery.prototype.showImage=function(el) {
     if (!el) {
         console.log('there is no image to show');
         return;
     }
     //update the modal with this info
     // console.log(el);
     this.modal.querySelector('img').src = el.src;
     this.modal.querySelector('figcaption h2').textContent = el.title;
     this.modal.querySelector('figcaption p').textContent = el.dataset.description;

     this.currentImage = el;

     this.openModal();
}


const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1)
console.log(gallery2)
