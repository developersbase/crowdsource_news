/* ================================= IMPORTS ================================ */

const fs = require('fs');

const dbClient = require('mongoose');
const express = require('express');
const https = require('https');
const methodOverride = require("method-override");

/* ================================== SETUP ================================= */

const uri = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));

/* =============================== ROUTES ============================== */

const posts = require('./routes/post');
const user = require('./routes/user');

app.use('/api/posts', posts, (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use('/api/user', user);

/* ================================== DEMO ================================== */

app.get('/', (req, res) => {
    res.send("Whazzzuuppp1!!");
});

/* ================================= SERVER ================================= */

const httpsServer = https.createServer({
    cert: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/key.pem')
}, app);

dbClient.connect(uri, { useNewUrlParser: true })
    .then(() => {
        httpsServer.listen(3000, err => err ? console.error(err) : console.log("LISTENING on 3000"));
    })
    .catch(error => console.error(error));