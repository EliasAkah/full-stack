$(window).on('load', function() {
    // Function executes when the window has loaded completely
    
    // Calculate total width needed to display all images
    const imageCount = $('#slider ul li').length;
    const imageWidth = $('#slider ul li img').first().width();
    const totalWidth = (imageCount * imageWidth) + 'px';
    
    // Display total width for debugging
    alert(totalWidth);

    // Initialize variables
    let leftPosition = 0;
    let counter = 0;

    // Set width of slider container
    $('#slider ul').css("width", totalWidth);

    let mySlider = setInterval(slider, 3000);
    // Handle click event for "Next" button
   function slider(){
        counter++;

        // Check if all images have been shown
        if(counter == imageCount){
            // Clone the entire slider and append it to the end
            $('#slider ul').clone().appendTo('#slider');
            // Move the cloned slider to the right of the original slider
            $('#slider ul').last().css('left', imageWidth + 'px');

            // Calculate left position to slide the original slider
            leftPosition = `-${totalWidth}`;

            // Animate the cloned slider to slide into view from the right
            $('#slider ul').last().animate({left: 0}, 700, 'easeInQuad');
            // Animate the original slider to slide to the left
            $('#slider ul').first().animate({left: leftPosition}, 700, 'easeInQuad', function(){
                // Remove the first slider once animation is complete
                $('#slider ul').first().remove();
            }, 3000);

            // Reset counter
            counter = 0;
        }
        else{
            // Calculate left position to slide images to the left
            leftPosition = -(imageWidth * counter) + 'px';
            // Animate slider to slide leftward
            $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad', function(){});
        }
    
    }


   

    // document.getElementById('slider').addEventListener('mouseover', function(){
    //     clearInterval(mySlider);
    // });

    // document.getElementById('slider').addEventListener('mouseout', function(){
    //     mySlider = setInterval(slider, 3000);
    // });


     

    $('#slider').hover(function(){
        clearInterval(mySlider);
   }, function(){
        mySlider = setInterval(slider, 3000);
    });
    

});