const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
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
};
