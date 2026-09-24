const userModel = require("../model/user.model")
const passwordResetModel = require("../model/passwordReset.model.js")
const emailService = require("../services/email.service.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require("crypto");

/**
 * - POST /api/auth/register
 */

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const userExist = await userModel.findOne({
        email
    })

    if (userExist) {
        return res.status(409).json({
            message: "Email already exist",
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    })

    res.status(201).json({
        message: "User registered successfully",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * - POST /api/auth/login
 */

async function loginUser(req, res) {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }

    if (user.role !== role) {
        return res.status(403).json({
            message: "Invalid login"
        })
    }

    const token = await jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    })

    res.status(200).json({
        message: "LogIn Successful",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * - POST /api/auth/me
 */

async function userProfile(req, res) {
    const userId = req.user.userId

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User Fetched Sucessfully",
        user,
    })
}



/**
 * - OTP sending controller
 * - POST /api/auth/forgot-password
 */

async function forgotPassword(req, res) {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const otp = crypto.randomInt(100000, 1000000);

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const passwordReset = await passwordResetModel.findOneAndUpdate(
            { email: user.email },
            {
                code: otp,
                expiresAt: expiresAt,
                verified: false
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
        );

        await emailService.sendotpEmail(user.email, otp)

        res.status(200).json({
            message: "Verification code sent to your email"
        });
    }
    catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Something went wrong. Please try again later."
        });
    }
}



/**
 * - verify otp and return a reset token in coookie
 * - POST /api/auth/verify-reset-code
 */

async function verifyResetCode(req, res) {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and verification code are required"
            })
        }

        const passwordReset = await passwordResetModel.findOne({ email })

        if (!passwordReset) {
            return res.status(404).json({ message: "No password reset request found" })
        }

        const expired = new Date(Date.now()) > passwordReset.expiresAt

        if (expired) {
            return res.status(400).json({ message: "Verification code has expired" })
        }

        const verified = otp === passwordReset.code

        if (!verified) {
            return res.status(400).json({ message: "Invalid verification code" })
        }

        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await passwordResetModel.findOneAndUpdate(
            {
                email: passwordReset.email,
            },
            {
                verified: true
            }
        )


        const resetToken = jwt.sign(
            {
                userId: user._id,
                purpose: "password-reset"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m"
            }
        );

        res.cookie("resetToken", resetToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 10 * 60 * 1000
        })

        return res.status(200).json({
            message: "Verification code verified successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong, please try again"
        })
    }
}



/**
 * - Password update controller
 * - required password & resetToken in cookies
 * - POST /api/auth/update-password
 */

async function updatePassword(req, res) {
    try {
        const { password } = req.body;
        const { resetToken } = req.cookies;

        if (!password || !resetToken) {
            return res.status(400).json({
                message: "Password and reset token are required"
            })
        }

        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET)

        if (decoded.purpose !== "password-reset") {
            return res.status(403).json({
                message: "Invalid reset token"
            });
        }

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const passwordResetRecord = await passwordResetModel.findOne({
            email: user.email
        })

        if (!passwordResetRecord) {
            return res.status(400).json({
                message: "No password reset request found"
            })
        }

        const verified = passwordResetRecord.verified;

        if (!verified) {
            return res.status(400).json({
                message: "Please verify the OTP sent to your email"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const hash = await bcrypt.hash(password, 10)

        await userModel.findOneAndUpdate(
            { _id: user._id },
            { password: hash },
            { returnDocument: 'after', }
        )


        await passwordResetModel.findOneAndDelete({
            email: user.email
        })

        res.clearCookie("resetToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });

        res.status(200).json({
            message: "Password updated successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.username
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "something went wrong please try again."
        })
    }
}



module.exports = {
    registerUser,
    loginUser,
    userProfile,
    forgotPassword,
    verifyResetCode,
    updatePassword
}