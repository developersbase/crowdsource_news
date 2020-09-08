const User = require('../model/user')


const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(201).send({
            message: "User Logged In",
        });
    } else {
        return res.status(400).send({
            message: "Wrong Password"
        });
    }
};

module.exports = middlewareObj;