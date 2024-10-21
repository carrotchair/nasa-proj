import { Request, Response, NextFunction } from 'express';
import { meteorQuerySchema } from './meteorSchema.ts';
import { rangePhotoQuerySchema } from './rangePhotoSchema.ts';

export const validateMeteorQuerySchema = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { error } = meteorQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateRangePhotoQuerySchema = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { error } = rangePhotoQuerySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};