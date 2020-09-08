/* ================================= IMPORTS ================================ */

const fs = require("fs");

const dbClient = require("mongoose");
const express = require("express");
const session = require("express-session");
const https = require("https");

require("dotenv").config();

/* ================================== SETUP ================================= */

const uri = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

/* =============================== ROUTES ============================== */

const posts = require("./routes/post");
const user = require("./routes/user");

app.use("/api/posts", posts);
app.use("/api/users", user);

/* ================================== DEMO ================================== */

app.get("/", (req, res) => {
    res.send("Whazzzuuppp1!!");
});

/* ================================= SERVER ================================= */

const httpsServer = https.createServer(
    {
        cert: fs.readFileSync("./ssl/cert.pem"),
        key: fs.readFileSync("./ssl/key.pem"),
    },
    app
);

dbClient
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        httpsServer.listen(5000, (err) =>
            err ? console.error(err) : console.log("LISTENING on 5000")
        );
    })
    .catch((error) => console.error(error));
