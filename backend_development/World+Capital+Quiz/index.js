import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

//creating a client object
const db = new pg.Client({
  user: "postgres",
  host: 'localhost',
  database: 'world',
  password: "08038838681",
  port: 5432
})

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

async () => {
  try {
    await db.connect();
    console.log("Connected to PostgreSQL");
    const result = await db.query("SELECT * FROM capitals");
    quiz = result.rows;  // Update quiz array with data from database
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    db.end(); // Close the connection after the query is done
  }
};

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
