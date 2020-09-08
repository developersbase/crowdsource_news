const User = require('../model/user');
const session = require('express-session');


const middlewareObj = {};

/* ====================== USER AUTHORIZATION MIDDLEWARE ===================== */

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.session.userID) {
        return res.status(200).send({ message: "User Authorized" , userID: req.session.userID});
    } else {
        return res.status(401).send({ message: "error" });
    }
};

module.exports = middlewareObj;

