import { Request, Response, NextFunction } from 'express';
import { authors } from '../models/author';
import { ApiError } from '../middleware/errorHandler';

export const validateAuthorPayload = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError('Name is required', 400);
  }
  next();
};

export const validateBookPayload = (req: Request, res: Response, next: NextFunction) => {
  const { title, year, authorId } = req.body;

  if (!title || !year || !authorId) {
    throw new ApiError('Title, year, and authorId are required', 400);
  }

  if (typeof year !== 'number' || year <= 0) {
    throw new ApiError('Year must be a positive number', 400);
  }

  if (typeof authorId !== 'number') {
    throw new ApiError('authorId must be a number', 400);
  }

  const authorExists = authors.some(a => a.id === authorId);
  if (!authorExists) {
    throw new ApiError('Invalid authorId: author does not exist', 400);
  }

  next();
};
