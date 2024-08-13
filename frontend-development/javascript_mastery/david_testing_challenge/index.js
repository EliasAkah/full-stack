// (function(){
// "use strict";

// var images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image6.jpg"]
// document.getElementById("next1").addEventListener('click', nextImages);
// document.getElementById("prev1").addEventListener('click', prevImages);
// var currentImage = 0;


// function nextImages() {
//     currentImage++;
//     if(currentImage > images.length-1)
//     {
//         currentImage = images.length-1;
//     }
//     document.getElementById('pictures').src = 'image/'+ images[currentImage];
    
// }

// function prevImages() {
//     currentImage--;
//     if(currentImage < 0)
//     {
//         currentImage = images.length-images.length;
//     }
//     document.getElementById('pictures').src = 'image/'+ images[currentImage];
// }})(); 


// (function(){
//     "use strict";
    
//    var currentImage = 0;
//    var images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image6.jpg"];
//    var container =  document.getElementById('cont');
//    var prevBtn = document.getElementById("prev");
//    var nextBtn = document.getElementById("next");
   
//    nextBtn.addEventListener('click', function (event) {
//         event.preventDefault();
//         document.getElementById("next").style.backgroundColor = 'grey';
       
//         currentImage++;
//         if(currentImage > images.length-1)
//         {
//             currentImage = images.length-1;
//         }
//         var newSlide = document.createElement('img');
//         newSlide.src = 'image/'+ images[currentImage];
//         newSlide.className = 'fading';
//         container.appendChild(newSlide);
        
//     });

//    prevBtn.addEventListener('click', function (event) {
//         event.preventDefault();

//         currentImage--;
//         if(currentImage < 0)
//         {
//             currentImage = images.length-images.length;
//         }
//         var newSlide = document.createElement('img');
//         newSlide.src = 'image/'+ images[currentImage];
//         newSlide.className = 'fading';
//         container.appendChild(newSlide);
//         document.getElementById("prev").style.backgroundColor = 'grey';

//         if (currentImage > 2){
//             container.removeChile(container.children[0]);
//         }
// });
// })();


// (function(){
//         "use strict";
    
//    var images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image6.jpg"];
//    var container =  document.getElementById('cont');
//    var prevBtn = document.getElementById("prev1");
//    var nextBtn = document.getElementById("next1");
//    var currentImage = 0;

//    nextBtn.addEventListener('click', function (event) {
//         event.preventDefault();

//         currentImage++;
//         if(currentImage > images.length-1)
//         {
//             currentImage = images.length-1;
//         }
//         var newSlide = document.createDocument('img');
//         newSlide.src = 'image/' + images[currentImage];
//         newSlide.className = 'fading';
//         container.appendChild(newSlide);
        
//     });

//    prevBtn.addEventListener('click', function (event) {
//         event.preventDefault();

//         currentImage--;
//         if(currentImage < 0)
//         {
//             currentImage = images.length-images.length;
//         }
//         var newSlide = document.createDocument('img');
//         newSlide.src = 'image/' + images[currentImage];
//         newSlide.className = 'fading1';
//         container.appendChild(newSlide);
    
// });
// })();



(function(){
    "use strict";
    
   let currentImage = 0;
   const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image6.jpg"];
   const container =  document.getElementById('cont');
   const prevBtn = document.getElementById("prev");
   const nextBtn = document.getElementById("next");
   
   nextBtn.addEventListener('click', function (event) {
        event.preventDefault();
        currentImage++;
        if(currentImage > images.length-1)
        {
            currentImage = images.length-1;
        }
        slideShow();
        document.getElementById("next").style.backgroundColor = 'grey';
    });

   prevBtn.addEventListener('click', function (event) {
        event.preventDefault();
        currentImage--;
        if(currentImage < 0)
        {
            currentImage = images.length-images.length;
        }
        slideShow();
        document.getElementById("prev").style.backgroundColor = 'grey';
});

function slideShow(){
    
        let newSlide = document.createElement('img');
        newSlide.src = 'image/'+ images[currentImage];
        newSlide.className = 'fading';
        container.appendChild(newSlide);

        if (container.children.length > 2){
            container.removeChild(container.children[0]);
        }
}

})();


/* parseFLoat =  converts string to a decimal value
    parseInt =  converts string to an integer value
    element.value =  takes the type in value and assign it to the elemen.
    event.code =  use to fingd out the key that was pressed. 
    "code" is used to replace the "which" keyword that was used in the passt
    */