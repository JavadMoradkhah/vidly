const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const genreSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 50, required: true },
});

const Genre = model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;
