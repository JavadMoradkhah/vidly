const genreRoutes = require('./routes/genres');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

app.use(express.json());

dotenv.config();

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening: http:///localhost:${port}/api/`);
});
