import express from 'express';

const app = express();
const port = 3000;
//creating the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);

});

//we start the server by using node index.js