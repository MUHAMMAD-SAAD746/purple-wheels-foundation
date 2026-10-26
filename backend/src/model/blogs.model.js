const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        subtitle: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
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

        tags: {
            type: [String],
            default: []
        },

        likeCount: {
            type: Number,
            default: 0
        },

        viewCount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const blogsModel = mongoose.model("blog", blogsSchema);

module.exports = blogsModel;