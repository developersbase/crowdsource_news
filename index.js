//setup
const dbClient       = require('mongoose');
      express        = require('express');
      https          = require('https');
      fs             = require('fs');
      posts          = require('./model/post');
      bodyParser     = require("body-parser");
      methodOverride = require("method-override");
      app            = express();
      posts          = require('./model/post')
//mongo setup
const uri = "mongodb+srv://cr_news_backend:CR_NEWS_100@crowdnewscluster0.fmmav.gcp.mongodb.net/test?retryWrites=true&w=majority";

//config

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//demo
app.get('/', (req, res) => {
    res.send("Whazzzuuppp1!!");
});

//route setup
const postrouter = require('./routes/post');

app.use(postrouter);


//server

const httpsServer = https.createServer({
    cert: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/key.pem')
}, app);

dbClient.connect(uri, {useNewUrlParser: true}).then(() => {
    httpsServer.listen(3000, err => err ? console.error(err) : console.log("LISTENING on 3000"));
});