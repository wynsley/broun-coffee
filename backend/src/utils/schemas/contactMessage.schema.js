const Joi = require('joi');

const id = Joi.string().guid({ version: 'uuidv4' });

const getContactMessageSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getContactMessageSchema,
};
