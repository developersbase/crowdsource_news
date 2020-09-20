const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId
  },
  body: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Comment", commentSchema);
