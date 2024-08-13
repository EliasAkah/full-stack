if (window.jQuery){
    alert('welcome to jQuery');
}
else{
    alert('jQuery is not used');
}


$("#fadeInBox").click(function(){
    $("#box1").fadeIn(1000, 'swing');
});

$("#fadeOutBox").click(function(){
    $("#box1").fadeOut(1000, 'swing', function(){
    alert("you did it!")});
});

$("#fadeto20").click(function(){
    $("#box1").fadeTo(1000, 0.2);
});


$("#fadeto50").click(function(){
    $("#box1").fadeTo(1000, 0.5); // 3000 = duration, 0.2 = opacity of the fade.
});

$("#fadeto70").click(function(){
    $("#box1").fadeTo(1000, 0.8);
});

$("#fadeto100").click(function(){
    $("#box1").fadeTo(1000, 1);
});