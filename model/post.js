const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

var postSchema = new mongoose.Schema({
    _id: {
        created: {
            type: Number,
            default: Date.now()
        },
        uuid: {
            type: String,
            default: uuidv4()
        },
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    edits: {
        type: Number,
        default: 0
    },

    lastEdited: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Post', postSchema, 'posts');