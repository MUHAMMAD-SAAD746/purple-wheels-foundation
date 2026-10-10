const express = require("express")
const cors = require('cors')
const authRoute = require("./routes/auth.route")
const blogsRoute = require("./routes/blogs.route")
const commentRoute = require("./routes/comments.route")
const followsRoute = require("./routes/follows.route")
const connectDb = require("./db/db");
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
}));



// Bulletproof Serverless Safety Net: Ensure DB connection is active before routes hit
app.use(async (req, res, next) => {
    try {
        await connectDb();// Safe, fast, and eliminates race conditions/timeouts
        next();
    } catch (err) {
        console.error("Critical: Route blocked due to DB failure:", err.message);
        res.status(500).json({ error: "Database unavailable" });
    }
});


app.use("/api/auth", authRoute)
app.use("/api/blogs", blogsRoute)
app.use("/api/blogs/comments", commentRoute)
app.use("/api/follows", followsRoute)

module.exports = app;