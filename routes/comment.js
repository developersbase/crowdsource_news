const express = require('express')
const router = express.Router({ mergeParams: true });

const Post = require('../model/post');
const { ObjectId } = require('mongodb');


router.put('/new', (req, res) => {
    Post.findOne({ '_id.uuid': req.params.postUUID }, (err, post) => {
        console.log(req.params.postUUID);
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            req.body.comment['author'] = ObjectId("5f53c1e08b56fe5d74080c9b");

            post.comments.push(req.body.comment);
            post.save();

            res.status(200).send("Added Comment!");
        }
        console.log(post);
    });
});

router.put('/:commentUUID/replies/new', (req, res) => {
    Post.findOne({'_id.uuid': req.params.postUUID}, (err, post) => {
            if (err) return console.log(err);

            let replyTargetIndex = post.comments.findIndex(comment => comment._id == req.params.commentUUID);

            console.log(replyTargetIndex);

            req.body.reply['author'] = ObjectId("5f53c1e08b56fe5d74080c9b");

            try {
                req.body.reply.upvote == null;
                req.body.reply.downvote == null;
            } catch {}

            post.comments[replyTargetIndex].replies.push(req.body.reply);
            post.save();

            console.log(post);
            res.send(post);
        })
})

module.exports = router;