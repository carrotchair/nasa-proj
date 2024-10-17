import Joi from 'joi';

export const rangePhotoQuerySchema = Joi.object().keys({
  userId: Joi.number().integer().required().messages({
    'number.base': 'user id should be a number',
    'number.integer': 'user id should be an integer',
    'any.required': 'user id is required',
  }),
  userName: Joi.string().required().messages({
    'string.base': 'userName should be a string',
    'any.required': 'userName is required',
  }),
  apiKey: Joi.string().required().messages({
    'string.base': 'apiKey should be a string',
    'any.required': 'apiKey is required',
  }),
});
