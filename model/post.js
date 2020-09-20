const mongoose = require('mongoose');

const Comment = require('./comment');

var postSchema = new mongoose.Schema({
    _id: {
        created: {
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            },
            date: {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            },
            hour: {
                type: Number,
                required: true
            },
            minute: {
                type: Number,
                required: true
            },
            seconds: {
                type: Number,
                required: true
            }
        },
        uuid: {
            type: String,
            required: true
        },
    },

    author: {
        type: mongoose.Types.ObjectId,
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

    comments: [
        Comment.schema.clone().add(
            {
                replies: [Comment.schema]
            }
        )
    ],

    edits: {
        type: Number,
        default: 0
    },

    lastEdited: { // Epoch
        type: Number,
        required: false
    },
    progress: {
        upvotes:{
            type: Number,
            default: 0
        },
        downvotes:{
            type: Number,
            default: 0
        },
        score: {
            type: Number,
            default: 0
        },
        approved: {
            type: Boolean,
            default: false
        }
    }
});


module.exports = mongoose.model('Post', postSchema, 'posts');