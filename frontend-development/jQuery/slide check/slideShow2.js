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

    // Handle click event for "Next" button
    $('#next').click(function(){
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
            });

            // Reset counter
            counter = 0;
        }
        else{
            // Calculate left position to slide images to the left
            leftPosition = -(imageWidth * counter) + 'px';
            // Animate slider to slide leftward
            $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad', function(){});
        }
    
    });

     // Handle click event for "Previous" button
     $('#previous').click(function(){
        counter--;

        // Check if all images have been shown
        if(counter < 0){

            counter = imageCount- 1;

            $('#slider ul').clone().appendTo('#slider');
            $('#slider ul').last().css('left', `-${totalWidth}`);

            leftPosition = `-${imageWidth * counter}px`;

            $('#slider ul').last().animate({left: leftPosition}, 300, 'easeInQuad');
      
            $('#slider ul').first().animate({left: `${imageWidth}px`}, 300, 'easeInQuad', function(){

                $('#slider ul').first().remove();
            });

        }
        else{
            // Calculate left position to slide images to the left
            leftPosition = -(imageWidth * counter) + 'px';
            // Animate slider to slide leftward
            $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad');
        }
    
    });


    

});