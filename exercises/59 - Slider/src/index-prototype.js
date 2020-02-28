console.log('it works');

function Slider(slider){

    if( ! (slider instanceof Element))
    {
        throw new Error('No slider passed in');
    }
    //create some variable for working with the slider

    // this.current ;
    // this.prev;
    // this.next;

    //select the elements needed for the slider
    this.slides = slider.querySelector('.slides');
    // console.log(slides);
    this.slider = slider;
    const nextButton = this.slider.querySelector('.goToNext');
    const prevButton = this.slider.querySelector('.goToPrev');
   
    

    //when this slider is created , run the start slider function
    this.startSlider();
    this.applyClass();

    //Event listener 
    //this.move = this.move.bind(this);
    prevButton.addEventListener('click',()=> this.move('back'));
    nextButton.addEventListener('click', () => this.move('next'));
}

Slider.prototype.startSlider = function() {

    this.current = this.slides.querySelector('.current') || this.slides.firstElementChild;
    this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
    this.next = this.current.nextElementSibling || this.slides.firstElementChild;
    // console.log(current, prev,next);

}

Slider.prototype.applyClass = function() {
    this.current.classList.add('current');
    this.prev.classList.add('prev');
    this.next.classList.add('next');
}

Slider.prototype.move = function(direction) {
    //first strip all the classes off the current slides
  
    const classesToRemove = ['prev', 'next', 'current'];
    this.prev.classList.remove(...classesToRemove);
    this.current.classList.remove(...classesToRemove);
    this.next.classList.remove(...classesToRemove);

    //[prev,next,current].forEach(el=>el.classList.remove(...classesToRemove));

    if (direction === 'back') {
        //make an new array of the new values , and destructure them over and into the ,prev, current and next
        [this.prev, this.current, this.next] = [
            //get the prev slide if it is null get the last slide from the entire slider for wrapping
            this.prev.previousElementSibling || this.slides.lastElementChild,
            this.prev,
            this.current,
        ];
        // prev = prev.previousElementSibling;
    } else {
        //make an new array of the new values , and destructure them over and into the ,prev, current and next
        [this.prev, this.current, this.next] = [
            this.current,
            this.next,
            //get the next slide if it is null get the first slide from the entire slider for wrapping
            this.next.nextElementSibling || this.slides.firstElementChild,
        ];
        // prev = prev.previousElementSibling;
    }
    this.applyClass()
}


const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider '));

console.log(mySlider)
console.log(dogSlider)

//TODO
//see if you can make it work when you use the error key and you are focus on the right slide


window.addEventListener('keyup',function(e){
    if(e.key==='ArrowRight')
    {
        dogSlider.move()
    }else if(e.key==='ArrowLeft')
    {
        dogSlider.move('back')
    }

});