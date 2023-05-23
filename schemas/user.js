const Joi = require('joi')

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().required().min(4).messages({
    'any.required': 'missing required password field',
  }),
})

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().required().min(4).messages({
    'any.required': 'missing required password field',
  }),
})

module.exports = {
  registerSchema,
  loginSchema,
}
