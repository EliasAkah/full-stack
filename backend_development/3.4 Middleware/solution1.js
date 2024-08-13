import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));//middleware responsible for preprocessing/parsing of incoming request body with urlencoded payload

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");// use to send files from the server to the client located at the address within it.
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
