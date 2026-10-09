require('dotenv').config()
const app = require("./src/app")
const connectDb = require("./src/db/db")

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log("Server is running on Port:", PORT);
    });
};

startServer();