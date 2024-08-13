   var currentImage = 0;
   var images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image6.jpg"];
   var container =  document.getElementById('content');
   var prevBtn = document.getElementById("prev1");
   var nextBtn = document.getElementById("next1");
   
   nextBtn.addEventListener('click', function (event) {
        event.preventDefault();

        currentImage++;
        if(currentImage > images.length-1)
        {
            currentImage = images.length-1;
        }
        var newSlide = document.createElement('img');
        newSlide.src = 'image/'+ images[currentImage];
        newSlide.className = 'fading';
        container.appendChild(newSlide);
        
    });

   prevBtn.addEventListener('click', function (event) {
        event.preventDefault();

        currentImage--;
        if(currentImage < 0)
        {
            currentImage = images.length-images.length;
        }
        var newSlide = document.createElement('img');
        newSlide.src = 'image/'+ images[currentImage];
        newSlide.className = 'fading1';
        container.appendChild(newSlide);
    
});