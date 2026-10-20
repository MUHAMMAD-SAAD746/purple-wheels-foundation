const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const followsController = require('../controllers/follow.controller')

router.post("/:userId", authMiddleware, followsController.followUser)
router.delete("/:userId", authMiddleware, followsController.unfollowUser)
router.get("/:userId", authMiddleware, followsController.getFollowStatus);

module.exports = router;