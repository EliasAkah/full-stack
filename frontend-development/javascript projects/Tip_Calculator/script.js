const btnEl = document.getElementById('calculate');
const billEl = document.getElementById('bill');
const tipEl = document.getElementById('tip');
const totalSpan = document.getElementById('total');


function calculateTotal(){
    const billValue = billEl.value;
    const tipValue = tipEl.value;

    const totalAmount = (billValue * (1 + tipValue)/100).toFixed(2);

    totalSpan.innerText = `$ ${totalAmount}`;
    
}

btnEl.addEventListener('click', calculateTotal);



