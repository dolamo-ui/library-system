import express from 'express';
import { books, Book } from '../models/book';
import { authors } from '../models/author';
import { validateBookPayload } from '../middleware/validate';
import { ApiError } from '../middleware/errorHandler';

const router = express.Router();


router.post('/', validateBookPayload, (req, res, next) => {
  try {
    const { title, year, authorId } = req.body;

    const duplicate = books.find(b => b.title === title && b.authorId === authorId);
    if (duplicate) throw new ApiError('Duplicate book by the same author', 409);

    const author = authors.find(a => a.id === authorId);
    if (!author) throw new ApiError('Author not found', 404);

    const newBook: Book = {
      id: books.length + 1,
      title,
      year,
      authorId,
    };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
});


router.get('/', (req, res) => {
  res.json(books);
});


router.get('/:id', (req, res, next) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) throw new ApiError('Book not found', 404);
    res.json(book);
  } catch (err) {
    next(err);
  }
});


router.put('/:id', validateBookPayload, (req, res, next) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) throw new ApiError('Book not found', 404);

    const author = authors.find(a => a.id === req.body.authorId);
    if (!author) throw new ApiError('Author not found', 404);

    book.title = req.body.title;
    book.year = req.body.year;
    book.authorId = req.body.authorId;

    res.json(book);
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', (req, res, next) => {
  try {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) throw new ApiError('Book not found', 404);

    const deleted = books.splice(index, 1);
    res.json(deleted[0]);
  } catch (err) {
    next(err);
  }
});


router.get('/author/:authorId', (req, res, next) => {
  try {
    const authorId = parseInt(req.params.authorId);
    const author = authors.find(a => a.id === authorId);
    if (!author) throw new ApiError('Author not found', 404);

    const authorBooks = books.filter(b => b.authorId === authorId);
    res.json(authorBooks);
  } catch (err) {
    next(err);
  }
});

export default router;
