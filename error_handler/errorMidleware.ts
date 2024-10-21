import { Request, Response, NextFunction } from 'express';

function errorHandler(
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;