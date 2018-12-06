const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/test', (req, res) => {
  res.send(200, 'OK');
});

app.listen(4002, () => {
  console.log('Dev dashboard API running on port 4002');
});
