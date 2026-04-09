const Joi = require('joi');
const logger = require('../services/logger');

/**
 * Joi Schema for Registration
 */
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Student', 'Teacher', 'Institute Admin', 'Super Admin')
});

/**
 * Joi Schema for Login
 */
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

/**
 * Joi Schema for Forgot Password
 */
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

/**
 * Joi Schema for Reset Password
 */
const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

/**
 * Higher-order middleware to validate incoming request bodies.
 * Rejects with 422 Unprocessable Entity if data is malicious or malformed.
 */
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  
  if (error) {
    logger.warn(`Invalid body for ${req.path}: ${error.details[0].message}`);
    return res.status(422).json({ 
      error: 'Data validation failed', 
      details: error.details[0].message 
    });
  }

  next();
};

module.exports = { validateRequest, registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };
