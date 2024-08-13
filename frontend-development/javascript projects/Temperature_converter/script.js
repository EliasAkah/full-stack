const celciusEl = document.querySelector("#cel");
const fahrenheitEl = document.querySelector("#fah");
const kelvinEl = document.querySelector("#kel");

function computeTemp(event){
    //converting the current value of each temp to a number
    let currentValue = +event.target.value;

    switch(event.target.name){
        case "cel":
            kelvinEl.value = (currentValue + 273.32).toFixed(2);
            fahrenheitEl.value = (currentValue * 1.8 + 32).toFixed(2);
            break;
        case "fah":
            celciusEl.value = ((currentValue - 32) / 1.8).toFixed(2);
            kelvinEl.value = (((currentValue - 32) / 1.8) + 273.32).toFixed(2);
            break;
        case "kel":
            celciusEl.value = (currentValue - 273.32).toFixed(2);
            fahrenheitEl.value = ((currentValue - 273.32) * 1.8 + 32).toFixed(2);
            break;
        default: 
            break;
    }
}
