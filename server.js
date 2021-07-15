const fs = require('fs');
const path = require('path');
const express = require('express');

// code to let heroku set an environment so it can run on port 80
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// route to add css and js
app.use(express.static('public'));

// require data
const { animals } = require('./data/animals');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



// getting server to listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

