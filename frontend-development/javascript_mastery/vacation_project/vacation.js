(function(){
    "use strict";
    // assign form to a varriable/element
var detailsForm = document.querySelector('#destination_details_forms');

// use the addEventListener to execute sets of instructions written within the handleFormSubmit fuunction if the form is submitted
detailsForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event){
    event.preventDefault();

    //extract the value from each form field
    var destName  =  event.target.elements["name"].value;
    var destLocation  =  event.target.elements["location"].value;
    var destPhoto  =  event.target.elements["photo"].value;
    var destDescription  =  event.target.elements["description"].value;

    //clear out the form fields
    for (var i = 0; i < detailsForm.length; i++) {
        detailsForm.elements[i].value = ""; 
    }

    // create card here....
    var destCard = createDestinationCard(destName, destLocation, destPhoto, destDescription);

    
    //if needed, change the header at the top of the destination list
    var wishListContainer =  document.querySelector("#destinations_container");

    if (wishListContainer.children.length === 0){
        document.querySelector("#title").innerHTML =  "my wish list";
    }

    //add the card

    document.querySelector('#destinations_container').appendChild(destCard);


}

    //run a function that creates the new card
    function createDestinationCard(name, location, photoURL, description) {
        var card =  document.createElement('div');
        card.className = "card";

        var img =  document.createElement('img');
        img.setAttribute("alt", name);
        
        var constantPhotoUrl = "image/image1.jpg";

        if(photoURL.length === 0) {
            img.setAttribute('src', constantPhotoUrl);
        }
        else{
            img.setAttribute('src', photoURL);
        } 

        card.appendChild(img);

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        

        var header3 =  document.createElement("h3");
        header3.innerText = name;
        cardBody.appendChild(header3);

        var header4 =  document.createElement("h4");
        header4.innerText = location;
        cardBody.appendChild(header4);

        if (description.length !== 0){
            var paragraph = document.createElement("p");
            paragraph.className = "card-text";
            paragraph.innerText = description;
            cardBody.appendChild(paragraph);
        }

        var cardDeleteBtn = document.createElement("button");
        cardDeleteBtn.innerText = "Remove";

        cardDeleteBtn.addEventListener("click", removeDestination);
        cardBody.appendChild(cardDeleteBtn);

        card.appendChild(cardBody);

        return card;
    }

    function removeDestination(event){
        var card = event.target.parentElement.parentElement;
        card.remove();
        
    }
})();




// several ways of collecting values from the field of a form.

// Using getElementById:
// var fieldValue = document.getElementById("yourFormFieldId").value;

// Using querySelector:
// var fieldValue = document.querySelector("#yourFormFieldId").value

// Using getElementsByName (for radio buttons or checkboxes with the same name):
// var radioValue = document.getElementsByName("yourRadioName");
// // Loop through the radio buttons to find the selected one
// for (var i = 0; i < radioValue.length; i++) {
//     if (radioValue[i].checked) {
//         var selectedValue = radioValue[i].value;
//         break;
//     }
// }


// Using getElementsByClassName (if your form field has a specific class):
// var fieldValue = document.getElementsByClassName("yourClassName")[0].value;


// Using FormData (for extracting values from all form fields):
// var form = document.getElementById("yourFormId");
// var formData = new FormData(form);
// // Access individual form fields
// var fieldValue = formData.get("yourFieldName");

// Using event object in an event handler (e.g., onclick, onchange):
// function handleInputChange(event) {
//     var fieldValue = event.target.value;
// }
// // In HTML: <input type="text" onchange="handleInputChange(event)">

// Using serialize method for form submission (for sending form data via AJAX):
// var form = document.getElementById("yourFormId");
// var formData = new FormData(form);
// var serializedData = new URLSearchParams(formData).toString();

// Using jQuery (if jQuery is included in your project):
// var fieldValue = $("#yourFormFieldId").val();


