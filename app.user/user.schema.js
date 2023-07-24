const Joi = require('joi');

const userSchema ={
  registerSchema: Joi.object({
    pseudo: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)).required(),
    passwordConfirm: Joi.ref('password')
  }),
  loginSchema: Joi.object({
    pseudo: Joi.string().max(15).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  modifyUserSchema : Joi.object({
    pseudo: Joi.string().max(15),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)),
    passwordConfirm: Joi.string().when('password', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    })
  }).min(1).required()

} 

module.exports = userSchema