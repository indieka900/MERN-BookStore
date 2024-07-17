import express from 'express';
import { PORT, mongoURL } from './confg.js';
import {Book}  from './models/bookModel.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("Hello world")
});

//post to add new book
app.post('/books', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message : 'All fields are required'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});


app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).send(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});


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