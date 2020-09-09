const express = require('express')
const router = express.Router({ mergeParams: true });

const Post = require('../model/post'); // Model
const MW = require('../middleware/middleware'); // Middlewares

/* =============================== MAKE COMMENT ============================== */

router.put('/new', (req, res) => {
    Post.findOne({ '_id.uuid': req.params.postUUID }, (err, post) => {
        console.log(req.params.postUUID);
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            req.body.comment['author'] = req.session.userID;

            post.comments.push(req.body.comment);
            post.save();

            res.status(200).send("Added Comment!");
        }
        // console.log(post);
    });
});

/* ============================= DELETE COMMENT ============================= */

router.delete('/:commentUUID', MW.comments.checkAuthor, (req, res) => {
    Post.findOne({'_id.uuid' : req.params.postUUID}, (err, post) => {
        if (err) return res.status(404).json({message: "Comment Removal Failed."});

        post.comments.splice(findCommentIndex(post, req.params.commentUUID), 1);
        post.save(err => res.status(200).json({message: "Successfully Removed Comment."}));
    });
});

/* =============================== MAKE REPLY =============================== */

router.put('/:commentUUID/replies/new', (req, res) => {
    Post.findOne({ '_id.uuid': req.params.postUUID }, (err, post) => {
        if (err) return console.log(err);

        req.body.reply['author'] = req.session.userID;

        try {
            req.body.reply.upvote == null;
            req.body.reply.downvote == null;
        } catch { }

        post.comments[findCommentIndex(post, req.params.commentUUID)].replies.push(req.body.reply);
        post.save();

        console.log(post);
        res.send(post);
    })
})

/* ============================ HELPER FUNCTIONS ============================ */

function findCommentIndex(post, commentUUID) {
    return post.comments.findIndex(comment => comment._id == commentUUID);
}

module.exports = router;