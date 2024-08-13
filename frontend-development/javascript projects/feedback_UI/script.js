const ratingEls = document.querySelectorAll(".rating");
const btnEl =  document.getElementById("btn");
const containerEl = document.querySelector(".container");

let selectedRating = "";

// Loop through each element in the ratingEls NodeList using forEach
ratingEls.forEach(ratingEl => {
    ratingEl.onclick = addActive;

    // Define the addActive function to be called when a rating element is clicked
    function addActive(event){
        // Call the removeActive function to remove the "active" class from all rating elements
        removeActive();

         // Set the selectedRating variable to the inner text of the clicked element, or its parent node's inner text if it has no inner text
        selectedRating = event.target.innerText || event.target.parentNode.innerText;

        // Add the "active" class to the clicked rating element
        ratingEl.classList.add("active");
    }
    
});

// Add a click event listener to the btnEl element
btnEl.addEventListener("click",() => {
    // Check if a rating has been selected (selectedRating is not an empty string)
    if(selectedRating !== ""){
        // Replace the HTML content of the container element with a thank you message and the selected rating
        containerEl.innerHTML = `
            <strong>Thank You</strong>
            <br><br>
            <strong>Feedback ${selectedRating}</strong>
            <p>We'll use your feedback to improve our customer support</p>
        `;
    }
});

// Define the removeActive function to remove the "active" class from all rating elements
function removeActive(){
    ratingEls.forEach(ratingEl => {
        ratingEl.classList.remove("active");
    });
}