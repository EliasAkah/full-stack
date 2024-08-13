const counterEl =  document.querySelectorAll('.counter');

counterEl.forEach(counterEl => {
    counterEl.innerText = "0";
    incrementCounter();

    function incrementCounter(){
        //converting the counterEl.innerText from string to integer
        let currentNum = +counterEl.innerText;

        //retrieving the value of data-ceil from the counterEl
        const dataCeil = counterEl.getAttribute('data-ceil');
        
        const increment = dataCeil / 15;
        currentNum = Math.ceil(currentNum + increment);

        console.log(currentNum );
        if(currentNum < dataCeil){
            counterEl.innerText = currentNum;
            setTimeout(incrementCounter, 50);
        }else{
            counterEl.innerText = dataCeil;
        }
    }

})