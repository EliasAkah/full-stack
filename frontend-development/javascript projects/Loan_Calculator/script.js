let loanAmountEl;
let InterestRateEl;
let monthlyPaymentEl;
let interest;
let monthlyPayment;
function calculateLoan(){
    //assign the value of the of each input to there respective variables
    loanAmountEl = document.getElementById('loan-amount').value;
    InterestRateEl = document.getElementById('interest-rate').value;
    monthlyPaymentEl = document.getElementById('months-to-pay').value;

    interest = (loanAmountEl * (InterestRateEl * 0.01) * (monthlyPaymentEl/12));
    console.log(interest);

    monthlyPayment = (loanAmountEl/monthlyPaymentEl + interest).toFixed(2);//toFixed() is used to assign the number of decimal places to a digit

    //updating the innerHTML of the html element with id "payment"
    document.getElementById('payment').innerHTML = `Monthly Payment: ${monthlyPayment}`;

}