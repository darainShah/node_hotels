const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

// Connect to MongoDB
mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB server');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Get the default connection
const db = mongoose.connection;

// Event listeners
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;