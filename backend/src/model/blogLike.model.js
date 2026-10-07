const mongoose = require("mongoose");

const blogLikeSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    },
    {
        timestamps: true
    }
);

blogLikeSchema.index(
    { blog: 1, user: 1 },
    { unique: true }
);

const BlogLike = mongoose.model("BlogLike", blogLikeSchema);

module.exports = BlogLike;