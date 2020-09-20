const express = require("express");
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require("uuid");

const { comments: commentsMW, helper, userSession } = require("../middleware/middleware"); // Middlewares
const User = require("../model/user");

const FETCH_COUNT = Number(process.env.FETCH_COUNT);

/* ============================== GET COMMENTS ============================== */

router.get("/fetch", async (req, res) => {
  let comIndex = req.body.commentsCount;
  let comments = req.body.post.toObject().comments.slice(comIndex, comIndex + FETCH_COUNT);

  for (
    comIndex;
    comIndex < comments.length;
    comIndex++
  ) {
    await User.findById(comments[comIndex].author).then((user) => {
      delete comments[comIndex].replies;

      comments[comIndex].author = helper.authorBuilder(user);
      comments[comIndex].selfVote = helper.voteChecker(comments[comIndex], req);
    }).catch(err => res.status(400).json({ message: err }));
  }

  comIndex = req.body.commentsCount;
  return res.status(200).json(comments);
});

/* =============================== MAKE COMMENT ============================== */

router.put("/new", userSession.isLoggedIn, (req, res) => {
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

router.delete("/:commentUUID", userSession.isLoggedIn, commentsMW.checkAuthor, (req, res) => {
  let post = req.body.post;

  post.comments.splice(findCommentIndex(post, req.params.commentUUID), 1);
  post.save((err) => {
    if (err) res.status(400).send();
    else res.status(200).json({ message: "Successfully Removed Comment." });
  });
});

/* =============================== GET REPLIES ============================== */

router.get("/:commentUUID/replies/fetch", async (req, res) => {
  let replies = req.body.post.toObject().comments[helper.findCommentIndex(req.body.post, req.params.commentUUID)].replies.slice(repIndex, repIndex + FETCH_COUNT);
  let repIndex = req.body.repliesCount;

  for (
    repIndex;
    repIndex < replies.length;
    repIndex++
  ) {
    await User.findById(replies[repIndex].author).then((user) => {
      replies[repIndex].author = helper.authorBuilder(user);
      replies[repIndex].selfVote = helper.voteChecker(replies[repIndex], req);
    }).catch(err => res.status(400).json({ message: err }));
  }

  repIndex = req.body.repliesCount;

  console.log(repIndex, repIndex + FETCH_COUNT);

  return res.status(200).json(replies.slice(repIndex, repIndex + FETCH_COUNT));
});

/* =============================== MAKE REPLY =============================== */

router.put("/:commentUUID/replies/new", userSession.isLoggedIn, (req, res) => {
  let post = req.body.post;

  req.body["author"] = req.session.userID;
  req.body["_id"] = uuidv4();

  post.comments[helper.findCommentIndex(post, req.params.commentUUID)].replies.push(
    req.body
  );
  post.save();

  res.status(200).json(post);
});

/* ============================= COMMENT VOTING ============================= */

router.put("/:commentUUID/vote", userSession.isLoggedIn, (req, res) => {
  let post = req.body.post;
  let ind = helper.findCommentIndex(post, req.params.commentUUID);
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

module.exports = router;
