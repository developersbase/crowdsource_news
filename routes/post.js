const express = require('express');
const Post = require('../model/post');
const Comment = require('../model/comment');

const { ObjectId } = require('mongodb');
const router = express.Router();


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

router.get('/fetch', (req, res) => {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //get all posts
        Post.find({ title: regex }, (err, allposts) => {
            if (err) {
                console.log(err);
            } else {
                if (allposts.length < 1) {
                    noMatch = 'No posts match that query.please try again';
                }
                res.render('', { posts: allposts, noMatch: noMatch })
            }
        });
    } else {
        Post.find({}, (err, allposts) => {
            if (err) {
                console.log(err);
            } else {
                res.render('', { posts: allposts });
            }
        })
    }
});

//post uplaod  request(post request)

// router.get('/fetch', (req, res) => {
//     res.render('')
// });

/* =============================== CREATE POST ============================== */

router.post('/new', (req, res) => {
    // req.body.post.author = req.user._id, // Store User ObjectId as Author field
    req.body.post.author = req.body.user._id;

    Post.create(req.body.post, (err, newlyCreated) => {
        if (err) {
            return console.log(err)
        }

        res.status(201).send({
            message: "ALL OK"
        });
        // else {
        //     res.redirect('/fetch')
        // }
    });
});

/* =========================== FETCH POST BY UUID =========================== */

router.get('/:uuid', (req, res) => {
    Post.findOne({ '_id.uuid': req.params.uuid}, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).send({message: "Find Error"});
        }

        // Process Data

        res.status(200).send({
            message: data.toString()
        });
    })
});

router.get('/', (req,res) => {
    
});

/* ============================== SEARCH FILTER ============================= */

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;