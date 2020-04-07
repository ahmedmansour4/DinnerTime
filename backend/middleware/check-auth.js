const jwt = require('jsonwebtoken'); // Used to verify json web token

// This is middleware that will be used to determine if the user is logged
// in and will protect desired routes on the website
module.exports = (req, res, next) => {
    try {
        // Extract the token from the header
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authorization Failed'
        });
    }
};
