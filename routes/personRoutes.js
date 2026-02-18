const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/person', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get method for the person 
router.get('/person', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.get('/person/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'waiter' || worktype == 'manager') {
            const response = await Person.find({ work: worktype });
            console.log('response fetched');
            req.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid worktype' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server error' })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the id from the url parameter
        const updatedPersonData = req.body; // updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // Run mongoose validatation
        })
        console.log('data updated');
        res.status(200).json(response);

        if (!response) {
            res.status(404).json({ error: 'person not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            res.status(404).json({ error: 'person not found' });
        }
        console.log('data deleted');
        res.status(200).json({ message: 'data deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

module.exports = router;

// checking 