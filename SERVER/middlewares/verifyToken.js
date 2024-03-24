// When expressJs use API alway has req, res and next. next to middleware  or route function next
const {throwErrorWithStatus} = require("./errorHandler");
const jwt = require('jsonwebtoken');
const db = require("../models")

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

// Check a request isAgent or none. if agent can continue to the router. Rol 7
/*
   {
        code: 'ADMIN',
        value: 'Quản Trị Viên'  // ROL1
    },
    {
        code: 'PROPERTY_OWNER', // ROL3
        value: 'Chủ tài sản'
    },
    {
        code: 'BROKER',  // ROL5
        value: 'Người môi giới'
    },
    {
        code: 'CLIENT', // ROL7
        value: 'Khách hàng'
    },
 */


const isClient = (req, res, next) => {
    const {roleCode} = req.user
    if (roleCode === "BROKER" || roleCode === "ADMIN" || roleCode === "PROPERTY_OWNER") {
        next()
    } else {
        return throwErrorWithStatus(401, "Doesn't have access", res, next)
    }
}
const isPropertyOwner = (req, res, next) => {
    const {roleCode} = req.user
    if (roleCode === "ADMIN" || roleCode === "PROPERTY_OWNER") {
        next()
    } else {
        return throwErrorWithStatus(401, "Doesn't have access", res, next)
    }

}
const isAdmin = (req, res, next) => {
    const {roleCode} = req.user
    if (roleCode === "ADMIN") {
        next()
    } else {
        return throwErrorWithStatus(401, "Doesn't have access", res, next)
    }

}


module.exports = {
    verifyToken,
    isPropertyOwner,
    isClient,
    isAdmin
};
