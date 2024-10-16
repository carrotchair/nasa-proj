import Joi from 'joi';

export const meteorQuerySchema = Joi.object().keys({
  startDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      'string.pattern.base': 'startDate must be in the format YYYY-MM-DD',
    }),
  endDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      'string.pattern.base': 'endDate must be in the format YYYY-MM-DD',
    }),
  count: Joi.boolean().optional().messages({
    'boolean.base': 'count must be a boolean',
  }),
  wereDangerousMeteors: Joi.boolean().optional().messages({
    'boolean.base': 'wereDangerousMeteors must be a boolean',
  }),
});
