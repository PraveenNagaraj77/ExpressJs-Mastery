const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),

  email: Joi.string().email().required(),

  age: Joi.number().min(18).required(),
});

module.exports = userSchema;