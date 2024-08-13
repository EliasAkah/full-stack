// if (window.jQuery){
//     alert('i am here');
// }
// else{
//     alert('u cased me.');
// }

// alert("i am javascript");

$('nav ul li a').click(function() {

    var thisSection = $(this).attr('href');
    var thisLink = $(this);

    $('html, body').stop().animate({scrollTop: $(thisSection).offset().top - 200}, 3000, function(){
        $('nav ul li a').removeAttr('class');
        thisLink.addClass("selected");
        // alert($(widow).scrollTop);
    });
    return false;
    
}); //end click handler


$(window).on('load', function(){
    var allLinks = $('nav ul li a');
    var prevCounter = 0;
    var posts = $('section');
    var pageTop;
    var postPos;
    var counter = 0;
    var doneResizing;

    var postTops = [];

    resetPagePosition();

    // console.log(postTops);

    $(window).scroll(function(){

        // if the window is scrolled down
        pageTop = $(window).scrollTop() + 210;
        if(pageTop > postTops[counter + 1]){
            counter++;
            // console.log(`scrolling down ${counter}`);
        }

        //if the window is scrolled down
        else if(pageTop > 0 && pageTop < postTops[counter]){
            counter--;
            // console.log(`scrolling up ${counter}`);
        }

        if(counter != prevCounter){
            $(allLinks).removeAttr('class');
            $('nav ul li a').eq(counter).addClass('selected');
            prevCounter = counter;
        }
    });

    $(window).on('resize', function(){
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function(){
            resetPagePosition();
        }, 500);
    });
    function resetPagePosition(){
        postTops = [];

            posts.each(function(){
                postTops.push(Math.floor($(this).offset().top));
            });
            // console.log(postTops);

            var pagePosition = $(window).scrollTop()+210;
            counter = 0;

            for(var i = 0; i< postTops.length; i++){
                if(pagePosition < postTops[i]){
                    counter++;
                }
            }
            counter--;

            $(allLinks).removeAttr('class');
            $('nav ul li a').eq(counter).addClass('selected');
    }
});




// scrollTop is an html element that is used to det the position of the content from the top in the window when 
// the window is scrolled.

