import { Request, Response, NextFunction } from 'express';

export function globalErrorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Maneja el error
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    statusCode: status,
    message: message,
  });
}
