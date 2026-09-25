const express = require("express")
const cors = require('cors')
const authRoute = require("./routes/auth.route")
const blogsRoute = require("./routes/blogs.route")
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRoute)
app.use("/api/blogs", blogsRoute)

module.exports = app;