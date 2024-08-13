(function(){

    "use strict";

    const emailFormProcesssor = 'https://cpe-web-assignments.ucdavis.edu/formprocessing/emailprocessor.php';
    const contactForm = document.getElementById('contactform');
    contactForm.addEventListener('submit', validateForm);

    //creating an error feedback message using an array
    const feedBackMessage = [
        '<div class = "error"><h3>Ooops!</h3><p>The name field is required, that\'s how i know who you are. pls fix that and try again </p></div>',
        '<div class = "error"><h3>Ooops!</h3><p>You forgot to give a valid email address. pls fix that and try again </p></div>',
        '<div class = "error"><h3>Ooops!</h3><p>comment box is empty. pls fix that and try again </p></div>',
        '<div class = "success"><h3>Thanks!</h3><p>All required infos have been properly entered</p></div>',
        '<div class = "preloader"><div class = "loading-dot"></div></div>'
    ];

    // Form Validation Function:
    function validateForm(event){

        event.preventDefault();

        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const commentField = document.getElementById('comment');
    
        let reName  = /^[a-zA-Z]+(([\'\- ][a-zA-Z])?[a-zA-Z]*)*$/;
        let reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    
        // Counter Initialization:
        let errors = 0;
    
        // Form Field Validation
        if(!reName.test(nameField.value)){
            displayMessage(nameField, feedBackMessage[0]);
            errors++;
        }
    
        else if(!reEmail.test(emailField.value)){
            displayMessage(emailField, feedBackMessage[1]);
            errors++;
        }
    
        else if(commentField.value == ""){
            displayMessage(commentField, feedBackMessage[2]);
            errors++;
        }
    
        // Error Counter Check:
        else if(errors === 0){
            sendData();
        }
    }

    //displaying error / success messages
    function displayMessage(field, message){
        document.getElementById('message').className = "show-message";
        document.getElementById('message').innerHTML = message;
        setTimeout(function(){
            document.getElementById('message').classList.add("fadeOutElement");
            setTimeout(function(){
                if(field != 'success'){
                    document.getElementById('message').className = "hide-message";
                    document.getElementById(field.id).focus();
                }
                else{ 
                    document.getElementById('message').className = "hide-message";
                    document.getElementById('name').value = "";
                    document.getElementById('email').value = "";   
                    document.getElementById('comment').value = "";
                
                }
            }, 2000);
        }, 2000);

    }

    //sending data asynchronously
    function sendData(){
        document.getElementById('message').className = "show-message";
        document.getElementById('message').innerHTML = feedBackMessage[4];
        setTimeout(async function(){
            //serializing form data and assigning it to the variable data
            let formdata = new FormData(contactForm);
            //sending data to formProcessorUrl
            let fetchPromise = await fetch(emailFormProcesssor, {method: 'POST', body: formdata});
            //getting the data using the await keyword
            let data = await fetchPromise.json();
            console.log(data.result);
            if(data.result == 'success'){
                displayMessage('success', feedBackMessage[3]);
            }
        }, 2000);
    }

}());

