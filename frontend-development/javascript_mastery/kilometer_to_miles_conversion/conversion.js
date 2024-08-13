(function(){
    "use strict";

    const header1 = document.querySelector('h1');
    const paragraph =  document.querySelector('p');
    const header2 = document.querySelector('#invisible');
    const form = document.getElementById('convert');
    let convertType = "miles";

    // altering the value of the  header1, paragraph, and convertType when KeyK or KeyM is pressed down.
    window.addEventListener('keydown', function(event) {

        let key = event.code;
        
        if (key === 'KeyK'){
            convertType = "kilometers";
            header1.innerHTML = 'miles to kilometers converter';
            paragraph.innerHTML = 'Type in the number in miles and click the button to convert the distance to kilometers';
        }
        else if (key === 'KeyM') {
            convertType = "miles";
            header1.innerHTML = 'kilometers to miles converter';
            paragraph.innerHTML= 'Type in the number in kilometers and click the button to convert the distance to miles';
        }

    });

    // conversion of the value of the distance from km to miles/ miles to km when the form is submited.
    form.addEventListener('submit', function(event){
        event.preventDefault();

        let distance = document.getElementById('distance').value;

    distance =  parseFloat(distance);

    if(distance){

            if (convertType == "miles"){
                const roundedConversion = (distance * 0.621371192).toFixed(4);
                //roundedConversion = roundedConversion.toFixed(3); 
                // roundedConversion =  (Math.round(roundedConversion * 1000))/1000;
                header2.innerHTML = `${distance} kilometers is converted to ${roundedConversion} miles`;
            }
            else if (convertType == "kilometers"){
                const roundedConversion1 = (distance * 1.609344).toFixed(4);
                //roundedConversion1 = roundedConversion.toFixed(3); 
                // roundedConversion =  (Math.round(roundedConversion * 1000))/1000;
                header2.innerHTML = `${distance} miles is converted to ${roundedConversion1} kilometers`;
            }
            
    }
        else{
            header2.innerHTML = `the value entered is not a number`;
        }
    });

})();

// (Math.round(number * 1000))/1000 =  used to convert a decimal number into 3 decimal places.
// parsFloat is used to convert a  string into a decimal number
// parseinteger is used to convert a number into an integer

/* parseFLoat =  converts string to a decimal value
    parseInt =  converts string to an integer value
    element.value =  takes the type in value and assign it to the elemen.
    event.code =  use to find out the key that was pressed. 
    "code" is used to replace the "which" keyword that was used in the past
    variable.toFixed(number of decimal places) = use to a number into a desired number of decimal places.
*/