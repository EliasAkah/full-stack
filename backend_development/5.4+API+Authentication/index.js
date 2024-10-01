import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
// const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "james_Andrew";
const yourPassword = "ILoveSam";
const yourAPIKey = "1f8ebe0c-04a6-424d-aa87-e414f33aa125";
const yourBearerToken = "713cdf24-d239-45cf-9f0c-04940ac231d4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The content you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/random');
    let result = response.data;
    let jasonResult = JSON.stringify(result)

    res.render("index.ejs", {content: jasonResult})
  } catch (error) {
    console.error("Error:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
    let response = await axios.get('https://secrets-api.appbrewery.com/all', {
      auth: {
        username: `${yourUsername}`,
        password: `${yourPassword}`,
      },
      params:{
        page: 2,
      }
    });

    let result = response.data;
    let jasonResult = JSON.stringify(result)

    res.render("index.ejs", {content: jasonResult})
  } catch (error) {
    console.error("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    let response = await axios.get('https://secrets-api.appbrewery.com/filter', {
      params:{
        score: 5,
        apiKey: `${yourAPIKey}`
      }
    });

    let result = response.data;
    let jasonResult = JSON.stringify(result)

    res.render("index.ejs", {content: jasonResult})
  } catch (error) {
    console.error("Error:", error.message);
  }
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  let id =  2;
  axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`, {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    },
  })
  .then(response => {
     let value = response.data
     let jsonValue = JSON.stringify(value)

     res.render("index.ejs", {content: jsonValue})
  })
  .catch(error => {
    console.error("Error", error.message)
  });
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
