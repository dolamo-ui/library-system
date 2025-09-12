import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${req.method}] ${req.url} → ${status} - ${message}`);
  res.status(status).json({ error: message });
};
