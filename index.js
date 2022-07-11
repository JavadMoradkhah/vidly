const express = require('express');
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening: http:///localhost:${port}/api/`);
});
