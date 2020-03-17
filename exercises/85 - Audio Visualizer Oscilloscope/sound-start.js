import {hslToRgb} from './utils-start.js';
const WIDTH = 1000;
const HEIGHT = 1000;

const canvas=  document.querySelector('canvas');

const ctx = canvas.getContext('2d'); 

canvas.width = WIDTH;
canvas.height = HEIGHT;
//get the audio and itme
let analyzer;

let bufferLength;

function handleError(){
    console.log('you must give access to your mic in order to proceed');

}

async function getAudio(){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(handleError);

    const audioCtx = new AudioContext();
    
    analyzer = audioCtx.createAnalyser();

    const source = audioCtx.createMediaStreamSource(stream);
    
    source.connect(analyzer);

    //how much data do collect
    analyzer.fftSize = 2 ** 10;
    // analyzer.fftSize = 2 ** 6;

    bufferLength = analyzer.frequencyBinCount;
    // console.log(buffer)
    //pull the data off the audio
    const timeData = new Uint8Array(bufferLength);

    // console.log(timeData);
    const frequencyData = new Uint8Array(bufferLength);

    drawTimeData(timeData);
    drawFequency(frequencyData);
}

function drawTimeData(timeData){

    //inject the time data into our timeData array
    analyzer.getByteTimeDomainData(timeData);
    // console.log(timeData);
    // now we have the data , lets turn it into something visual.
    //1. clear the canvas
    ctx.clearRect(0,0,WIDTH,HEIGHT);

    //2. setup some canvas drawing 
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#ffc600';
    ctx.beginPath();
    const sliceWidth = WIDTH / bufferLength;
    // console.log(sliceWidth);
    let x = 0;
    timeData.forEach((data,i)=>{
        const v = data / 128;
        const y = (v * HEIGHT) /2;
        //draw our line
        if(i === 0 )
        {
            // canvas.removeAttributeNode(v,y);
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y)
        }
        x += sliceWidth;

    });

    ctx.stroke();
    //console.log(timeData);
    //call itself as soon as possible when browswer will go to paint the browswer again
    requestAnimationFrame(()=>{
        drawTimeData(timeData);
    })

}


function drawFequency(frequencyData){
    //get the frequecy data into our frequencuy data array
    analyzer.getByteFrequencyData(frequencyData);
    // console.log(frequencyData);

    //first we need to figure out the bar width 
    const barWidth = (WIDTH / bufferLength) * 2.5;
    console.log(barWidth);
    let x = 0 ;
    frequencyData.forEach( amount => {
        // 0 to 255
        const percent = amount / 255;
        const [h,s,l] = [ 360/(percent * 360) - 0.5  , 0.8 , 0.5 ];
        
        const barHieght = (HEIGHT * percent)/2;

        //TODO: convert the color to HSL 
        const [r, g, b] = hslToRgb(h,s,l)
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        // ctx.fillStyle = 'red';
        //ctx.fillStyle = 'rgba(255,255,0,0.2)';
        ctx.fillRect(
            x,  //starting x 
            HEIGHT - barHieght, //start y
            barWidth,   //how wide it will be  
            barHieght   //how height it will be
        );

        x += barWidth //+ 10 ;

    });
    

    //call itself as soon as possible when browswer will go to paint the browswer again
    requestAnimationFrame(() => {
        drawFequency(frequencyData);
    })
}

getAudio();

//one fucntion get audio 

//one function get the audio bar

//one function draw the time bar