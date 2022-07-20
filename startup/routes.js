const express = require('express');
const genreRoutes = require('../routes/genres');
const customerRoutes = require('../routes/customers');
const movieRoutes = require('../routes/movies');
const rentalRoutes = require('../routes/rentals');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const error = require('../middlewares/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genres', genreRoutes);
  app.use('/api/customers', customerRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/rentals', rentalRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use(error);
};
