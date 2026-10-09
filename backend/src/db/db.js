// const mongoose = require('mongoose')

// const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("DB Connected Successfully");
//     } catch (err) {
//         console.error("MongoDb connection error")
//         throw err;
//     }
// }

// module.exports = connectDb;





// ==========================================================================
// the above code can not work properly on serverless deployment like vercel 
// thats why we are using the approach below
// ==========================================================================



const mongoose = require("mongoose");

let connectionPromise;

const connectDb = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGO_URI)
            .then(() => {
                console.log("DB Connected Successfully");
                return mongoose.connection;
            })
            .catch((err) => {
                connectionPromise = null;
                console.error("MongoDB connection error:", err.message);
                throw err;
            });
    }

    return connectionPromise;
};

module.exports = connectDb;
