const UserModel = require("../../model/user.model");
const blogsModel = require("../../model/blogs.model");
const { getAdminStats } = require("../../services/admin/adminStats.service");

async function getDashboard(req, res) {
    try {
        const [stats, recentUsers, recentBlogs] = await Promise.all([
            getAdminStats(),

            UserModel.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("username email role status createdAt profileImage")
                .lean(),

            blogsModel.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("title author category status createdAt")
                .populate("author", "username")
                .lean()
        ]);

        res.status(200).json({
            success: true,
            ...stats,
            recentUsers,
            recentBlogs
        });

    } catch (error) {
        console.error("Failed to fetch dashboard:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard"
        });
    }
}

module.exports = {
    getDashboard
};