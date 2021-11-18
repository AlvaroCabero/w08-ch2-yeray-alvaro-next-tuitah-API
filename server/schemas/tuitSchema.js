const { Joi } = require("express-validation");

const tuitSchema = {
  body: Joi.object({
    text: Joi.string().max(200).required(),
  }),
};

module.exports = {
  tuitSchema,
};
