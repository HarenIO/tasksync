import Joi from 'joi'

//auth endpoint validation


//registration input validation
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

//login input validation
const loginSchema = Joi.object({
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
  })
})



//api endpoint validation


//id param validation
const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID should be a number',
    'number.integer': 'ID should be an integer',
    'number.positive': 'ID should be a positive number',
    'any.required': 'ID is required'
  })
})


//Trackers
const createTrackerSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required'
  })
});

const editTrackerSchema = Joi.object({
  new_tracker_name: Joi.string().trim().min(1).max(50).required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required'
  }),
  tracker_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Tracker ID should be a number',
    'number.integer': 'Tracker ID should be an integer',
    'number.positive': 'Tracker ID should be a positive number',
    'any.required': 'Tracker ID is required'
  })
})

const deleteTrackerSchema = Joi.object({
  tracker_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Tracker ID should be a number',
    'number.integer': 'Tracker ID should be an integer',
    'number.positive': 'Tracker ID should be a positive number',
    'any.required': 'Tracker ID is required'
  })
})

const addUserToTrackerScheme = Joi.object({
  user_id: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID should be a number',
    'number.integer': 'User ID should be an integer',
    'number.positive': 'User ID should be a positive number',
    'any.required': 'User ID is required'
  }),
  tracker_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Tracker ID should be a number',
    'number.integer': 'Tracker ID should be an integer',
    'number.positive': 'Tracker ID should be a positive number',
    'any.required': 'Tracker ID is required'
  })
})


const removeUserSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Tracker ID should be a number',
    'number.integer': 'Tracker ID should be an integer',
    'number.positive': 'Tracker ID should be a positive number',
    'any.required': 'Tracker ID is required'
  }),
  userId: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID should be a number',
    'number.integer': 'User ID should be an integer',
    'number.positive': 'User ID should be a positive number',
    'any.required': 'User ID is required'
  })
})

export { registerSchema, loginSchema, idSchema, createTrackerSchema, editTrackerSchema, deleteTrackerSchema, addUserToTrackerScheme, removeUserSchema }
