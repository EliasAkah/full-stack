var thisDiv = document.getElementById("thisdiv");
var currentClass = "one";

function classRotator() {
    if (currentClass == "one"){

        setTimeout(() => {

            thisDiv.className = "two";
            currentClass = "two";
            classRotator();
        }, 2000);   
    }
    else{

        setTimeout(() => {

            thisDiv.className = "one";
            currentClass = "one";
            classRotator();
        }, 2000); 
        
    }
}

classRotator();