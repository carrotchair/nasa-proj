import { meteorQuerySchema } from '../schemas/meteorSchema.js';
import { rangePhotoQuerySchema } from './rangePhotoSchema.js';

export const validateMeteorQuerySchema = (req, res, next) => {
  const { error } = meteorQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateRangePhotoQuerySchema = (req, res, next) => {
  const { error } = rangePhotoQuerySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
