const mongoose = require('mongoose');
const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function () {
  mongoose.connect(process.env.MONGO_DB).then(() => winston.info('Connected to the MongoDB...'));
};
