const Joi = require('joi');

const toDoListSchema = Joi.object({
  name: Joi.string().max(30).required(),
});

module.exports = toDoListSchema