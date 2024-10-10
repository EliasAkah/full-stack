import express from "express"
import bodyParser from "body-parser"


const app = express();
const port = process.env.PORT || 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.render("homePage.ejs")
})

app.get("/about", (req, res) => {
    res.render('about.ejs')
}) 

app.get("/contactUs", (req, res) => {
    res.render('contactUs.ejs')
})

app.get("/portfolio", (req, res) => {
    res.render('portfolio.ejs')
})

app.listen(port, ()=> {
    console.log(`port ${port} is listening to ur request`)
})

