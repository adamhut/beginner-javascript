const endpoint = "https://api.exchangeratesapi.io/latest";
const ratesByBase = {};

export async function fectchRate(base = "USD") {
    const res = await fetch(`${endpoint}?base=${base}`);
    const rates = await res.json();
    // console.log(rates);
    return rates;
}

export async function convert(amount, from, to) {
    // first check if we have the rate from that currency
    if (!ratesByBase[from]) {
        const rates = await fectchRate(from);
        ratesByBase[from] = rates;
        console.log(`Oh no ,we don't have the rate from ${from } covert to ${to} , let us go get it`);
    }

    //convert that amount that they passed in
    const rate = ratesByBase[from].rates[to];
    const convertedAmount = amount * rate;
    console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
    return convertedAmount;
}
