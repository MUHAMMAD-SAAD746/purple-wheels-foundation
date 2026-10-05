const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments",
            default: null
        },

        text: {
            type: String,
            required: true,
            trim: true
        },

        likeCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const commentModel = mongoose.model("comments", commentSchema)

module.exports = commentModel;