export function formatCurrency(amount, currency) {

    // make sure you get the locale
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);


}

export function generateOptions(options) {
    // console.log(options);
    // console.log(Object.entries(options));
    return Object.entries(options).map(([currencyCode, currencyName]) => {
        // console.log(currencyCode, currencyName)
        return `<option value="${currencyCode}">  ${currencyCode} - ${currencyName} </option>`
    }).join('');

}