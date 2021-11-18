const { Joi } = require("express-validation");

const tuitSchema = {
  body: Joi.object({
    text: Joi.string().alphanum().max(200).required(),
    date: Joi.string().required(),
  }),
};

module.exports = {
  loginRequestSchema,
};
