const express = require('express')
const router = express.Router()
const blogsController = require("../controllers/blogs.controller")
const blogLikeController = require("../controllers/blogLikes.controller")
const blogSaveController = require("../controllers/blogSave.controller")
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/upload");


router.get("/", blogsController.getAllBlogs)
router.get("/my-blogs", authMiddleware, blogsController.myBlogs)
router.post("/create-blog", authMiddleware, upload.single("image"), blogsController.createBlog )
router.get("/creators", authMiddleware, blogsController.getCreators)
router.get("/analytics", authMiddleware, blogsController.getMyAnalytics)
router.get("/:id/related", authMiddleware, blogsController.relatedBlogs)
router.post("/:id/view", authMiddleware, blogsController.recordBlogView)
router.post("/:blogId/like", authMiddleware, blogLikeController.likeBlog)
router.delete("/:blogId/like", authMiddleware, blogLikeController.unlikeBlog)
router.post("/:blogId/save", authMiddleware, blogSaveController.saveBlog)
router.delete("/:blogId/save", authMiddleware, blogSaveController.unsaveBlog)
router.get("/saved", authMiddleware, blogSaveController.getAllSavedBlogs)
router.get("/:id", authMiddleware, blogsController.getBlogById)

module.exports = router;