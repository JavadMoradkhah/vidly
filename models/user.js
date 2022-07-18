const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
require('dotenv').config();
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 50, required: true },
  email: { type: String, minLength: 5, maxLength: 255, unique: true, required: true },
  password: { type: String, minLength: 5, maxLength: 1024, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
