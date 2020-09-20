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
    type: Array,
    default: [String]
  },
  downvotes: {
    type: Array,
    default: [String]
  }
});

module.exports = mongoose.model("Comment", commentSchema);
