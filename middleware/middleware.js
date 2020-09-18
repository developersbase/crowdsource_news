const Comment = require("../model/comment");
const Post = require("../model/post");

const MW = {
  userSession: {},
  posts: {},
  comments: {},
};

/* ====================== USER SESSION MIDDLEWARES ===================== */

MW.userSession.isLoggedIn = (req, res, next) => {
  if (req.session.userID) {
    req.body.user = req.session.userID;
    next();
  } else {
    return res.status(400).send({ message: "User not Logged in." });
  }
};

/* ============================ POSTS MIDDLEWARES =========================== */

MW.posts.checkAuthor = (req, res, next) => {
  Post.findOne({ "_id.uuid": req.params.postUUID }, (err, post) => {
    if (err) return console.log(err);

    if (post.author == req.session.userID) {
      next();
    } else res.status(403).send({ message: "User Unauthorized." });
  });
};

/* ========================== COMMENTS MIDDLEWARES ========================== */

MW.comments.checkAuthor = (req, res, next) => {
  Post.findOne({ "_id.uuid": req.params.postUUID }, (err, post) => {
    if (err) return console.log(err);

    let comment =
      post.comments[
        post.comments.findIndex(
          (comment) => comment._id == req.params.commentUUID
        )
      ];

    console.log(comment.author);
    console.log(req.session.userID);
    if (comment.author == req.session.userID) {
      next();
    } else res.status(403).send({ message: "User Unauthorized." });
  });
};
module.exports = MW;
