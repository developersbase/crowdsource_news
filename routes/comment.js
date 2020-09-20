const express = require("express");
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require("uuid");

const MW = require("../middleware/middleware"); // Middlewares

/* =============================== MAKE COMMENT ============================== */

router.put("/new", (req, res) => {
  let post = req.body.post;

  req.body["author"] = req.session.userID;
  req.body["_id"] = uuidv4();

  post.comments.unshift(req.body);
  post.save((err, post) => {
    if (err) return res.status(500).send("Server internal error.");

    res.status(200).json(post.comments);
  });
});

/* ============================= DELETE COMMENT ============================= */

router.delete("/:commentUUID", MW.comments.checkAuthor, (req, res) => {
  let post = req.body.post;

  post.comments.splice(findCommentIndex(post, req.params.commentUUID), 1);
  post.save((err) => {
    if (err) res.status(400).send();
    else res.status(200).json({ message: "Successfully Removed Comment." });
  });
});

/* =============================== MAKE REPLY =============================== */

router.put("/:commentUUID/replies/new", (req, res) => {
  let post = req.body.post;

  req.body["author"] = req.session.userID;
  req.body["_id"] = uuidv4();

  post.comments[findCommentIndex(post, req.params.commentUUID)].replies.push(
    req.body
  );
  post.save();

  res.status(200).json(post);
});

/* ============================= COMMENT VOTING ============================= */

router.put("/:commentUUID/vote", (req, res) => {
  let post = req.body.post;
  let ind = findCommentIndex(post, req.params.commentUUID);
  let commentReference = post.comments[ind];

  if (req.body.votePolarity > 0) { // Upvote Request
    let index = commentReference.upvotes.findIndex(voterID => voterID == req.session.userID);
    let invIndex = commentReference.downvotes.findIndex(voterID => voterID == req.session.userID);

    if (index == -1) {
      invIndex == -1
        ?
        post.comments[ind].upvotes.unshift(req.session.userID)
        :
        post.comments[ind].upvotes.unshift(post.comments[ind].downvotes.splice(invIndex, 1)[0]);
    } else {
      post.comments[ind].upvotes.splice(index, 1);
    }
  } else { // Downvote Request
    let index = commentReference.downvotes.findIndex(voterID => voterID == req.session.userID);
    let invIndex = commentReference.upvotes.findIndex(voterID => voterID == req.session.userID);

    if (index == -1) {
      invIndex == -1
        ?
        post.comments[ind].downvotes.unshift(req.session.userID)
        :
        post.comments[ind].downvotes.unshift(post.comments[ind].upvotes.splice(invIndex, 1)[0]);
    } else {
      post.comments[ind].downvotes.splice(index, 1);
    }
  }

  post.save((err) => {
    if (err) {
      res.status(500).send({ message: "Post Save Failed on Comment Vote" });
      return console.log(err);
    }

    res.status(200).json({ message: "Vote Action Success" });
  });
});

/* ============================ HELPER FUNCTIONS ============================ */

function findCommentIndex(post, commentUUID) {
  return post.comments.findIndex((comment) => comment._id == commentUUID);
}

module.exports = router;
