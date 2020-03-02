function wait(ms = 0){
    return new Promise(resolve => setTimeout(resolve,ms));
}


function getRandomBetween(min=20, max=150, randomNumber = Math.random()){
    // return Math.floor(Math.random() *(max-min)  + min);
    return Math.floor(randomNumber * (max - min) + min);
}


//async for of a loop
// async function draw(element){
//     console.log(element);
//     const text = element.textContent;
//     let soFar = '';
    
//     const {typeMin, typeMax}  = el.dataset;

//     for(const letter of text)
//     {
//         // console.log(letter);
//         soFar+=letter;
//         // console.log(soFar);
//         element.textContent = soFar;
//         //wait for some amount of time       
//         const amountOfTimeToWait = getRandomBetween(typeMin,typeMax);
//         await wait(amountOfTimeToWait);
//     }
// }

//recursion
async function draw(el){
    let index = 1;
    const text = el.textContent;
    const {typeMin, typeMax}  = el.dataset;
    
    async function drawLetter(){
        el.textContent = text.slice(0,index);
        index = index+1;
        const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
        await wait(amountOfTimeToWait);
        //exit condition
        if(index <= text.length)
        {
            drawLetter()
        }
    }
    //when this function draw runs , kick of drawLetter
    drawLetter();


}



const els = document.querySelectorAll('[data-type]');

// els.forEach(el=> draw(el)); 
els.forEach(draw);