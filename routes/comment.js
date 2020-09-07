const express = require('express')
const router = express.Router();

const Comment = require('../model/comment')
const Post = require('../model/post')


router.post('', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {                  
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    Post.comments.push(comment);
                    Post.save();
                    res.redirect(`/${post._id}`)
                }
            })
        }
    })
});

router.delete('', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err, removeComment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
});






module.exports = router;