console.log('it works');

function Slider(slider){

    if( ! (slider instanceof Element))
    {
        throw new Error('No slider passed in');
    }
    //create some variable for working with the slider

    let current ;
    let prev;
    let next;

    //select the elements needed for the slider
    const slides = slider.querySelector('.slides');
    // console.log(slides);
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');
   
    function startSlider(){
        current = slides.querySelector('.current') || slides.firstElementChild;

        prev = current.previousElementSibling ||slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
        console.log(current, prev,next);

    }

    function applyClass(){
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
    }

    function move(direction) {
        //first strip all the classes off the current slides
        const classesToRemove= ['prev','next','current'];
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);

        //[prev,next,current].forEach(el=>el.classList.remove(...classesToRemove));

        if(direction === 'back'){
            //make an new array of the new values , and destructure them over and into the ,prev, current and next
            [prev,current,next ] = [
                //get the prev slide if it is null get the last slide from the entire slider for wrapping
                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current,
            ];
            // prev = prev.previousElementSibling;
        }else{
            //make an new array of the new values , and destructure them over and into the ,prev, current and next
            [prev, current, next] = [
                current,
                next,
                //get the next slide if it is null get the first slide from the entire slider for wrapping
                next.nextElementSibling || slides.firstElementChild,
            ];
            // prev = prev.previousElementSibling;
        }
        applyClass()
    }

    //when this slider is created , run the start slider function
    startSlider();
    applyClass();

    //Event listener 
    prevButton.addEventListener('click',()=> move('back'));
    nextButton.addEventListener('click',()=> move('next'));
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider '));

//TODO
//see if you can make it work when you use the error key and you are focus on the right slide