import express from 'express';
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    res.status.send("Hello world")
})



mongoose.connect(mongoURL).then(()=> {
    console.log("Connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})