const mongoose = require('mongoose');
let Comment  = require('./comments');
let User     = require('./user')

var postSchema = new mongoose.Schema({
    title:String,
    image:String,
    description: { type:String, default:'..' },
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String,
     },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ],
    date:{type: Date, default: Date.now} 
});


module.exports = mongoose.model('Post', postSchema, 'posts');