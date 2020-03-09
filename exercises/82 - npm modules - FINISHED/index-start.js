import wait from 'waait';
import faker from 'faker';
import {name} from "faker";
import {formatDistance} from 'date-fns';



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