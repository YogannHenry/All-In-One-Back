const Joi = require('joi');

const toDoListSchema = Joi.object({
  name: Joi.string().max(30).required(),
  position: Joi.number().optional(),
  userId: Joi.number().optional()
});

module.exports = toDoListSchema