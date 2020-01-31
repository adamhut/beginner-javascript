const wes = document.querySelector('.wes')

wes.addEventListener('click',function(event){
    console.log(event);
    event.preventDefault();
    event.currentTarget.href;
});


const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit',function(event){
    console.log(event);

    console.log(event.currentTarget.name.value);
    console.log(event.currentTarget.email.value);

    name = event.currentTarget.name.value;

    if(name.includes('chad'))
    {

        
        alert('sorry bro');
        event.preventDefault();
    }


    // console.log(event.currentTarget.email.id);

    event.preventDefault();
})


function logEvent(event){
    console.log(event.type);
    console.log(event.key);

    console.log(event.which);

    if(event.type==='click' || event.key ==='Enter')
    {
        console.log('you click the')
    }

}

signupForm.addEventListener('keyup',function(event){
    logEvent(event);
});

signupForm.addEventListener('keydown', function (event) {
    logEvent(event);
});

// 'keyup',
// 'keydown',
// 'focus',
// 'blur',
