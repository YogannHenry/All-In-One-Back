const Joi = require('joi');

const walletSchema = {
  createWalletSchema: Joi.object({
    name: Joi.string().required(),
    icon: Joi.string().pattern((/\b\w*Icon\b/)).optional(),
    userId: Joi.number().optional(),
  }),
  modifyWalletSchema: Joi.object({
    name: Joi.string().optional(),
    icon: Joi.string().pattern((/\b\w*Icon\b/)).optional(),
    userId: Joi.number().optional(),
  }).min(1).required(),

};

module.exports = walletSchema;
