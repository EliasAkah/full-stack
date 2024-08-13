import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

//mounting parser middleware on the server
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const totalLengthOfName = (req.body["fName"].length)  + (req.body["lName"].length);
  res.render("index.ejs", {lengthOfName: `<h1>There are ${totalLengthOfName} letters in your name</h1>`});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
