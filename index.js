require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const error = require('./middlewares/error');
const genreRoutes = require('./routes/genres');
const customerRoutes = require('./routes/customers');
const movieRoutes = require('./routes/movies');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();

winston.add(winston.transports.MongoDB, {
  db: process.env.MONGO_DB,
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Connected to the MongoDB...'))
  .catch((err) => {
    console.log('Could not connect to the MongoDB...', err);
    process.exit(1);
  });

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening: http:///localhost:${port}/api/`);
});
