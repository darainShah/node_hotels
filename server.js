const MenuItem = require('./models/MenuItem');

const express = require('express');
const app = express();

require('./db'); // just require, no variable

app.use(express.json());

//console.log("Before requiring model");
//const Person = require('./models/Person');
//console.log("Model loaded");

app.get('/', (req, res) => {
    res.send('Welcome to my Hotel... how may i help you!');
});

/**app.post('/person', async (req, res) => {
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
app.get('/person', async (req, res) => {
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
**/
// Post method to add a menu item
app.post('/menu', async (req, res) => {

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
app.get('/menu', async (req, res) => {
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

/**app.get('/person/:worktype', async (req, res) => {
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
**/



//Import the router file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
//use the router
app.use('/', personRoutes);
app.use('/', menuItemRoutes);

console.log("About to start server...");

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
