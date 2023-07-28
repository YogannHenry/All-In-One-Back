/* eslint-disable camelcase */
const Joi = require('joi');

const carSchema = {
  createCarSchema: Joi.object({
    name: Joi.string().max(30).required(),
    type: Joi.string().max(15).optional(),
    current_km: Joi.number().max(9000000).optional(),
    km_per_month: Joi.number().max(9000000).optional(),
    icon: Joi.string().pattern((/\b\w*Icon\b/)).optional(),
    userId: Joi.number(),
  }),
  modifyCarSchema: Joi.object({
    name: Joi.string().max(30).optional(),
    type: Joi.string().max(15).optional(),
    current_km: Joi.number().max(9000000).optional(),
    km_per_month: Joi.number().max(9000000).optional(),
    icon: Joi.string().pattern((/\b\w*Icon\b/)).optional(),
    userId: Joi.number(),
  }).min(1).required(),
};

module.exports = carSchema;
