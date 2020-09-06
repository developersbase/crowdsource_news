const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: String,
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model('commnet', commentSchema);