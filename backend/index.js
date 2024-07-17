import express from 'express';
import { PORT, mongoURL } from './confg.js';
import booksRoute from './routes/booksRoutes.js'
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

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