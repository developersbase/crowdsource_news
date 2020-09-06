const express = require('express');
const Post = require('../model/post');
comments = require('../model/comment')
router = express.Router();


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


//all posts page

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

//post upload form

router.post('/new', (req, res) => {
    req.body.post.author = req.user._id, // Store User ObjectId as Author field

    Post.create(req.body.post, (err, newlyCreated) => {
        if (err) {
            console.log('err')
        }
        // else {
        //     res.redirect('/fetch')
        // }
    });
});

//individual  post page
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).populate("comments").exec((err, foundpost) => {
        if (err) {
            console.log('error');
        } 
        // else {
        //     res.render('', { post: foundpost });
        // }
    })
});


//for search filter 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;