const UserModel = require("../../model/user.model");
const blogsModel = require("../../model/blogs.model");
const { 
    getAdminStats, 
    getMonthlyUserStats,
    getMonthlyBlogStats,
    getMonthlyCommentStats 
} = require("../../services/admin/adminStats.service");

async function getDashboard(req, res) {
    try {
        const [
            stats, 
            recentUsers, 
            recentBlogs, 
            monthlyUser,
            monthlyBlogs,
            monthlyComments
        ] = await Promise.all([

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
                .lean(),

            getMonthlyUserStats(),
            getMonthlyBlogStats(3),
            getMonthlyCommentStats(3)
        ]);

        res.status(200).json({
            success: true,
            ...stats,
            recentUsers,
            recentBlogs,
            monthlyUser,
            monthlyBlogs,
            monthlyComments
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