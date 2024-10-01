// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.


import axios from "axios"
import express from "express"
import bodyParser from "body-parser"

let port = 3000;
let App_URL = "https://secrets-api.appbrewery.com/random";


let app = express();

app.use(express.static("public"))

app.get('/', (req, res) => {
    axios.get(App_URL).then(response => {
        let result = response.data;

        let secret = result.secret;
        let userName = result.username;

        res.render("index.ejs", {secret: secret, user: userName})
    }).catch(error => {
        console.error("Error: ", error.response.data)
        res.status(500)
    })

})


app.listen(port, () => {
    console.log(`port ${3000} is listening`)
})