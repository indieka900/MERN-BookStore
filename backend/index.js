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

        return res.status(200).send({
            count : books.length,
            data : books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).json({message: "Book deleted succesfully"});
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