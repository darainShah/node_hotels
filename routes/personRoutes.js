const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');


// Signup Route
router.post('/person', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        console.log("Data saved");

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(json.stringfy(payload));

        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({ response: response, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route

router.post('./login', async (req, res) => {
    try {
        // Extract username and password from request body 
        const { username, password } = req.body();
        // Find the user by username
        const user = await Person.findOne({ username: username });

        // if user doesnot exist or password doesnot match return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        //Generate token
        const payload = {
            id: user.id,
            user: user.username
        }
        const token = generateToken(payload);

        // Return token as response
        res.json(token);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

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