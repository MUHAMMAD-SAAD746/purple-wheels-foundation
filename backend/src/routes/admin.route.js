const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const adminUserController = require("../controllers/admin/adminUser.controller");
const adminBlogController = require("../controllers/admin/adminBlog.controller");
const adminCommentsController = require("../controllers/admin/adminComments.controller");

router.use(authMiddleware, adminMiddleware);

router.get("/users", adminUserController.getUsers);
router.get("/users/:id", adminUserController.getUserById);
router.patch("/users/:id/status", adminUserController.updateUserStatus);
router.delete("/users/:id", adminUserController.deleteUser);


// Blog management
router.get("/blogs", adminBlogController.getBlogs);
router.get("/blogs/:id", adminBlogController.getBlogById);
router.patch("/blogs/:id/status", adminBlogController.updateBlogStatus);
router.delete("/blogs/:id", adminBlogController.deleteBlog);

// Fetch Creators
router.get("/creators", adminUserController.getCreators);


// Comment management
router.get("/comments", adminCommentsController.getAllComments);
router.patch("/comments/:id/status", adminCommentsController.updateCommentStatus);
router.delete("/comments/:id", adminCommentsController.deleteComment);


module.exports = router;