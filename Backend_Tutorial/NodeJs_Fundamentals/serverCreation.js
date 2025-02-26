const http = require("http");

//when we require a particular content of a file each them exported 
//individually can be assigned as keyvalue pairs of an object that will be stored in a constant variable that requires it.
const handle = require("./routes.js");

console.log(handle.hardcode)
//creating a server and assigning it to a const variable called server
const server  = http.createServer(handle.handler)

//server gets/listen for the request from the client
server.listen(3000)