import Joi from 'joi';

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*<>?~_]).{6,}$/;
const passwordMessages = {
  'string.pattern.base': 'Password must contain at least 6 characters, one uppercase letter, and one special character.',
  'string.empty': 'Password is required.',
};

export const registerValidation = Joi.object({
  username: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 2 characters long',
  }),
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().pattern(passwordPattern).required().messages(passwordMessages),
});

export const loginValidation = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
