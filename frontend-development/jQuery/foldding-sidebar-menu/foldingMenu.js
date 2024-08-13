// (function(){

//     'use strict';

//     const subMenus =  document.querySelectorAll('ul li ul');
//     const mainMenu = document.querySelectorAll('.menulink');

// // for (var i = 0; i < subMenus.length; i++){
// //     subMenus[i].className = 'hide-menu';
// // }

// function hideFunction(){
//     for (let i = 0; i < subMenus.length; i++){
//         subMenus[i].className = 'hide-menu';
//     }
// }
// hideFunction();



// for (let i = 0; i < mainMenu.length; i++){

//     mainMenu[i].addEventListener('click', function(event){
        
//         event.preventDefault();

//         const thisMenu = this.parentNode.querySelector('ul');
//         // console.log(thisMenu.innerHTML);
//         // thisMenu.className = 'show-menu';

//         // we use classLIst and contains to solve the problem below
//         // the code tells the computer that if a classlist contains 'hide menu', if it is clicked it should show the submenu under it
//         // at the same time it should ensure that opens sublist is closed.
//         if(thisMenu.classList.contains('hide-menu')){   
//            hideFunction();
            
//             thisMenu.className = 'show-menu';
//         }
//         else{
//             thisMenu.className = 'hide-menu';
//         }

//     });
    
// }

// })();


// // BEST PRACTICE STEPS FOR JAVASCRIPT

// // 1) Put the script in a separate script File
// // 2) add an IIFE closure (immediately invoked function expression)
// // 3) add the 'use strict' directive
// // 4) change all the variable declarations to const or let (if the variable changes);
// // 5) llink the script in the head of the page and be sure to add the defer property in the script tag

// if (window.jQuery) {
//     alert("i am using jQuery");
// }
// else{
//     alert("help! jquery is not lost");
// }

// $('ul li ul').css('display', 'none'); or// hide the submenu under all the main menu

(function(){

    'use strict';

    $('ul li ul').hide();// hide the submenu under all the main menu

    $('.menulink').click(function() {
        const thisMenu = $(this).next('ul');// select the next ul after the first ul
        // console.log(thisMenu.html());

        // if(thisMenu.is(':visible')){
        //     thisMenu.hide();
        // }
        // else{
        //     thisMenu.show();
        // }

        $('ul li ul').not(thisMenu).hide();// hide every other submenu execept(not) the one clicked on
        thisMenu.toggle();// hide all hide menu if it is visible and show menu if it is hidden.
    });

})();

