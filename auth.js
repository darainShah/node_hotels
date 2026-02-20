
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication Logic here
    try {
        console.log('Credentials Received:', USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'incorrect username.' });
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "incorrect password" })
        }
    }
    catch (err) {
        return done(err);
    }
}))

module.export = passport;