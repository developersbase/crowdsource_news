// Importing modules 
const express = require('express');
const router = express.Router();

// Importing User Schema 
const User = require('../model/user');
const e = require('express');
// User login api 
router.post('/login', (req, res) => {
    // Find user with requested email 
    User.findOne(req.body.email ? { email: req.body.email } : { username: req.body.username }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                req.session.Auth = user._id;
                return res.status(201).send({
                    message: "User Logged In",
                })
            }
            else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
});

// User signup api 
router.post('/signup', (req, res, next) => {

    // Creating empty user object 
    let newUser = new User();

    // Initialize newUser object with request data 
    newUser.username = req.body.username;
    newUser.email = req.body.email;

    // Call setPassword function to hash password 
    newUser.setPassword(req.body.password);

    // Save newUser object to database 
    newUser.save((err, User) => {
        if (err) {
            return res.status(400).send({
                message: "Failed to add user."
            });
        }
        else {
            return res.status(201).send({
                message: "User added successfully.\n\n" + User.toString()
            });
        }
    });
});

router.get('/lookup', (req, res, next) => { // Use Lookup with Email OR Username in body to Check Availability
    User.findOne(req.body.email ? { email: req.body.email } : { username: req.body.username }, (err, user) => {
        if (err) return console.log(err);

        if (!req.body.email && !req.body.username) {
            return res.status(400).send({
                message: "Nor Username Neither Email Specified."
            });
        }

        if (!user) {
            res.setHeader('Exists', 0);

            return res.status(201).send({
                message: (req.body.email ? "Email" : "Username") + " is Unique."
            })
        } else {
            res.setHeader('Exists', 1);

            return res.status(400).send({
                message: req.body.email ? "User with Email Exists." : "User with Username Exists."
            });
        }
    });
});

// Export module to allow it to be imported in other files 
module.exports = router; 
