const mongoose = require('mongoose')

const passwordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const passwordResetModel = mongoose.model("passwordReset", passwordResetSchema);

module.exports = passwordResetModel;