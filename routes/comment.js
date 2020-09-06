const express    =    require('express')
      comments    =    require('../model/comment')
      posts      =    require('../model/post')
      router     =    express.Router();
      

      router.post('/blogs/:id/comments',middleware.isLoggedIn,(req,res) => {
            Blogs.findById(req.params.id , (err, blog) => {
                if(err) {
                    console.log(err);
                    res.redirect('back')
                } else {
                    Comment.create(req.body.comment, (err, comment) => {
                        if(err) {
                            req.flash("error", "Something went wrong");
                            console.log(err);
                        } else {
                            comment.author.id = req.user._id;
                            comment.author.username = req.user.username;
                            comment.save()
                            blog.comments.push(comment);
                            blog.save();
                            req.flash("success", "Successfully added comment");
                            res.redirect(`/blogs/${blog._id}`)
                        }
                    })
                }
            })
        });
        
        router.delete('/blogs/:id/comments/:comment_id', middleware.checkCommentOwnership ,(req,res) => {
            Comment.findByIdAndDelete(req.params.comment_id,(err,removeComment) => {
                if(err) {
                    res.redirect('back');
                } else {
                    req.flash("success", "Comment deleted");
                    res.redirect('/blogs/' + req.params.id )
                }
            })
        });






module.exports = router;