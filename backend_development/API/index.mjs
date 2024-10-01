import express from "express"
import fetch from "node-fetch";

const port = process.env.PORT || 3000;

const app =  express();

app.get("/", (req, res) => {
 function fetchURL() {
    // Fetch a URL, returning a promise
    const promise = fetch("https://api.wheretheiss.at/v1/satellites/25544")
    return promise
        .then((response) => {
            // Check if the response is ok
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON from the response // converting the json file into an object
        });
}

fetchURL()
    .then((data) => {
        res.send({name: data.name, latitude1: data.latitude}); // Output the fetched data
        
    })
    .catch((error) => {
        console.error(error); // Handle any errors
        res.status(500).send('Internal Server Error');
    });
})

app.listen(port, () => {
    console.log("your code is running on the server")
})