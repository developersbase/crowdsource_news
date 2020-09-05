const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.send("Whazzzuuppp1!!");
});

https.createServer({
    cert: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/key.pem')
}, app)
    .listen(3000, err => console.log("LISTENING on 3000"));
