$.validator.addMethod("phoneRegex", function(value, element){
    return this.optional(element) || /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/i.test(value);
}, "Please type a valid U.S. Phone Number");

$('#myForm').validate({
    rules: {
        name: 'required',
        email: {required: true, email: true},
        'cheese[]': {required: true, minlength: 3, maxlength: 3},
        phone: {required: true, phoneRegex: true},
        cheesetype: 'required'
    },
    messages: {
        name: 'Hi there, please provide your name!',
        email: {required: "you must porvide an email", email: "a valid email address, please!"},
        'cheeese[]': 'please select three cheeses!',
        phone:{required: "please provide a phone number", phone: ''},
        cheesetype: "Type of preferred cheese is required!" 
    },
    errorContainer: '#messagebox',
    errorLabelContainer: '#messagebox ul',
    wrapper: 'li'
});