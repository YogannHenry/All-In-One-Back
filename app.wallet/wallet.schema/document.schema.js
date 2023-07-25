const Joi = require('joi');

const documentSchema = {
  createDocumentSchema: Joi.object({
    name: Joi.string().max(30).required(),
    information: Joi.string().optional(),
    file: Joi.string().optional(),
    icon: Joi.string().pattern((/\b\w*Icon\b/)).optional(),
  }),
  modifyDocumentSchema: Joi.object({
    name: Joi.string().max(30).optional(),
    information: Joi.string().optional(),
    file: Joi.string().optional(),
    icon: Joi.string().pattern((/\b\w*Icon\b/)).optional(),
  }).min(1).required(),

};

module.exports = documentSchema;
