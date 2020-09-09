const express = require('express');
const Post = require('../model/post');

const comments = require('./comment');

const { ObjectId } = require('mongodb'); // ONLY FOR DEVELOPMENT | SOON TO BE REMOVED.

const router = express.Router();
const MW = require('../middleware/middleware');


//---------------------------------------------------- 

//for landing page

// router.get('/',(req,res) => {
//        post.find({}, (err,allpost) => {
//             if(err){
//                   console.log(err);
//             } else {
//                   res.send('hello')
//             }
//        })
//       res.render('', {posts : allpost})
// });
//-------------------------------------------------------


/* ================================ ALL POSTS / SEARCH =============================== */

router.get('/search', MW.userSession.isLoggedIn ,(req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //get all posts
        Post.find({ title: regex }, (err, posts) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: "Server Internal Error"});
            } else {
                if (allposts.length < 1) {
                    res.status(404).json({message: "No Posts Found for Search Query"});
                }
                res.status(200).json(posts);
            }
        });
    } else {
        Post.find({}, (err, posts) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: "Server Internal Error"});
            } else {
                res.status(200).json(posts);
            }
        })
    }
});

/* =============================== CREATE POST ============================== */

router.post('/new', (req, res) => {
    // req.body.post.author = req.user._id, // Store User ObjectId as Author field
    req.body.post.author = ObjectId(req.body.post.user._id);

    Post.create(req.body.post, (err, newlyCreated) => {
        if (err) {
            return console.log(err)
        }

        res.status(201).send({
            message: "ALL OK"
        });
    });
});

/* =========================== FETCH POST BY UUID =========================== */

router.get('/:uuid', (req, res) => {
    Post.findOne({ '_id.uuid': req.params.uuid }, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ message: "Find Error" });
        }

        // Process Data

        res.status(200).json(data.toJSON());
    })
});

router.get('/', (req, res) => {

});

/* ======================= COMMENTS & REPLIES HANDLING ====================== */

router.use('/:postUUID/comments/', comments);

/* ============================== SEARCH FILTER ============================= */

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;