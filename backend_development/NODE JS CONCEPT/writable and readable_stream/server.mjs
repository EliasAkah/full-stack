import http from 'node:http';

//creating server
http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    req.on('data', chunk => {
        res.write(chunk.toString().toUpperCase())}); //encoding set as utf-8 to make sure that what is returned is a string, and not buffer
        req.on('end', () => res.end("hi it is me david"))//on used in place of addEventListener in node.js
}).listen(4000, () => console.log('listening to (port: 4000)')); 


