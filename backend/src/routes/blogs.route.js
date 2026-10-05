const express = require('express')
const router = express.Router()
const blogsController = require("../controllers/blogs.controller")
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/upload");


router.get("/", blogsController.getAllBlogs)
router.post("/create-blog", authMiddleware, upload.single("image"), blogsController.createBlog )
router.get("/:id/related", authMiddleware, blogsController.relatedBlogs)
router.get("/:id", authMiddleware, blogsController.getBlogById)

module.exports = router;