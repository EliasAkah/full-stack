(function () {
    "use strict";

    var myImages =  ["image1.jpg", "image2.jpg","image3.jpg", "image4.jpg", "image5.jpg"]
    var currentImage = 0;
    //document.getElementById('next').onclick = nextPhoto;
   // document.addEventListener('previous').onclick = previousPhoto;
    var forwardMovement  = document.getElementById('next').addEventListener('click', nextPhoto);
    var backwardMovement = document.getElementById('previous').addEventListener('click', previousPhoto);
    function nextPhoto(){
        currentImage++;
        if (currentImage > myImages.length-1){
            currentImage =  myImages.length-1;
        }
        document.getElementById('images').src =  myImages[currentImage];
    }

    function previousPhoto(){
        currentImage--;
        if (currentImage < 0){
            currentImage = myImages.length - myImages.length;
        }
        document.getElementById('images').src =  myImages[currentImage];
    }
})();


