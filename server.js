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




// creating a new GET route for animals using animal id to sort by animal
app.get('/api/animals/:id',  (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result); 
  } else {
    res.send(404);
  }
});




// adding the route
app.get('/api/animals', (req, res) => {
    let results =animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(results);
});

// create a route to the server that accepts data to be used or stored in server
app.post('/api/animals', (req,res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

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

