window.addEventListener('load', function(){

    // how many slides?
    const slideCount =  document.querySelectorAll("#slide-wrapper ul li").length;

    //how wide is each slide?
    const slideWidth = document.querySelector("#slide-wrapper").offsetWidth;

    //total width of slider
    const totalWidth = slideCount * slideWidth + 'px';

    // slider DOM element
    const slider = document.querySelector("#slide-wrapper ul");
 
    const next = document.getElementById("next");

    const previous = document.getElementById('prev');
    

    let leftPosition = 0;
    let counter = 0;
    slider.style.width = totalWidth;

    next.addEventListener('click', function(event){
        event.preventDefault();

        next.style.backgroundColor = 'green';

        setTimeout(function() {
            next.style.backgroundColor = '';
        }, 200);
        
        counter++;

        if(counter == slideCount){

            counter = 0;
            leftPosition = 0;
            slider.style.left = leftPosition;
        }
        else{

            leftPosition = `-${counter * slideWidth}px`;
            slider.style.left = leftPosition;
        } 
   
    });

    previous.addEventListener('click', function(event){
        event.preventDefault();

        prev.style.backgroundColor = 'green';
        
        setTimeout(function() {
            prev.style.backgroundColor = '';
        }, 50);

        counter --;

        if(counter < slideCount){

            counter = slideCount - 1;
            leftPosition = 0;
            slider.style.left = leftPosition;
        }
        else{

            leftPosition = `-${counter * slideWidth}px`;
            slider.style.left = leftPosition;
        }
   
    });

});