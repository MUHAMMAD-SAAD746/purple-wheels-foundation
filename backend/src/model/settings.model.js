const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true,
        enum: ["pending", "approved"],
        default: "approved"
    }
});

module.exports = mongoose.model("Settings", settingsSchema);