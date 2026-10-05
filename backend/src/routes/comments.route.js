const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const commentsController = require("../controllers/comments.controller")

router.post("/", authMiddleware, commentsController.createComment );
router.post("/:commentId/reply", authMiddleware, commentsController.replyToComment );
router.get("/:blogId", commentsController.getComments )

module.exports = router;