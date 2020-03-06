const fromInput = document.querySelector('[name=from_amount]');
const fromSelect = document.querySelector('[name=from_currency]');
const toSelect = document.querySelector('[name=to_currency]');
const toAmount = document.querySelector('.to_amount');

const endpoint = "https://api.exchangeratesapi.io/latest";

const form = document.querySelector('.app form');

const ratesByBase={};;

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options){
    // console.log(options);
    // console.log(Object.entries(options));
    return Object.entries(options).map(([currencyCode, currencyName])=>{
      // console.log(currencyCode, currencyName)
      return `<option value="${currencyCode}">  ${currencyCode} - ${currencyName} </option>`        
    }).join('');


}

async function fectchRate(base="USD"){

  const res = await fetch(`${endpoint}?base=${base}`);

  const rates = await res.json();

  // console.log(rates);

  return rates;

}

async function convert(amount ,from , to){
    // first check if we have the rate from that currency

    if(! ratesByBase[from]){
        const rates = await fectchRate(from);
        ratesByBase[from] = rates;
        console.log(`Oh no ,we don't have the rate from ${from } covert to ${to} , let us go get it`);
    }
  
    //convert that amount that they passed in
    
    const rate = ratesByBase[from].rates[to];
    
    const convertedAmount = amount *rate;

    console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
    
    return convertedAmount;
}

function formatCurrency(amount, currency){

    // make sure you get the locale
    return Intl.NumberFormat('en-US' , {
        style:'currency',
      currency: currency,
    }).format(amount);


}

async function handleInput(e){
    console.log(e.target);
    console.log(e.currentTarget);
    const rawAmount = await convert(
      fromInput.value,
      fromSelect.value,
      toSelect.value
    );
      console.log(`to ${toSelect.value}`);
    // console.log(rawAmount);

    

    toAmount.textContent = formatCurrency(rawAmount, toSelect.value);

}

fectchRate();

const optionsHtml = generateOptions(currencies);

fromSelect.innerHTML = optionsHtml;

toSelect.innerHTML = optionsHtml;

form.addEventListener('input',handleInput)

// console.log(optionsHtml);
