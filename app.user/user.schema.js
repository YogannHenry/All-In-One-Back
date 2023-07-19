const Joi = require('joi');

const userSchema ={
  registerSchema: Joi.object({
    pseudo: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)).required(),
    passwordConfirm: Joi.ref('password')
  }),
  loginSchema: Joi.object({
    pseudo: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

} 

module.exports = userSchema