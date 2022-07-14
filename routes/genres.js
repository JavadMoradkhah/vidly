const Joi = require('joi');
const Genre = require('../models/genre');
const express = require('express');
const router = express.Router();

// const genres = [
//   { id: 1, name: 'Action' },
//   { id: 2, name: 'Comedy' },
//   { id: 3, name: 'Crime' },
//   { id: 4, name: 'Drama' },
//   { id: 5, name: 'Fantasy' },
//   { id: 6, name: 'Horror' },
//   { id: 7, name: 'Romance' },
//   { id: 8, name: 'Thriller' },
//   { id: 9, name: 'Western' },
//   { id: 10, name: 'Historical' },
// ];

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  try {
    const result = await genre.save();
    res.send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
