import wait from 'waait';
import faker from 'faker';
import {name} from "faker";
import {formatDistance,format} from 'date-fns';
import axios from 'axios';
import {intersection} from 'lodash'


console.log(`hello ${faker.name.firstName()}`);

const names =Array.from({length:10}, name.firstName);

const fakeNames = Array.from({ length: 10 }, ()=>{
    return `${name.firstName()} Huang`;
});

// console.log(fakeNames);
// console.log(names);

let diff = formatDistance(
  new Date(1986, 3, 4, 11, 32, 0),
  new Date(1986, 3, 4, 10, 32, 0),
  { addSuffix: true }
) //=> 'in about 1 hour'

console.log(diff);

diff = formatDistance(
  new Date(),
  new Date(2020, 3, 4, 10, 32, 0),
  { addSuffix: true }
) //=> 'in about 1 hour'


console.log(diff);
async function go(){
    console.log('going');

    wait(200)
    console.log('ending')
}

go()


//January the 12th 2020
const date  = new Date();

const formatted  = format(date,`LLLL 'the' do y`)
console.log(formatted);

async function getJoke(){
  // const res = await axios.get('https://icanhazdadjoke.com',{
  //     headers:{
  //       Accept:'application/json',
  //     }
  // });

  // console.log(res);
  const {data} = await axios.get('https://icanhazdadjoke.com', {
     headers: {
       Accept: 'application/json',
     }
   });

   console.log(data);
}

getJoke();


const a = [1,2,3,4,5,6,7,8,9]
const b = [5, 3, 11, 7, 11,33, 44, 55,66];

const sameValues = intersection(a,b);

console.log(sameValues);