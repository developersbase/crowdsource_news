const express = require("express");

const Post = require("../model/post"); // Model
const comments = require("./comment"); // Route
const MW = require("../middleware/middleware"); // Middlewares

const router = express.Router();

/* ================================ ALL POSTS / SEARCH =============================== */

router.get("/fetch", (req, res) => {
  // Returns list of News Thumbnails/Previews
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    //get all posts
    Post.find({ title: regex }, (err, posts) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server Internal Error" });
      } else {
        if (allposts.length < 1) {
          res.status(404).json({ message: "No Posts Found for Search Query" });
        }
        res.status(200).json(posts);
      }
    });
  } else {
    Post.find({}, (err, posts) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server Internal Error" });
      } else {
        res.status(200).json(posts);
      }
    });
  }
});

/* =========================== FETCH POST BY UUID =========================== */

router.get("/:postUUID", (req, res) => {
  Post.findOne({ "_id.uuid": req.params.postUUID }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: "Find Error" });
    }

    // Process Data

    res.status(200).json(data.toJSON());
  });
});

/* =============================== CREATE POST ============================== */

router.post("/new", MW.userSession.isLoggedIn, (req, res) => {
  // req.body.post.author = req.user._id, // Store User ObjectId as Author field
  req.body["author"] = req.session.userID;
  Post.create(req.body, (err) => {
    if (err) {
      return console.log(err);
    }

    res.status(201).send({
      message: "ALL OK",
    });
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
  Post.findOneAndUpdate(
    { "_id.uuid": req.params.postUUID },
    req.body.vote,
    (err, data) => {
      if (err) {
        res.status(400).send({ message: "voting failed" });
        return console.log(err);
      } else {
        res.send(200).send({ message: "voting successful" });
      }
    }
  );
});

/* ======================= COMMENTS & REPLIES HANDLING ====================== */

router.use("/:postUUID/comments/", MW.userSession.isLoggedIn, comments);
//MW.userSession.isLoggedIn,

/* ============================== SEARCH FILTER ============================= */

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
