const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/forgot-password", authController.forgotPassword)
router.post("/verify-reset-code", authController.verifyResetCode)
router.post("/update-password", authController.updatePassword)
router.post("/logout", authController.logoutUser)
router.get("/me", authMiddleware, authController.userProfile)

module.exports = router;