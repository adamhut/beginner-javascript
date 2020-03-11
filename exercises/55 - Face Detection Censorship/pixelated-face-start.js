console.log('it works')

let video = document.querySelector('.webcam');

let canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');


let faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new FaceDetector();

const optionsInput = document.querySelectorAll('.controls input[type="range"]')
 
const options = {
    size: 10,
    scale: 1.35
};

// console.log(optionsInput);
function handleOption(e){
    console.log(e.currentTarget.value);
    console.log(e.currentTarget.name);
    const {value,name} = e.currentTarget;

    options[name]= parseFloat(value);
}

optionsInput.forEach(input =>input.addEventListener('input',handleOption))

const SIZE = 10;
const SCALE =1.5;




// console.log(faceDetector, video,canvas, faceCanvas);

async function populateVideo(){

    const stream =await navigator.mediaDevices.getUserMedia({
        video:{
            width:1280,
            height:720,
        }
        //or
        // video: true,
    });
    video.srcObject = stream;
    await video.play();
    // console.log(stream);
    //size the canvas as to be the same size of the video
    // console.log(video.videoWidth, video.videoHeight);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;

}


async function detect(){

    const faces = await faceDetector.detect(video);
    // console.log(faces.length);

    //ask the browser when the next animation frame is , and tell it ot run detect for us
    faces.forEach(drawFace);   
    faces.forEach(censor);

    requestAnimationFrame(detect)

}

function drawFace(face){
    faceCtx.imageSmoothingEnabled = false;
    // console.log(face)   
    const { width, height,top,left} = face.boundingBox;
    // console.log({width, height, top, left});
    //clear out the rectengal
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2;

    ctx.strokeRect(left, top , width, height)
}

// function censor(face){
//     const faceDetails = face.boundingBox;
// }
//or destructor it
function censor({boundingBox}){
    const face = boundingBox;
    // console.log(face);
    //draw the small face
    faceCtx.clearRect(0, 0, canvas.width, canvas.height);
    faceCtx.drawImage(
        //5 source args
        video,//where the source come from 
        face.x, //where do we start the source pull from,
        face.y,
        face.width,
        face.height,
        //4 drawing args
        face.x,//where should we start drawing  then x and y
        face.y,
        options.size, //how width
        options.size, //how height
    );
    const width = face.width * options.scale
    const height = face.height * options.scale
    // draw the small face bakc on , but sacle up
    
    // faceCtx.drawImage(
    //     faceCanvas,//source
    //     face.x, //where do we start the source pull from,
    //     face.y,
    //     SIZE,
    //     SIZE,
    //     //4 Drawing args
    //     face.x,
    //     face.y,
    //     face.width,
    //     face.height
    // )
    faceCtx.drawImage(
        faceCanvas,//source
        face.x, //where do we start the source pull from,
        face.y,
        options.size,
        options.size,
        //4 Drawing args
        face.x -( width- face.width) / 2, // need to recenter the image
        face.y - (height - face.height) / 2,
        width,
        height
    )


    //take that face back out and draw it back at normal size

}


populateVideo().then(detect);

