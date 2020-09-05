const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({

});

module.exports = mongoose.model('Post', postSchema, 'posts');