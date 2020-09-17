const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Comment = require('./comment');

var postSchema = new mongoose.Schema({
    _id: {
        created: {
            year: {
                type: Number,
                default: new Date().getFullYear()
            },
            month: {
                type: Number,
                default: new Date().getMonth()
            },
            date: {
                type: Number,
                default: new Date().getDate()
            },
            day: {
                type: Number,
                default: new Date().getDay()
            },
            hour: {
                type: Number,
                default: new Date().getHours()
            },
            minute: {
                type: Number,
                default: new Date().getMinutes()
            },
            seconds: {
                type: Number,
                default: new Date().getSeconds()
            }
        },
        uuid: {
            type: String,
            default: uuidv4()
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
        UV:{
            type: Number,
            default: 0
        },
        DV:{
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