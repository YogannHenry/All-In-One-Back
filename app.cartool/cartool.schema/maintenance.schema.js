/* eslint-disable camelcase */
const Joi = require('joi');
const intervalValidator = require('../../app.middleware/interval.validator');

const maintenanceSchema = {
  createMaintenanceSchema: Joi.object({
    name: Joi.string().max(30).required(),
    last_date_verif: Joi.date().optional(),
    last_km_verif: Joi.number().max(9000000).optional(),
    validity_period: Joi.string().custom(intervalValidator),
    validity_km: Joi.number().max(9000000).optional(),
  }),
  modifyMaintenanceSchema: Joi.object({
    name: Joi.string().max(30).optional(),
    last_date_verif: Joi.number().max(7).optional(),
    last_km_verif: Joi.number().max(9000000).optional(),
    validity_period: Joi.string().custom(intervalValidator),
    validity_km: Joi.number().max(9000000).optional(),
  }).min(1).required(),
};

module.exports = maintenanceSchema;
