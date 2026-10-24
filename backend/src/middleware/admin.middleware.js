const userModel = require("../model/user.model");

async function adminMiddleware(req, res, next) {
    try {
        const user = await userModel.findById(req.user.userId)
            .select("role");

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Failed to verify admin access"
        });
    }
}

module.exports = adminMiddleware;