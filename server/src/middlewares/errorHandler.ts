import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    return sendError(res, 'VALIDATION_ERROR', 'Invalid request data', 400);
  }

  if (err.name === 'CastError') {
    return sendError(res, 'INVALID_ID', 'Invalid resource ID format', 400);
  }

  return sendError(res, 'INTERNAL_SERVER_ERROR', 'An unexpected error occurred', 500);
};
