// capturing events in javascript

// var clickButton = document.getElementsByTagName("button")[0].onclick = function () {
//     alert("don't click me!");
//     document.getElementById("dav").style.color = "white";
//     document.getElementById("dav").style.backgroundColor = "green";
//     setTimeout (function () {
//         document.getElementById("dav").style.color = "white";
//         document.getElementById("dav").style.backgroundColor = "green";
//     }, 100);
//    }
 

//OR

// var clickButton =  document.querySelector("button");
// clickButton.onclick = ouch; // if u call the function using ouch();  the function will automatically be executed immediately the page loads.

// function ouch() {
//     alert("don't click me hard!");
//     clickButton.style.color = "green";
// }


//

// var clikButton = document.querySelector("dav").addEventListener("click", function() {
//     alert("don't click me!");
//     document.getElementById("dav").style.color = "white";
//     document.getElementById("dav").style.backgroundColor = "green";
// });

// // event object that can be passed into event handlers, and sometimes uou need to access it specifically.

// var clikButton = document.querySelector("dav").addEventListener("click", function(event) {
//     event.target.style.backgroundColor = "blue";
//     alert("don't click me!");
    
// });

// event is used to prvent together with preventDefault method to prevent a default action of a function or object from occuring.

// var link = document.querySelector("a").addEventListener("click", function(event) {
//     event.preventDefault();
//     alert("don't click me!");
    
// });

// // submit events

// var formEntry =  document.querySelector("form").addEventListener("submit", function(event) {
//     event.preventDefault();
    
//     var formData =  document.querySelector("input").value;

//     alert(formData);
// });

//Mouseover, mouseout Events

var heading = document.querySelector("h1");
var divBox = document.querySelector("div");

divBox.addEventListener("mouseover", function() {
    heading.innerHTML = "the mouse is over the box";
});

divBox.addEventListener("mouseout", function() {
    heading.innerHTML = "the mouse is out of the box";
});

heading.addEventListener("mouseover", function() {
    heading.innerHTML = "Roll ur mouse on the div box below";
});


// taking the pixel value of a scrolled page and printing it to the console.
var pagetop;

window.addEventListener('scroll', function() {
    pagetop =  Math.floor(window.pageYOffset);
    console.log(pagetop);
});


// window resizing action.
window.addEventListener('resize',  function() {
    console.log("page width is " + window.innerWidth);
    console.log("page height is " +  window.innerHeight);
});
// key pressed detention. we use the event "event.which" to find out which key was pressed.
window.addEventListener("keydown", function(event) {
    alert("the " + event.key + " key was pressed");
});

/* document.createElement('new element name') // use to create new elemen/tag.
   parentElemeent.appendChild('child element');//  use to add an element as a child to another element.
   parentElemeent.removeChild('child element');//  use to remove an element as a child to another element.
   container.children.length > 2
*/

