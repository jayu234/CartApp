import { NextFunction, Request, Response } from 'express';
import { MongooseError } from 'mongoose';

type ExpressError = Error & {
  statusCode?: number;
  message?: string;
};

export default function (err: ExpressError, req: Request, res: Response, next: NextFunction) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
}
