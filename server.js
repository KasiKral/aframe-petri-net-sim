const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
var dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

app.get('/', function (req, res) {
  res.redirect('/home');
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(dist, 'views/index.html'));
});

app.get('/scene', function (req, res) {
  res.sendFile(path.join(dist, 'views/scene.html'));
});

app.listen(PORT, () =>
  console.log(`Server listening on port: http://localhost:${PORT}`)
);
