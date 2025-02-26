import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

///my old number 08904286438
//creating a client object
const db = new pg.Client({
  user: "postgres", //elias
  host: 'localhost',
  database: 'world',
  password: "123456",
  port: 5432
})
 
db.connect();

let quiz = [];
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  //causing the code after it to wait until this function has successfully change 
  //the currenQUestion value from an empty object to the object
  //that is randomly select from the "quiz" array of object
  await nextQuestion();
  console.log(currentQuestion);
  //sending the randomly selected object to the index.ejs file by assigning to the key "question"
  //to ensure dynamic update of the DOM
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  //retrieving the value typed into the input element and removing whitespaces at the begining and end of the value
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  //randomly pick a paritcular object in the quiz object array that contains key values such as {id, country, capital} 
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  //assign that object to the currentQuestion variable to be used later in the code
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
