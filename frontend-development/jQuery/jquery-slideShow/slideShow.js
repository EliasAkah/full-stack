$(window).on('load', function() {

    const imageCount = $('#slider ul li').length;
    const imageWidth = $('#slider ul li img').first().width();
    const totalWidth = (imageCount * imageWidth) + 'px';
    // alert(totalWidth);

    let leftPosition = 0;
    let counter = 0;

    $('#slider ul').css("width", totalWidth);

    $('#next').click(function(){
        counter++;

        if(counter === imageCount){
            counter = 0
            
        }
        
        leftPosition = -(imageWidth * counter) + 'px';
        $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad');

    });


    $('#previous').click(function(){
        counter--;

        if(counter < 0 ){
            counter = (imageCount - 1);
        }
        
        leftPosition = -(imageWidth * counter) + 'px';
        $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad');

    });

});
