require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
require('./startup/routes')(app);

dotenv.config();

process.on('uncaughtException', (error) => {
  winston.error(error.message, error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  winston.error(error.message, error);
  process.exit(1);
});

winston.add(winston.transports.MongoDB, {
  db: process.env.MONGO_DB,
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Connected to the MongoDB...'))
  .catch((err) => {
    console.log('Could not connect to the MongoDB...', err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening: http:///localhost:${port}/api/`);
});
