const mongoose = require('mongoose');

// Define the menu schema

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        enum: ['starter', 'main course', 'dessert', 'beverage']
    },

    description: {
        type: String,
        trim: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    ingredients: {
        type: [String], // array of strings
        default: []
    },

    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true   // adds createdAt & updatedAt automatically
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;