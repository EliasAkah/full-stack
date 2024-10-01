import express from 'express';
import {add} from './help/index.mjs';

const app = express();
app.get('/', (req, res) => {
    res.send(add(5, 5).toString);
});

const port = 3000;
app.listen(port, () => {
    console.log(`app is listening on port: ${port}`);
});

