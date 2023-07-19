const Joi = require('joi');

const walletSchema ={
  walletSchema: Joi.object({
        name: Joi.string(),
        icon: Joi.string()
  }),
  documentSchema: Joi.object({
    name: Joi.string().max(30),
    information: Joi.string(),
    file: Joi.string() ,
    icon: Joi.string().pattern(new RegExp(/\b\w*Icon\b/))
  })

} 

module.exports = userSchema