const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
//const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
//const mongoURL = 'mongodb+srv://darain:Darain@1729@cluster0.9o91lfs.mongodb.net/'
const mongo_url = process.env.mongodb_url;
//const mongo_url_local = process.env.mongodb_url_local;

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