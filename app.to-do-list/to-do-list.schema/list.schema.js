const Joi = require('joi');

const listSchema = {
  createListSchema: Joi.object({
    name: Joi.string().max(30).required(),
    position: Joi.number().optional(),
    userId: Joi.number().optional(),
  }),
  modifyListSchema: Joi.object({
    name: Joi.string().max(30).optional(),
    position: Joi.number().optional(),
    userId: Joi.number().optional(),
  }).min(1).required(),
};

module.exports = listSchema;
