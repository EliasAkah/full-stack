/* 
addEventListener(type, listener) type(event we detect or listen to) listener(function that is called when the event is detected)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture)
anolymous function: funtion () {block of statements}.
*/
var lengthOfSelector =  document.querySelectorAll(".drum").length;

for (var i = 0; i < lengthOfSelector; i++) {
    if (i === 0) {
        //document.querySelectorAll("button")[i].style.backgroundColor
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_0);
    }
    else if (i === 1) {
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_1)
    }
    else if (i === 2) {
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_2)
    }
    else if (i === 3) {
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_3)
    }
    else if (i === 4) {
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_4)
    }
    else if (i === 5) {
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_5)
    }
    else {
        document.querySelectorAll("button")[i].addEventListener("click",clickButton_6)
    }
    
    
}

function clickButton_0() {
        var audio =  new Audio('sounds/tom-4.mp3');
        audio.play();
        //document.querySelectorAll("button")[0].style.color = "white";
        this.style.color = "white";
    }

function clickButton_1() {
    var audio =  new Audio('sounds/tom-3.mp3');
    audio.play();
    //document.querySelectorAll("button")[1].style.color = "white";
    this.style.color = "white";
}

function clickButton_2() {
    var audio =  new Audio('sounds/tom-2.mp3');
    audio.play();
    //document.querySelectorAll("button")[2].style.color = "white";
    this.style.color = "white";
}

function clickButton_3() {
    var audio =  new Audio('sounds/tom-1.mp3');
    audio.play();
    //document.querySelectorAll("button")[3].style.color = "white";
    this.style.color = "white";
}

function clickButton_4() {
    var audio =  new Audio('sounds/snare.mp3');
    audio.play();
    //document.querySelectorAll("button")[4].style.color = "white";
    this.style.color = "white";
}

function clickButton_5() {
    var audio =  new Audio('sounds/crash.mp3');
    audio.play();
    //document.querySelectorAll("button")[5].style.color = "white";
    this.style.color = "white";
}

function clickButton_6() {
    var audio =  new Audio('sounds/kick-bass.mp3');
    audio.play();
    //document.querySelectorAll("button")[6].style.color = "white";
    this.style.color = "white";
}



    document.addEventListener("keydown", function(event){
        pressedButton(event.key);
        buttonAnimation(event.key)    
    });
    
function pressedButton(key) {                                             
        switch (key) {
            case "w":
                var char1 =  new Audio("sounds/tom-4.mp3");
                char1.play();
                break
                
                case "a":
                var char2 =  new Audio("sounds/tom-3.mp3");
                char2.play();
                break;

                case "s":
                var char3 =  new Audio("sounds/tom-2.mp3");
                char3.play();
                break;

                case "d":
                var char4 =  new Audio("sounds/tom-1.mp3");
                char4.play();
                break;

                case "j":
                var char5 =  new Audio("sounds/snare.mp3");
                char5.play();
                break;

                case "k":
                var char6 =  new Audio("sounds/crash.mp3");
                char6.play();
                break;

                case "l":
                var char7 =  new Audio("sounds/kick-bass.mp3");
                char7.play();
                break;

        }
    }

    function buttonAnimation(currentKey) {
        var activeButton =  document.querySelector("." + currentKey);
        activeButtton.classList.add("pressed");
        setTimeout(function (){
            activeButton.classList.remove("pressed")
        }, 100);
    }



/*
var varName = new Audio("url of audio")
varName.play();

"this" keyword is used to identify the button that is clicked. 
console.log(this); makes the output visible for the user to see.
"this.innerHTML" is used to identify the content with the button tag that was clicked. 
console.log(this.innerHTML); makes the output visible for the user to see.

*/

 // document.addEventListener("keydown", function): helps the entire page to listen to                                         //var pressedKey =  this.innerHTML;          
 // when any of the keys are pressed on the keyboard which triggers the block of codes  
 // inside the function to be executed.

 //setTimeout(function, milliseconds, param1,param2, ...)
