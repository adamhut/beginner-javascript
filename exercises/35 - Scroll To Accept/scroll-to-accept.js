function scrollToAccept(){
    const terms = document.querySelector('.terms-and-conditions');
    if(!terms)
    {
        return;//quit this
    }

    terms.addEventListener('scroll', function (e) {
        // console.log(e);
    });
}

// scrollToAccept();
const terms = document.querySelector('.terms-and-conditions');
const watch = document.querySelector('.watch');

const btn = document.querySelector('.accept');

function obCallback(payload){

    console.log(payload[0].isIntersecting , payload[0].intersectionRatio);

    if (payload[0].intersectionRatio === 1)
    {
        btn.disabled = false;
        console.log('REMOVING DISABLED')
        ob.unobserve(terms.lastElementChild);
    }else{
        // btn.disabled = true;
    }

}

const ob = new IntersectionObserver(obCallback,{
    root:terms,
    threshold: 1, 
    //threshold: [0,0.1],
});

// ob.observe(watch);

ob.observe(terms.lastElementChild);



terms.addEventListener('scroll', function (e) {
    
    // console.log(e.currentTarget);
    e.currentTarget.scrollTop 
    e.currentTarget.scrollHeight;



});
console.log('IT WORKS!');



