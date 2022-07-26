const winston = require('winston');
const express = require('express');
const app = express();

require('dotenv').config();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Server is listening: http:///localhost:${port}/api/`);
});

module.exports = server;
