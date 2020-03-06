// import currencies from './currencies.js';

export async function handleButtonClick(event) {
    
    //dynamic load the currency
    const currenicesModule = await import('./currencies.js')
    console.log(currenicesModule.default);
    const { localCurrency,default:currency } = await import('./currencies.js')
    console.log( localCurrency,currency);

}