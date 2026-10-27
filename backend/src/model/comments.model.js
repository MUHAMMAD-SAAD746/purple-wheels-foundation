const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog",
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        // null for comments (not used for comments), used when replying to a comment
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
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "approved"
        }
    },
    {
        timestamps: true
    }
);

const commentModel = mongoose.model("comments", commentSchema)

module.exports = commentModel;