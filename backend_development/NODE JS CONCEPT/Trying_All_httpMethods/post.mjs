import express, { request, response } from "express"
import bodyParser from "body-parser"

let app =  express();

//converting json file into javascript object
app.use(express.json())

let port =  process.env.PORT || 3000

let dataObject = [
    {
        id: 1,
        firstName: "david",
        lastName: "Akah",
    },
    {
        id: 2,
        firstName: "james",
        lastName: "Andrew"
    },
    {
        id: 3,
        firstName: "sophia",
        lastName: "Kate"
    },
    {
        id: 4,
        firstName: "akansha",
        lastName: "Kumar"
    },
]

app.get("/", (req, res) => {
    res.status(200).send(    {
        id: 1,
        firstName: "David",
        lastName: "Akah",
    })
})

app.post("/api/users", (req, res) => {
    console.log(req.body)
    const {body} = req

    //creating a new user

    //shallow copying the every content of the a body while updating the id of the body
    let newUser = {id: dataObject[dataObject.length - 1].id + 1, ...body}

    //updating the dataObject array
    dataObject.push(newUser)

   return res.status(201).send(dataObject)
    
})


app.listen(port, () => {
    console.log(`port ${port} is listening`)
})