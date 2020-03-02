console.log('it works');

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup){

    popup.classList.remove('open')
    await wait(1000);

    popup.remove();//this event remove from page but it still in the javascript
    popup=null; //reassign
    //
    // popup.parentElement.removeChild(popup);
}

function ask(options){

    return new Promise(async function(resolve ){
        //First we need to create a popup with all the filelds in it
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML('afterbegin',
            `<fieldset>
                <label>${options.title}</label>
                <input type="text" name="input"/>
                <button type="submit">Submit</button>
            </fieldset>
        `);

        console.log(popup);

        //check it they want a cancel button
        if(options.cancel){
            const skipButton = document.createElement('button');
            skipButton.type='button';
            skipButton.textContent='Cancel';
            popup.firstElementChild.appendChild(skipButton);
            // TODO: listen for a click on that cancel button 
            skipButton.addEventListener('click', function () { 
                resolve(null);
                destroyPopup(popup);
            },{once:true });
        }

        //listen for the submit event on the inputs
        popup.addEventListener('submit',function(e){
            e.preventDefault();
            console.log('submitted');    
            console.log(e.target);            
            console.log(e.target.input);
            resolve(e.target.input.value);
            //remove the popup from the DOM
            destroyPopup(popup);
        }, { once: true }//remove event listener after submitted, the once options will make sure it only run it once
        );

        //when someone does submit it, resolve the data that was in the input box!


        //insert taht popup into the DOM
        document.body.appendChild(popup);
        
        // put a very small timeout before we add the open class to make sure that animation works

        await wait(50);
        popup.input.focus();
        popup.classList.add('open');

    })

}


// select all button that has question on it.
const buttons = document.querySelectorAll('[data-question]');
console.log(buttons);

async function askQuestion(e){
    const button  = e.currentTarget;

    const shouldCancel = 'cancel' in button.dataset;
    //or
    // const shouldCancel = button.hasAttribute('data-cancel');
    //or
    // const shouldCancel = button.dataset.cancel!==undefined;
    const answer = await ask({
        title:button.dataset.question,
        cancel: shouldCancel,
    });

    console.log(answer);

}

buttons.forEach(button=> {
    button.addEventListener('click',askQuestion);
})


const questions = [
    { title: 'What is your name'},
    { title: 'What is your age?' ,cancel:true },
    { title: 'waht is your dog name' },

];

async function asyncMap(array,callback){

    //make an array to store our result
    const results = [];
    //loop over the array
    for(const item of array)
    {
         const result = await callback(item);
         results.push(result);
    }

    //when we are done the loop , return it!
    return results;

}

async function go(){
    const answers = await asyncMap(questions,ask);
    console.log(answers);
}

go();
// async function askMany(){
//     for(question of questions){
//         const answer = await ask(question);
//         console.log(answer);
//     }
// }

// askMany();

// const answers = Promise.all([
//         ask(questions[0]),
//         ask(questions[1]),
//         ask(questions[2])
//     ]).then(answers => {
//         console.log(answer);
//     });

// Promist.all(questions.map(ask)).then(data=>{
//     console.log(data);
// })

// console.log(qPromosies);
