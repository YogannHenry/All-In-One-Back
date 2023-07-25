const Joi = require('joi');

const carSchema ={
  createMaintenanceSchema: Joi.object({
    name:Joi.string().max(30).required(),
    last_date_verif:Joi.number().max(7).optional(),
    last_km_verif: Joi.number().max(7).optional(),
    validity_period:Joi.number().max(7).optional(),
    validity_km: Joi.number().max(7).optional(),
    icon: Joi.string().optional(),
  }),
  modifyMaintenanceSchema: Joi.object({
    name:Joi.string().max(30).optional(),
    last_date_verif:Joi.number().max(7).optional(),
    last_km_verif: Joi.number().max(7).optional(),
    validity_period:Joi.number().max(7).optional(),
    validity_km: Joi.number().max(7).optional(),
    icon: Joi.string().optional(),
  }).min(1).required()
} 

module.exports = carSchema