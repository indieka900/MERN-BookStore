import {Book}  from '../models/bookModel.js';
import express from 'express';

const router = express.Router();

//router to save new book
router.post('/', async (req, res) => {
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

//router to get all books
router.get('/', async (req, res) => {
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

//router to update book
router.put('/:id', async (req, res) => {
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

//router to get one book
router.get('/:id', async (req, res) => {
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

//router to delete book
router.delete('/:id', async (req, res) => {
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

export default router;