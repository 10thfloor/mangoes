const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use('/manifest', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './files/manifest.json'));
});

app.listen(4002, () => {
  console.log('Dev dashboard API running on port 4002');
});
