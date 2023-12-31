const Joi = require('joi');

const taskSchema = {
  createTaskSchema: Joi.object({
    name: Joi.string().max(300).required(),
    position: Joi.number().optional(),
    status: Joi.boolean().optional(),
    userId: Joi.number().optional(),
  }),
  modifyTaskSchema: Joi.object({
    name: Joi.string().max(300).optional(),
    position: Joi.number().optional(),
    status: Joi.boolean().optional(),
    userId: Joi.number().optional(),
  }).min(1).required(),
};

module.exports = taskSchema;
