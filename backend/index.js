import express from 'express';
import { PORT, mongoURL } from './confg.js';
import booksRoute from './routes/booksRoutes.js'
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();

app.use(express.json());

//allow all origins
app.use(cors())

//allow custom origins
// app.use(cors({
//     origin: `http://localhost:${PORT}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

app.use('/api', booksRoute);

//post to add new book

mongoose.connect(mongoURL).then(()=> {
    console.log("Connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})

// {
//     "title":"Chozi la Heri",
//     "author": "Ken Walibora",
//     "publishYear": 2020
//   }