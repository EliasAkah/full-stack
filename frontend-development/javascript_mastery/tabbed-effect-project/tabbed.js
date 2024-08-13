(function(){
    // Enable strict mode for better error handling and code quality
    "use strict";

    // Select all anchor elements inside list items under an element with ID 'tabs'
    const tabs = document.querySelectorAll('#tabs > ul > li > a');


    // Iterate over each tab and attach a click event listener to each one
    // for(let i = 0; i < tabs.length; i++){
    //     tabs[i].addEventListener('click',selectTabs)
    // }

    tabs.forEach(function(tab){
        tab.addEventListener('click', selectTabs);
    });

    // Function to handle tab selection when clicked
    function selectTabs(event){

            // Prevent the default action of the anchor element 
            event.preventDefault();

            // for(let i = 0; i < tabs.length; i++){
            //     tabs[i].removeAttribute('class');
            // }

            // Remove 'class' attribute from all tabs to reset their appearance
            tabs.forEach(function(tab){
                tab.removeAttribute('class');
            });

        // Add 'active' class to the clicked tab to indicate it's selected 
        event.target.className = 'active';

        // Get the target content associated with the clicked tab
        const thisTab = event.target.getAttribute('href');
        const thisContent = document.querySelector(thisTab);

        // Get the currently visible content
        const oldContent = document.querySelector('.visible');
        oldContent.className = 'visuallyhidden';

         // Add event listener to handle transition end for smoother UI changes
        oldContent.addEventListener('transitionend', function(){
            oldContent.className = "hidden"; // Hide the old content completely
            thisContent.className = 'visible visuallyhidden'; // Show the new content

            // Remove 'visuallyhidden' class after a short delay for smooth transition
            
            setTimeout(function(){
                thisContent.classList.remove('visuallyhidden');
            }, 200);


        }, {capture: false, once: true, passive: false});

    }
})();


// ARROW FUNCTION DISCRIPTION

// Iterate over each tab and attach a click event listener to each one
// tabs.forEach(tab=>{
//     tab.removeAttribute('class');
// });