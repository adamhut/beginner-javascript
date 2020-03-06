import { convert } from './lib-start.js'
import { formatCurrency } from './utils-start.js';
import { fromInput, fromSelect,toSelect,toAmount} from './elements-start.js';

export async function handleInput(e) {
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