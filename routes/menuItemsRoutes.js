const express = require('express');
const router = express.Router(); 
const MenuItems = require('./../models/MenuItems');


// POST method to add the menu items
router.post('/', async function (req, res) {
    try {
        const data = req.body;
        const newMenuItem = new MenuItems(data);
        
        const savedMenuItem = await newMenuItem.save();
        
        console.log(savedMenuItem);
        res.status(201).json(savedMenuItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
  });
  // GET method to get the menu items
  router.get('/', async function (req, res) {
    try {
        const menuItems = await MenuItems.find();
        res.json(menuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
  });
  router.get('/:taste', async function (req, res) {
    try {
        const taste = req.params.taste;
        if(!['Spicy', 'Sweet', 'Sour','Sour'].includes(taste)) {
            return res.status(400).json({ error: 'Invalid test type' });
        }
        const menuItems = await MenuItems.find({ taste: taste });
        res.status(200).json(menuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
  });
  module.exports = router;
  