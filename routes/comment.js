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

module.exports = router;