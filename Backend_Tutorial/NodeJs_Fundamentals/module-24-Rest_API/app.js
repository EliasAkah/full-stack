const express = require("express");

const feedRoute = require("./routes/feed");

const app = express();

app.use(express.json()); //ensures json files are automatically parsed
app.use(express.urlencoded({ extended: true })); //ensures that

//setting permission rules for which browsers is allowed to talk to your backend server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/feeds", feedRoute);

app.listen(3000, () => {
  console.log("I am running the server at port 3000");
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); //allow any website/ domain
//   res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE"); //browser use only this methods when calling my API
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // request are allowed to include these custom headers like Content-Type (for JSON) and Authorization (for tokens)

//   next();
// });
