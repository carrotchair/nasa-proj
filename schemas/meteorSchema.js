import Joi from 'joi';

export const meteorQuerySchema = Joi.object().keys({
  date: Joi.array()
    .items(
      Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .messages({
          'string.pattern.base': 'Each date must be in the format YYYY-MM-DD',
        })
    )
    .length(2)
    .optional()
    .messages({
      'array.base': 'date must be an array of two date strings',
      'array.length': 'date must contain exactly two dates (start and end)',
    }),
  count: Joi.boolean().optional().messages({
    'boolean.base': 'count must be a boolean',
  }),
  wereDangerousMeteors: Joi.boolean().optional().messages({
    'boolean.base': 'wereDangerousMeteors must be a boolean',
  }),
});
