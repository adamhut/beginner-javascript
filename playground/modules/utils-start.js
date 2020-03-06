

// export const last ='huang';
const last = 'huang';
const middle = 'Slam Dunk';

const first='I am first default';

export function returnHi(name){

    return `hi ${name} ${last}`
}
//or => NAMED exports =>we can have as many as we want

export {
    last,
    middle
}

export default first;