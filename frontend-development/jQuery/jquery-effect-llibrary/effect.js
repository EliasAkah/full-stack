if (window.jQuery){
    alert('welcome to jQuery');
}
else{
    alert('jQuery is not used');
}


var hidebutton = document.querySelector('#hide-box');

hidebutton.addEventListener('click', function(event){
    event.preventDefault();
    $('#box').hide(2000);
});

// var showButton = document.querySelector('#show-box');

$('#toogle-box').click(function(event){
    event.preventDefault();
    $('#box').toggle(3000, function(){
        alert('the job is done');
    });
});


var showButton = document.querySelector('#show-box')

showButton.addEventListener('click', function(event){
    event.preventDefault();
    $('#box').show(2000);
});


$('#slideUpBox').click(function(){
    $('#box').slideUp('slow');
});

$('#slideDownBox').click(function(){
    $('#box').slideDown('2000', 'swing');
});

$('#slideToggle').click(function(){
    $('#box').slideToggle('slow');
});







//important jquery functions
// show(); add speed inside the bracket for animation effect in form of numbers
// hide(); hide a details
// toogle(); choose between hide and show
// slidedown(); attributes: swing, easeout
// slidedown();
// slidetoggle();
// fadein();
// fadeout(); attributes: use jquery ease out libraries cdn to use the already defined rules
// fadeto(); used dshow the opacity of an Object.

// ease library plug in should come after the jquery script and before the javascript