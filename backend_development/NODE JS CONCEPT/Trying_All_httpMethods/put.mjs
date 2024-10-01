import express, { request, response } from "express"
import bodyParser from "body-parser"

let app =  express();
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

// app.get("/api/users", (req, res) => {
//     res.status(200).send(dataObject)
// })

app.get("/api/users", (req, res) => {
    console.log(req.query)

    const {query: { filter, value }} = req

    //checking if both filter and value are undefind in the url
    if(filter !== undefined && value !== undefined){
        return res.send(dataObject.filter((user) => user[filter].includes(value)))
    }else{      
    return res.send(`below is the object we seek \n ${dataObject}`)
    }
})

//acessing routing parameters
app.get("/api/users/:id", (req, res) => {
    console.log(req.params)
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.status(400).send({msg: "Bad Request. invalid ID."});
    const findUser = dataObject.find(user => user.id === parsedId)
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
    

})

app.put("/api/users/:id", (req, res) =>{
    const {body, params: {id}} = req

    const parseId = parseInt(id)

    if(isNaN(parseId)) return res.sendStatus(400);
    const findUserIndex = dataObject.findIndex(user => user.id === parseId)

    if(findUserIndex === -1) return res.sendStatus(404);

    dataObject[findUserIndex] = {id: parseId, ...body}

    return res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})