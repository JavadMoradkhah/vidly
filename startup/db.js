const mongoose = require('mongoose');
const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function () {
  const environment = String(process.env.NODE_ENV).trim();
  const DB = environment === 'test' ? process.env.TEST_MONGO_DB : process.env.MONGO_DB;
  mongoose.connect(DB).then(() => winston.info('Connected to the MongoDB...'));
};
