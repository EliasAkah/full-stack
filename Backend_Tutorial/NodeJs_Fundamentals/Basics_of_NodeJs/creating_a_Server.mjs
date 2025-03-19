import http from "http";

import requestHandler from "./routes.mjs"

console.log("listened correctly")
//creating a server and assigning it to a const variable called server
const server  = http.createServer(requestHandler)

//server gets/listen for the request from the client
server.listen(3000)