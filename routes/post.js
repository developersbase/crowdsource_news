const express = require("express");
const { v4: uuidv4 } = require('uuid');

const Post = require("../model/post"); // Post Model
const User = require("../model/user"); // User Model

const comments = require("./comment"); // Comments Route
const { posts: postsMW, helper, userSession } = require("../middleware/middleware"); // Middlewares

const FETCH_COUNT = Number(process.env.FETCH_COUNT);

const router = express.Router();

/* ================================ ALL POSTS / SEARCH =============================== */

router.get("/fetch", (req, res) => {
  // Returns list of News Thumbnails/Previews
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");

    postProcessor({ title: regex }, req)
      .then((posts) => {
        if (posts.length < 1) {
          return res
            .status(404)
            .json({ message: "No Posts Found for Search Query" });
        }

        res.status(200).json(posts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err });
      });
  } else {
    postProcessor({}, req)
      .then((posts) => {
        if (posts.length < 1) {
          return res
            .status(404)
            .json({ message: "No Posts Found as Per Request" });
        }

        res.status(200).json(posts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err });
      });
  }
});

/* =========================== FETCH POST BY UUID =========================== */

router.get("/:postUUID", (req, res) => {
  postProcessor({ "_id.uuid": req.params.postUUID }, req)
    .then((posts) => {
      // console.log(posts);
      res.status(200).json(posts[0]);
    })
    .catch((err) => console.log(err));
});

/* =============================== CREATE POST ============================== */

router.post("/new", userSession.isLoggedIn, (req, res) => {
  // req.body.post.author = req.user._id, // Store User ObjectId as Author field
  req.body.author = req.session.userID;
  req.body._id = {
    created: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      day: new Date().getDay(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    },
    uuid: uuidv4()
  };

  Post.create(req.body, (err) => {
    if (err) {
      return console.log(err);
    }

    res.status(200).json(req.body);
  });
});

/* ======================== POST DELETION ======================= */

router.delete(
  "/:postUUID",
  userSession.isLoggedIn,
  postsMW.checkAuthor,
  (req, res) => {
    Post.remove({ "_id.uuid": req.params.postUUID }, (err) => {
      if (err) {
        console.log(err);

        res.status(404).json(err);
      } else {
        res.status(200).json({ message: "Post removed successfully." });
      }
    });
  }
);

/* ============================= UPVOTES & DOWNVOTES ROUTES ============================= */

router.put("/:postUUID/vote", userSession.isLoggedIn, (req, res) => {
  Post.findOne({ "_id.uuid": req.params.postUUID }, (err, post) => {
    if (err) {
      res.status(400).send({ message: "Post Fetch Failed on Vote" });
      return console.log(err);
    }

    /*///////////////////////////////////////////////////////////////////////////////////////////
      (a) Check Vote Polarity at first.
      (b) If user hasn't Voted in this polarity, Check if voted in the inverse polarity.
      (c) If not voted in inverse polarity, simply add vote to current polarity.
      (d) Else remove from inverse polarity and add to current polarity.
    *////////////////////////////////////////////////////////////////////////////////////////////

    if (req.body.votePolarity > 0) { // Upvote Request
      let index = post.progress.upvotes.findIndex(voterID => voterID == req.session.userID);
      let invIndex = post.progress.downvotes.findIndex(voterID => voterID == req.session.userID);

      if (index == -1) {
        invIndex == -1
          ?
          post.progress.upvotes.unshift(req.session.userID)
          :
          post.progress.upvotes.unshift(post.progress.downvotes.splice(invIndex, 1)[0]);
      } else {
        post.progress.upvotes.splice(index, 1);
      }
    } else { // Downvote Request
      let index = post.progress.downvotes.findIndex(voterID => voterID == req.session.userID);
      let invIndex = post.progress.upvotes.findIndex(voterID => voterID == req.session.userID);

      if (index == -1) {
        invIndex == -1
          ?
          post.progress.downvotes.unshift(req.session.userID)
          :
          post.progress.downvotes.unshift(post.progress.upvotes.splice(invIndex, 1)[0]);
      } else {
        post.progress.downvotes.splice(index, 1);
      }
    }

    post.save((err) => {
      if (err) {
        res.status(500).send({ message: "Post Save Failed on Vote" });
        return console.log(err);
      }

      res.status(200).json({ message: "Vote Action Success" });
    })
  });
});

/* ======================= COMMENTS & REPLIES HANDLING ====================== */

router.use("/:postUUID/comments/", (req, res, next) => {
  Post.findOne({ "_id.uuid": req.params.postUUID }, (err, post) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Post Find Error on Comment action." });
    }

    req.body.post = post;
    next()
  })
}, comments);
//userSession.isLoggedIn,

/* ============================== HELPER FUNCTIONS ============================= */

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function postProcessor(filter, req) {
  // Fetch post according to filter and replace Author fields with User Object
  return new Promise((solve, reject) => {
    Post.find(filter, async (err, posts) => {
      if (err) {
        console.log(err);
        reject("Post Find Error");
      }

      let postIndex = req.body.postsCount;
      posts = posts.slice(postIndex, postIndex + FETCH_COUNT);

      for (postIndex; postIndex < posts.length; postIndex++) {
        await User.findById(posts[postIndex].author).then((user) => {
          posts[postIndex] = posts[postIndex].toObject();
          posts[postIndex].author = helper.authorBuilder(user);

          posts[postIndex].progress.selfVote = helper.voteChecker(posts[postIndex].progress, req);

          posts[postIndex].progress.upvotes = posts[postIndex].progress.upvotes.length;
          posts[postIndex].progress.downvotes = posts[postIndex].progress.downvotes.length;

          delete posts[postIndex].comments;
        }).catch(err => res.status(400).json({ message: err }));
      }

      postIndex = req.body.postsCount;
      solve(posts.slice(postIndex, postIndex + FETCH_COUNT));
    });
  });
}

module.exports = router;