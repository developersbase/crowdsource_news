const express = require("express");
const { v4: uuidv4 } = require('uuid');

const Post = require("../model/post"); // Post Model
const User = require("../model/user"); // User Model
const comments = require("./comment"); // Route
const MW = require("../middleware/middleware"); // Middlewares
const e = require("express");

const router = express.Router();

/* ================================ ALL POSTS / SEARCH =============================== */

router.get("/fetch", (req, res) => {
  // Returns list of News Thumbnails/Previews
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");

    postProcessor({ title: regex })
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
    postProcessor({})
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
  postProcessor({ "_id.uuid": req.params.postUUID })
    .then((posts) => {
      res.status(200).json(posts[0]);
    })
    .catch((err) => console.log(err));
});

/* =============================== CREATE POST ============================== */

router.post("/new", MW.userSession.isLoggedIn, (req, res) => {
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

    res.status(201).json(req.body);
  });
});

/* ======================== POST DELETION ======================= */

router.delete(
  "/:postUUID",
  MW.userSession.isLoggedIn,
  MW.posts.checkAuthor,
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

router.put("/:postUUID/vote", MW.userSession.isLoggedIn, (req, res) => {
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
  }
  );
});

/* ======================= COMMENTS & REPLIES HANDLING ====================== */

router.use("/:postUUID/comments/", MW.userSession.isLoggedIn, comments);
//MW.userSession.isLoggedIn,

/* ============================== HELPER FUNCTIONS ============================= */

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function postProcessor(filter) {
  // Fetch post according to filter and replace Author fields with User Object
  return new Promise((solve, reject) => {
    Post.find(filter, (err, posts) => {
      if (err) {
        console.log(err);
        reject("Post Find Error");
      }

      // Process Data

      Promise.all(
        posts.map(async (post) => {
          await User.findById(post.author, (err, user) => {
            if (err) {
              console.log(err);
              throw "User Find Error";
            }

            post = post.toObject();
            post.author = {
              username: user ? user.username : "Deleted User",
              avatar: "https://image.flaticon.com/icons/png/512/17/17797.png",
              profile: "/#",
            };

            post.progress.upvotes = post.progress.upvotes.length;
            post.progress.downvotes = post.progress.downvotes.length;
          });

          return post;
        })
      ).then((posts) => solve(posts));
    });
  });
}

module.exports = router;
