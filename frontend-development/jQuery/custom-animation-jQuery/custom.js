if(window.jQuery){
    alert('welcome to jQuery');
}
else{
    alert('goodbye jQuery');
}


$('#growbox').click(function(){
    $('#box2').animate({width: '450px'}, 3000);
});

$('#growtext').click(function(){
    $('#box2').animate({fontSize: '30px'}, 1000);
});

$('#movebox').click(function(){
    $('#box2').animate({left: '+=350px'}, 3000);
});

$('#doall').click(function(){
    $('#box2').animate({width: '450px', left: '+=350px', fontSize: '50px'}, 3000);
});

$('#sequence').click(function(){
    $('#box2').animate({width: '450px'}, 3000, function(){
        $('#box2').animate({fontSize: '30px'}, 1000, function(){
            $('#box2').animate({left: '+=350px'}, 3000);
        });  
    });
});