const express    =    require('express');
const post       = require('../model/post');
      comments   =    require('../model/comment')
      posts      =    require('../model/post')
      router     =    express.Router();
 




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

router.get('/posts',(req,res) => {
      var noMatch = null;
      if(req.query.search) {
          const regex = new RegExp(escapeRegex(req.query.search), 'gi');
          //get all posts
          post.find({title: regex},(err,allposts) => {
              if(err) {
                  console.log(err);
              } else {
                  if(allposts.length < 1) {
                      noMatch = 'No posts match that query.please try again';
                  }
                  res.render('',{posts: allposts, noMatch:noMatch})
              }
          });
          } else {
      post.find({},(err,allposts) => {
          if(err) {
              console.log(err);
          } else {
              res.render('', {posts: allposts});
          }
      })
  }
  });

  //post uplaod  request(post request)

  router.post('/posts',(req,res) => {
   
    req.body.post.author = {
        id: req.user._id,
        username: req.user.username
    }
    
    post.create(req.body.post,(err,newlyCreated) => {
        if(err){
            console.log('err')
        } else {
            res.redirect('/posts')
        }
    });
});

//post upload form

router.get('/posts/new',(req,res) => {
    res.render('')
});

//individual  post page
router.get('/posts/:id',(req,res) => {
    posts.findById(req.params.id).populate("comments").exec((err,foundpost) => {
        if(err){
            console.log('error');
        } else {
            res.render('',{post: foundpost});
        }
    })
});





//for search filter 
function escapeRegex(text){
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

module.exports = router;