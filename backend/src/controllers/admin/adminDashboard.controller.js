const { getAdminStats } = require("../../services/admin/adminStats.service");

async function getDashboard(req, res) {
    try {
        const stats = await getAdminStats();

        res.status(200).json({
            success: true,
            ...stats
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