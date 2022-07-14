const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Customer = model(
  'Customer',
  new Schema({
    name: { type: String, minLength: 3, maxLength: 30, required: true },
    phone: { type: String, minLength: 5, maxLength: 50, required: true },
    isGold: { type: Boolean, default: false },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean().default(false),
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
