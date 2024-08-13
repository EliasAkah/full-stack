const btnEl = document.getElementById("btn");
const animeContainerEl = document.querySelector(".anime-container");
const animeImgEl =  document.querySelector(".anime-img");
const animeNameEl = document.querySelector(".anime-name");

btnEl.addEventListener("click", async function(){
    try {
        // Disable the button
        btnEl.disabled = true;

        btnEl.innerText = "loading..."
        animeNameEl.innerText = "updating..."
        animeImgEl.src = "Spinner.svg";

        // Define the URL for the API endpoint
        const url = "https://api.nekosapi.com/v3/images/random";

        // Fetch data from the API asynchronously
        const response = await fetch(url);

        // Fetch data from the API asynchronously
        const data = await response.json();

        // Enable the button
        btnEl.disabled = false;

        btnEl.innerText = "Get Anime";
        animeContainerEl.style.display = "block";
        animeImgEl.src = data.items[0].image_url;
        animeNameEl.innerText = "Artist Name withheld";  
    } catch (error) {
        console.error(error);
        animeNameEl.innerText = "Error fetching data"; 
        animeImgEl.src = ""; // Optionally set to a placeholder image on error
        btnEl.innerText = "Get Anime";
    }
})



//     fetch('https://api.nekosapi.com/v3/images/random').then(resp=> resp.json()).then(data=> {
//     console.log(data.items[0].image_url);
//     let img_url = data.items[0].image_url;
//     animeContainerEl.style.display = "block";
//     animeImgEl.src = img_url;
    
// })

