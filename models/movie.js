const Joi = require('joi');
const { genreSchema } = require('./genre');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Movie = model(
  'Movie',
  new Schema({
    title: { type: String, minLength: 5, maxLength: 255, trim: true, required: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, min: 0, max: 255, required: true },
    dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
