const mongoose = require('mongoose')

const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected Successfully");
    } catch (err) {
        console.error("MongoDb connection error")
    }
}

module.exports = connectDb;