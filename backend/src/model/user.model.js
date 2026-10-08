const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    profileImage: {
        type: String,
        default: null
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    postCount: {
        type: Number,
        default: 0
    },

    followers: {
        type: Number,
        default: 0
    },

    following: {
        type: Number,
        default: 0
    },

    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        }
    ]
}, {
    timestamps: true,
})


const userModel = mongoose.model("users", userSchema)

module.exports = userModel;