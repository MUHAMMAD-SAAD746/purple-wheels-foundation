const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected Successfully");
    } catch (err) {
        console.error("MongoDb connection error")
        throw err;
    }
}

module.exports = connectDb;