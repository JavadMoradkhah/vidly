const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Genre = model(
  'Genre',
  new Schema({
    name: { type: String, minLength: 5, maxLength: 50, required: true },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
