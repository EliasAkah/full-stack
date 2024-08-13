(function(){

    "use strict";

    const formProcesssorUrl = "https://cpe-web-assignments.ucdavis.edu/formprocessing/processor.php";
    const contactForm = document.getElementById('myform');
    contactForm.addEventListener('submit', validateForm);

    // Form Validation Function:
    function validateForm(event){

        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const url = document.getElementById('url').value;
        const comments = document.getElementById('comments').value;
    
        let reName  = /^[a-zA-Z]+(([\'\- ][a-zA-Z])?[a-zA-Z]*)*$/;
        let reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let reUrl =  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

        const allLabels = document.querySelectorAll('label');
        allLabels.forEach(eachLabel => {
            eachLabel.style.color = 'black';
        });
    
        // Counter Initialization:
        var errors = 0;
    
        // Form Field Validation
        if(!reName.test(name)){
           document.getElementById('name-label').style.color = "red";
            errors++;
        }
    
        else if(!reEmail.test(email)){
            document.getElementById('email-label').style.color = "red";
            errors++;
        }
    
        else if(url == '' || !reUrl.test(url)){
            document.getElementById('url-label').style.color = "red";
            errors++;
        }
    
        else if(comments == ""){
            document.getElementById('comments-label').style.color = "red";
            errors++;
        }
    
        // Error Counter Check:
        else if(errors === 0){
            sendData();
        }
    }

    async function sendData(){
        //serializing form data and assigning it to the variable data
        let data = new FormData(contactForm);
        //sending data to formProcessorUrl
        let fetchPromise = await fetch(formProcesssorUrl, {method: 'POST', body: data});
        //getting the data using the await keyword
        let content = await fetchPromise.text();
        document.getElementById('formdata').innerHTML = content;
        //clearing the form
        const fields = document.getElementById('.data');
        fields.forEach(eachField => {
            eachField.value = '';
        });
    }
}());

