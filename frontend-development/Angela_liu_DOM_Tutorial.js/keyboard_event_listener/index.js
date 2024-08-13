var drumLength = document.querySelectorAll("button").length;

for (var i = 0; i < drumLength; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        var clickedObject =  this.innerHTML;

        switch (clickedObject) {
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

                default: console.log("invalid character entry");

        }
    });
}


    document.addEventListener("keydown", function(){ 

        pressedKey (event.key);   

    });


        function pressedKey (key){

        
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


    /* callback function*/


    function anotherAddEventListener(typeOfEvent, callback) {

        var evenThatHappened = {
            eventType: "keydown",
            key: "p",
            durationOfKeydown: 2 
        }
    

    if (eventThatHappened.eventType === typeOfEvent)  {
        callback(eventThatHappened);
    }
}

anotherAddEventListener("keydown", function(event)){
    console.log(event);
}

document.anotherAddEventListener("keydown", function(event)){
    console.log(event);
}