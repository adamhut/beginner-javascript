console.log('it works')
//select the elements on the page canvas , shark button 
const canvas = document.querySelector('#etch-a-sketch');

const shakeButton = document.querySelector('.shake');

const ctx = canvas.getContext('2d');

const MOVE_AMOUNT =10;

let hue = 0;

//setup our canvas for drawing
//make a variables called height and witdth forom the same properties on our canvas
// const width = canvas.width;
// const height = canvas.height;
const {width, height} = canvas;

console.log(width,height);

//create random x and y start point on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round'; 
ctx.lineCap = 'round';// 'round', 'square'
ctx.lineWidth = MOVE_AMOUNT;

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.beginPath();//start to drawing
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

//wirte a draw funciton 
function draw(options)
{
    //incement the hue
    hue++;
    // or 
    // hue = Math.floor(floMath.random()*360);
    
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    console.log(options.key,hue);
    //start the path
    ctx.beginPath();
    ctx.moveTo(x, y);
    // move our x and y values depending on what the user did

    let key = options.key;

    // x -=  MOVE_AMOUNT;
    // y -=  MOVE_AMOUNT;

    switch(key){
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default :
            break;
    }

    ctx.lineTo(x, y);
    hue
    ctx.stroke();
}

//write a handler for keys
function handleKey(event){
    
    if(event.key.includes('Arrow'))
    {
        // event.preventDefault();
        draw({
            key:event.key,
        });
        console.log(event.key);
        console.log('Handing Keys');
    }
    
   
    
}

//clear shke funciton 
function clearCanvas(){
    
    canvas.classList.add('shake');
    ctx.clearRect(0,0,width,height);

    canvas.addEventListener(
        'animationend',
        function(){
            canvas.classList.remove('shake');
        },
        {once:true}
    );
    setStartingPoint();
}

function setStartingPoint(){
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';// 'round', 'square'
    ctx.lineWidth = MOVE_AMOUNT;

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath();//start to drawing
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
}


//listen for arrow keys

window.addEventListener('keydown',handleKey);

shakeButton.addEventListener('click',clearCanvas);

