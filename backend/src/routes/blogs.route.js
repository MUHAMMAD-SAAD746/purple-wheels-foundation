const express = require('express')
const router = express.Router()
const blogsController = require("../controllers/blogs.controller")
const authMiddleware = require("../middleware/auth.middleware")


router.get("/", blogsController.getAllBlogs)
router.post("/create-blog", authMiddleware, blogsController.createBlog )

module.exports = router;