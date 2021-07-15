const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

 // adding the route
 router.get('/animals', (req, res) => {
    let results =animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(results);
});


// creating a new GET route for animals using animal id to sort by animal
router.get('/animals/:id',  (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result); 
    } else {
      res.send(404);
    }
  });

 

// create a route to the server that accepts data to be used or stored in server
router.post('/animals', (req,res) => {
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

  module.exports  = router;