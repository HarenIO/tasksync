import Joi from 'joi'

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(16).required().messages({
    'string.base': 'Username should be a string',
    'string.empty': 'Username is required',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required'
  }),
  password: Joi.string().min(6).max(36).required().messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required'
  })
})

export { registerSchema }
