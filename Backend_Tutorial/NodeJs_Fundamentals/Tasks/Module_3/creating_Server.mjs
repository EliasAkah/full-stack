import fs from "fs";
import http from "http";

//creating a server and assigning it to a const variable called server
const server = http.createServer((req, res) => {
    //fetching the url of different routes
    const url = req.url;
    const method  = req.method;
    const users = ["solomon", "Trishla", "Tina", "Anish", "Subash"];

    //handling route "/" and "/users"
    if(url === "/"){
        res.write("<html>")
        res.write("<head><title>User Creation</title></head>")
        res.write("<body>")
        res.write("<h1>Here I am lord</h1>")
        res.write('<form action = "/create-user" method = "POST">')
        res.write("<input type = 'text' name = 'username'>")
        res.write("<button type = 'submit'>submit</button>")
        res.write("</form>")
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }

    if(url === "/users"){
        res.write("<ul>")
            users.forEach(user => {
                res.write(`<li>${user}</li>`)//using template literal to insert user value
            })
        res.write("</ul>")
        return res.end()// stops the execution of code in this function
    }
    
    if(url === "/create-user" && method === "POST"){
        const body = [];

        //Collect incoming data in chunks
        req.on('data', chunk => {
            console.log(chunk)
            body.push(chunk);
        })
        //if the 'return' keyword do not preceed the req.on('end', ()=>{}) node js registers 
        // the event but skip to perform its callback. it rather proceeds to perform other synchronous activity before returning to executer the callback
        //to resolve the issue we use the return keyword to ensure that everything within req.on('end', ()=>{}) is executed before nodejs moves to a new block of code
        //in our case here it ends the request process in our server. thus making executing the callback function show error when it tries nodejs try excute
        //it since the server has already sent a reponse to the client side
        return req.on('end', () => {
            //parsing the chunks of code after all the chunks has be gather into the body array
            const parseBody = Buffer.concat(body).toString();
            //fetching the input value by dividing the string into an array from the starting from the equal sign
            const userName = parseBody.split('=')[0];
            //Process request data and write to a file asychronously
            fs.writeFile('userName.txt', userName, err => {
                //redirecting temporary 
                res.statusCode = 302;
                //path to be redirected to 
                res.setHeader('Location', "/");
                return res.end()//does not stop the execution of code in this function but marks end of the response
            });
        })
    }
    res.end();
})

server.listen(3000, () =>{
    console.log("I am listening from port 3000");
})