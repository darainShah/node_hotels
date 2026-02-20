const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        required: true,
        enum: ['chef', 'waiter', 'manager']
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {

    const person = this;

    // Hash the password only if it is modified and if it's new 
    if (!password.isModified('password')) return next();
    try {
        // Hash Password generation
        const salt = await bcrypt.genSalt(10);
        // Hashed Password
        const hashedPassword = await bcrytp.hash(person.password, salt);

        // Override the plain password with the hash password
        person.password = hashedPassword;

        next();
    } catch (err) {
        return next(err);
    }
})


personScehma.methods.comparePassword = async function (candidatePassword) {
    try {
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
        next();
    } catch (err) {
        reutrn err;
    }
}
// Create Person model

const Person = mongoose.model('person', personSchema);
module.exports = Person;