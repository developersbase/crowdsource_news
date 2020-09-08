const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

var commentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4()
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
