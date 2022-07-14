const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Genre = model(
  'Genre',
  new Schema({
    name: { type: String, minLength: 5, maxLength: 50, required: true },
  })
);

module.exports = Genre;
