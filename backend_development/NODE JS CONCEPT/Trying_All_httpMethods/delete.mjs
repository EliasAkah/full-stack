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

app.post("/api/users",  (req, res) => {
    console.log(req.body)
    const {body} = req;

    // const parseId =  parseInt(req.params.id)

    // if(isNaN(parseId)) return res.sendStatus(400)

    let newuser =  {id: dataObject[dataObject.length - 1].id + 1, ...body}

    //adding the new user object to the dataObject Array
    dataObject.push(newuser)
    res.status(200).send(dataObject)


})

app.patch("/api/users/:id", (req, res) => {
    console.log(req.body)
    const {body, params: {id}} = req

    const parseId =  parseInt(id);

    if(isNaN(parseId)) return res.sendStatus(400)

    // finding the index of the object in the array that meets the given condition within the findIndex() method
    const findObjectIndex = dataObject.findIndex(user => user.id === parseId)
    if(findObjectIndex === -1) return res.sendStatus(400)

    dataObject[findObjectIndex] = {...dataObject[findObjectIndex], ...body}

   return res.status(200).send(dataObject[findObjectIndex])
    
})

app.delete("/api/users/:id", (req, res) => {
    const {params: {id}} = req
    const parseId =  parseInt(id);
    if(isNaN(parseId)) return res.sendStatus(400)

    // finding the index of the object in the array that meets the given condition within the findIndex() method
    const findObjectIndex = dataObject.findIndex(user => user.id === parseId)
    //checking if the index is not found
    if(findObjectIndex === -1) return res.sendStatus(400)
    dataObject.splice(findObjectIndex, 1)

   return res.status(200).send(dataObject[findObjectIndex])
    
})


app.listen(port, () => {
    console.log(`port ${port} is listening`)
})