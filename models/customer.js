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

module.exports = Customer;
