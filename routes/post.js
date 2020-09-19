const express = require("express");

const Post = require("../model/post"); // Post Model
const User = require("../model/user"); // User Model
const comments = require("./comment"); // Route
const MW = require("../middleware/middleware"); // Middlewares

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
      console.log(posts);
      res.status(200).json(posts[0]);
    })
    .catch((err) => console.log(err));
});

/* =============================== CREATE POST ============================== */

router.post("/new", MW.userSession.isLoggedIn, (req, res) => {
  // req.body.post.author = req.user._id, // Store User ObjectId as Author field
  req.body["author"] = req.session.userID;
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
          });

          return post;
        })
      ).then((posts) => solve(posts));
    });
  });
}

module.exports = router;
