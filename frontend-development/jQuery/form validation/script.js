// Form Validation Function

function validateForm(){

    let re_name  = /^[a-zA-Z]+(([\'\- ][a-zA-Z])?[a-zA-Z]*)*$/;
    let re_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let re_url =  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    let counter;

    // Field Value Retrieval:
    $("#myForm").submit(function(event){
        let name = $('#name').val();
        let email = $('#name').val();
        let url = $('#url').val();
        let comments = $('#comments').val();

        // Error Message Clearing:
        $('#myForm span').htm('').css('color', red);

        // Error Count Initialization
        counter = 0;

        if (!re_name.test(name)){
            $('#name-err').html("please enter a valid name");
            counter++;
        }

        if (!re_email.test(email)){
            $('#email-err').html("please enter a valid email");
            counter++;
        }

        if (url != "" && !re_url.test(url)){
            $('#url-err').html("please enter a valid url");
            counter++;
        }

        if (comments == ''){
            $('#comments-err').html("please give me a comment!");
            counter++;
        }

        if(counter > 0){
            event.preventDefault();
        }

    });
}