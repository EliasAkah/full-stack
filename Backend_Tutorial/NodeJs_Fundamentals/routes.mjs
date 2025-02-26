import fs from "fs";

const requestHandler = (req, res) => {
    //fetching request url
    const url = req.url;
    const method = req.method;
    if(url === "/"){
        res.write('<html>')
        res.write('<head><title>Enter Messsage</title></head>')
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>')
        res.write('</html>')
        return res.end(); 
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        //listening for the request data
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //listening for the end of a request
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            //converting key value pairs into an array separated by the equal sign and passing the second element of the array to variable message
            const message = parsedBody.split('=')[1];
            //Creatinng a message.txt file and assigning the message to it
            fs.writeFile('message.txt', message, (err) => {
                //The 302 status tells the browser that the requested resource (the /message route) has been temporarily moved to a different location.
                res.statusCode = 302;
                //redirecting the url to  "/"
                res.setHeader('Location', '/');
                return res.end();
            })
        })
    }
    res.setHeader("Content-Type", "text/html")
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end();//no res operation should come after .end() method
};

//using module object to access the exports property that allows the allows the file to be used in another system
//this files transferred cannot be easily modified by the other file using it.
//for es module 6 compatibilty use the export default OR named export
export default requestHandler;//export default
// export const requestHandler = (req,res) ={

// }//named export


//Used export default requestHandler; for ES module compatibility (if using ES6 modules).
// If you're using CommonJS (require instead of import), make sure to use: 

