const dbClient = require('mongoose');

const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const uri = "mongodb+srv://cr_news_backend:CR_NEWS_100@crowdnewscluster0.fmmav.gcp.mongodb.net/test?retryWrites=true&w=majority"

app.get('/', (req, res) => {
    res.send("Whazzzuuppp1!!");
});

const httpsServer = https.createServer({
    cert: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/key.pem')
}, app);

dbClient.connect(uri, {useNewUrlParser: true}).then(() => {
    httpsServer.listen(3000, err => err ? console.error(err) : console.log("LISTENING on 3000"));
});