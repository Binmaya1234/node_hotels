const express = require('express');
const router = express.Router(); 
const Person = require('./../models/person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt'); 

//signup route
router.post('/signup', async function (req, res) {
  try {
      const data = req.body;
      const newPerson = new Person(data);
      
      const savedPerson = await newPerson.save();
      
      //console.log(savedPerson);
      const payload = {
        id: savedPerson.id,
        username: savedPerson.username,
      };
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      //console.log("Token is :",token);
      res.status(201).json({response:savedPerson, token:token});
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
});

//login route

router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username });
        // Check if user exists and compare password properly
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const payload = { 
            id: user.id,
            username: user.username,
        };
        const token = generateToken(payload);
        res.status(200).json({token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

//profile route
router.get('/profile', jwtAuthMiddleware, async function (req, res) {
    try {
        const userData = req.user;
        console.log(userData); 
        
        if (!userData || !userData.user || !userData.user.id) {
            return res.status(400).json({ error: 'Invalid token payload' });
        }

        const userId = userData.user.id.trim();
        const user = await Person.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// GET method to get the person details
router.get('/',jwtAuthMiddleware, async function (req, res) {
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
