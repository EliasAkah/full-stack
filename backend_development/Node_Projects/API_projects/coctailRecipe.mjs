import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app =  express();
const port =  process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try{
        let response =  await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        let result =  response.data;
        result =  result.drinks[0];
        res.render("index.ejs", {data: result})
    }catch(error){
      if (error.response) {
        // Log technical error details for developer debugging
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        
        // Show a user-friendly message based on the error type
        if (error.response.status === 404) {
            res.render("index.ejs", { error: "The requested resource was not found." });
        } else if (error.response.status === 500) {
            res.render("index.ejs", { error: "An internal server error occurred. Please try again later." });
        } else {
            res.render("index.ejs", { error: "An error occurred while processing your request." });
        }
        
    } else if (error.request) {
        // Log the request error for developer
        console.log(error.request);
        
        // Show a generic network error message to the user
        res.render("index.ejs", { error: "Network error. Please check your connection and try again." });
        
    } else {
        // Log general error message for developer
        console.log('Error', error.message);
        
        // Show a user-friendly error message
        res.render("index.ejs", { error: "An unexpected error occurred. Please try again later." });
    }
          console.log(error.config);

          
    }
})


app.listen(port, () => {
    console.log(`port ${port} is now listening for ur request`)
})