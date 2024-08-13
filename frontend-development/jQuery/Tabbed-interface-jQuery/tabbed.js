(function(){
    'use strict';

    //assign a function to  be executed to when an of the link is clicked
$('#tabs > ul > li > a').click(function(){

    //changing the backgroundcolors and colors of all the links to be the same
    $('#tabs > ul > li > a').css({background: '#808080', color: 'black'});

    //changing the color of any of the links to that is clicked
    $(this).css({background: '#eaeaea', color: '#333'});

    // retrieves the 'href' attribute of the clicked link. This is assumed to be an ID of a corresponding div.
    const thisTab = $(this).attr('href');

    // alert(thisTab);

    //fades out the currently visible div.
    $('#tabs > div:visible').fadeOut(1000, function(){

        //fades in the div associated with the clicked link once the fade-out is complete.
        $(thisTab).fadeIn(1000);
    });

});
})();
