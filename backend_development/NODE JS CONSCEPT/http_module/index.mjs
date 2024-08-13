import http from 'node:http';

//creating server
const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`<h1>hello!</h1>
        <p>you asked for <code>${request.url}</code></p>`);
    response.end();
});
//starting the server
server.listen('5000');
console.log('listening to (port: 5000)');