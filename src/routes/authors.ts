import express from 'express';
import { authors, Author } from '../models/author';
import { books } from '../models/book';
import { validateAuthorPayload } from '../middleware/validate';
import { ApiError } from '../middleware/errorHandler';

const router = express.Router();

router.post('/', validateAuthorPayload, (req, res, next) => {
  try {
    const exists = authors.some(
      a => a.name.toLowerCase() === req.body.name.toLowerCase()
    );
    if (exists) throw new ApiError('Author already exists', 409);

    const newAuthor: Author = {
      id: authors.length + 1,
      name: req.body.name,
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});


router.get('/', (req, res) => {
  res.json(authors);
});


router.get('/:id', (req, res, next) => {
  try {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) throw new ApiError('Author not found', 404);
    res.json(author);
  } catch (err) {
    next(err);
  }
});


router.get('/:id/books', (req, res, next) => {
  try {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);
    if (!author) throw new ApiError('Author not found', 404);

    let authorBooks = books.filter(book => book.authorId === authorId);

    
    const {
      search,
      year,
      sortBy = 'title',
      order = 'asc',
      page = '1',
      limit = '10',
    } = req.query;

    
    if (year) {
      const yearNum = parseInt(year as string);
      if (!isNaN(yearNum)) {
        authorBooks = authorBooks.filter(book => book.year === yearNum);
      }
    }

    
    if (search) {
      const searchStr = (search as string).toLowerCase();
      authorBooks = authorBooks.filter(book =>
        book.title.toLowerCase().includes(searchStr)
      );
    }

   
    const sortableFields: Array<keyof typeof books[0]> = ['title', 'year'];
    const sortField = sortableFields.includes(sortBy as keyof typeof books[0])
      ? (sortBy as keyof typeof books[0])
      : 'title';
    const sortOrder = order === 'desc' ? -1 : 1;

    authorBooks.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    });



    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.max(1, parseInt(limit as string) || 10);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedBooks = authorBooks.slice(startIndex, startIndex + limitNum);

    // Response
    res.json({
      page: pageNum,
      limit: limitNum,
      totalItems: authorBooks.length,
      totalPages: Math.ceil(authorBooks.length / limitNum),
      data: paginatedBooks,
    });
  } catch (err) {
    next(err);
  }
});


router.put('/:id', validateAuthorPayload, (req, res, next) => {
  try {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) throw new ApiError('Author not found', 404);

    author.name = req.body.name;
    res.json(author);
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', (req, res, next) => {
  try {
    const index = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) throw new ApiError('Author not found', 404);

    const deleted = authors.splice(index, 1);
    res.json(deleted[0]);
  } catch (err) {
    next(err);
  }
});

export default router;


