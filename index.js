const fs = require('fs');

const dbClient = require('mongoose');
const express = require('express');
const https = require('https');

const uri = process.env.MONGODB_URL;

const app = express();

const user = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/user', user);

//setup
// const posts          = require('./model/post');
const methodOverride = require("method-override");

//config

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//demo
app.get('/', (req, res) => {
    res.send("Whazzzuuppp1!!");
});

//route setup
const posts = require('./routes/post');

app.use('/api/post', posts);

//server

const httpsServer = https.createServer({
    cert: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/key.pem')
}, app);

dbClient.connect(uri, { useNewUrlParser: true })
    .then(() => {
        httpsServer.listen(3000, err => err ? console.error(err) : console.log("LISTENING on 3000"));
    })
    .catch(error => console.error(error));