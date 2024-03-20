
// When expressJs use API alway has req, res and next. next to middleware  or route function next
const { throwErrorWithStatus } = require("./errorHandler");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
        return throwErrorWithStatus(403, "Credentials not provided.", res, next);
    }
    const rawToken = token.split(' ')[1]; // Get the second part after 'Bearer'

    jwt.verify(rawToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return throwErrorWithStatus(401, "Invalid credentials.", res, next);
        }
        // If token is valid, set decoded user information to req.user
        req.user = decoded;
        next(); // Move to the next middleware or route handler
    });
};

module.exports = {
    verifyToken
};
