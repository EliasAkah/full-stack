document.getElementById('myform').onsubmit = validateForm;

// Form Validation Function:
function validateForm(){

    let reName  = /^[a-zA-Z]+(([\'\- ][a-zA-Z])?[a-zA-Z]*)*$/;
    let reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let reUrl =  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    // Clear Previous Error Messages:
    document.getElementById('name-err').innerHTML = "";
    document.getElementById('email-err').innerHTML = "";
    document.getElementById('url-err').innerHTML = "";
    document.getElementById('comments-err').innerHTML = "";

    // Counter Initialization:
    var counter = 0;

    // Form Field Validation
    if(!reName.test(document.getElementById('name').value)){

        fixForm(document.getElementById('name'), "please provide a proper name");
        counter++;
    }

    else if(!reEmail.test(document.getElementById('email').value)){

        fixForm(document.getElementById('name'), "please add a valid email address");
        counter++;
    }

    else if(!reUrl.test(document.getElementById('url').value)){

        fixForm(document.getElementById('url'), "please type a valid URL in the form of 'http://example.com");
        counter++;
    }

    else if((document.getElementById('comments').value)){

        fixForm(document.getElementById('comments'), "please provid soome comments");
        counter++;
    }

    // Error Counter Check:
    if(counter > 0){
        return false;
    }
    else{
        return true;
    }

    // Error Message Display:
    function fixForm(field, message){
        var erroMessage = field.id + "-err"; //field.id is used to retrieve a the id of the field entered and then catenated with "-err", to form a new id
        document.getElementById(erroMessage).innerHTML = message;
        document.getElementById(erroMessage).style.color = 'red';
        document.getElementById(field.id).focus();
    }
}