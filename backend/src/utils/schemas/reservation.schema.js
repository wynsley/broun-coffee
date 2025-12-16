const Joi = require('joi');

const id = Joi.string().guid({ version: 'uuidv4' });

const updateReservationSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'cancelled'),
});

const getReservationSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  updateReservationSchema,
  getReservationSchema,
};
