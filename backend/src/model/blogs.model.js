const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "wellness",
                "fashion",
                "travel",
                "motivation",
                "food"
            ]
        },

        date: {
            type: String,
            required: true
        },

        likeCount: {
            type: Number,
            default: 0
        },

        viewCount: {
            type: Number,
            default: 0
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const blogsModel = mongoose.model("Blog", blogsSchema);

module.exports = blogsModel;