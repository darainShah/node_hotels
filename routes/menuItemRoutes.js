const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

// Post method to add a menu item
router.post('/', async (req, res) => {

    console.log("BODY RECEIVED:", req.body);  // 👈 ADD THIS

    try {
        const newMenu = new MenuItem(req.body);
        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// get method for meni item
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sour' || taste == 'sweet' || taste == 'spicy') {
            const response = await Menu.find({ taste: taste });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Taste' });
        }
    } catch (error) {
        console.log('Error');
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports = router;