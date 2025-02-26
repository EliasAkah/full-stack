import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "127.0.0.1",
  user: "elias",
  database: "world",
  password: "123456",
  port: 5432
})

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function visited_countries(){
  const result = await db.query("SELECT country_id FROM world_vacation");
  console.log(result.rows)
  result.rows.forEach((country) => {
    countries.push(country.country_id);
  })
  return countries;
}

let countries = [];

app.get("/", async (req, res) => {
  //Write your code here.
  try{
   const countries =  await visited_countries();
    res.render("index.ejs", {countries: countries, total: countries.length});
  }catch(error){
    console.error("this error has occured", error.stack);
  }
});

app.post("/add", async(req, res) => {
  const country_travelled = req.body["country"];

 // const result1 =  await db.query("SELECT country_id FROM world_vacation");
  try{
    //output an array that contains the only the country_code of a country which country name matches the country entered inside the input element
    //it also solves the problem of looping through the table to find the country_code that matches the typed in country
    const result =  await db.query("SELECT country_code FROM countries_with_code WHERE LOWER(country_name) LIKE $1;", [`%${country_travelled.toLowerCase()}%`]);

    //gets hold of the the first row of the result array that contains only the country_code of a country that meets the above criteria
    const data = result.rows[0];
    //fetching the value of the key country_Code from that row.
    const country = data.country_code;
    try{
      //the unique in this query help us to check if a particular country_code is already within the given table, it throws an error which now handle using the catch error below
      await db.query('INSERT INTO world_vacation (country_id) VALUES ($1)', [country]);
      res.redirect('/');
    }catch(err){//handles error that occurs as a result of the unique contraint on the world_vacation table
      console.log(err);
      const countries = await visited_countries();
      res.render("index.ejs", {countries: countries, total: countries.length, error: "country has already been added, try again."});
    }

  }catch(err){
    console.log(err);
    const countries = await visited_countries();
    res.render('index.ejs', {countries: countries, total: countries.length, error: "Country does not exist, try again"})
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
