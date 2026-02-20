const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {

    //Extract the jwt token from the request header
    const toen = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Function to generate jwt token
const generateToken = (userData) => {
    // Generate a new jwt token using our user data
    return jwt.sign(userData, process.env.JWT_SECRET)
}
module.exports = { jwtAuthMiddleware, generateToken };
