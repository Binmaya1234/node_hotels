const express = require('express');
const router = express.Router(); 
const Person = require('./../models/Person');



router.post('/', async function (req, res) {
  try {
      const data = req.body;
      const newPerson = new Person(data);
      
      const savedPerson = await newPerson.save();
      
      console.log(savedPerson);
      res.status(201).json(savedPerson);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
});

// GET method to get the person details
router.get('/', async function (req, res) {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.get('/:workType', async function (req, res) {  
    try {
        const workType = req.params.workType;
        if(!['Chef', 'Waiter', 'Manager'].includes(workType)) {
            return res.status(400).json({ error: 'Invalid work type' });
        }
        const persons = await Person.find({ work: workType });
        res.status(200).json(persons);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.put('/:id', async function (req, res) {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, { 
            new: true, 
            runValidators: true 
        });
        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json(updatedPerson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:id', async function (req, res) {
    try {
        const personId = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personId);
        if (!deletedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

//comment added
