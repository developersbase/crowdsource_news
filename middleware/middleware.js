const Comment = require('../model/comment');
const Post = require('../model/post');

const MW = {
    userSession: {},
    posts: {},
    comments: {}
};

/* ====================== USER SESSION MIDDLEWARES ===================== */

MW.userSession.isLoggedIn = (req, res, next) => {
    if (req.session.userID) {
        next();
    } else {
        return res.status(400).send({ message: "User not Logged in." });
    }
};

/* ============================ POSTS MIDDLEWARES =========================== */

MW.posts.checkAuthor = (req, res, next) => {
    Post.findOne({ '_id.uuid': req.params.postUUID }, (err, post) => {
        if (err) return console.log(err);

        if (post.author == req.session.user) {
            next();
        }
        else res.status(403).send({ message: "User Unauthorized." });
    })
}

module.exports = MW;

