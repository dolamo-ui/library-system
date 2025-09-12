import express from 'express';
import authorRoutes from './routes/authors';
import bookRoutes from './routes/books';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';  

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Library API running at http://localhost:${PORT}`);
});
