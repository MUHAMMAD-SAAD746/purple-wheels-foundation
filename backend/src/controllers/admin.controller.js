const mongoose = require("mongoose");
const userModel = require("../model/user.model");

// GET /api/admin/users
async function getUsers(req, res) {
    try {
        const {
            search = "",
            role = "all",
            status = "all",
            page = 1,
            limit = 8
        } = req.query;

        const currentPage = Math.max(1, parseInt(page, 10) || 1);
        const pageSize = Math.min(
            100,
            Math.max(1, parseInt(limit, 10) || 8)
        );

        if (!["all", "user", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role filter"
            });
        }

        if (!["all", "active", "inactive"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status filter"
            });
        }

        const conditions = [];

        if (search.trim()) {
            const escapedSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            conditions.push({
                $or: [
                    { username: { $regex: escapedSearch, $options: "i" } },
                    { email: { $regex: escapedSearch, $options: "i" } }
                ]
            });
        }

        if (role !== "all") {
            conditions.push({ role });
        }

        if (status !== "all") {
            conditions.push({ status });
        }

        const   filter = conditions.length
            ? { $and: conditions }
            : {};

        const [users, totalUsers] = await Promise.all([
            userModel.find(filter)
                .select("-password")
                .sort({ createdAt: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .lean(),

            userModel.countDocuments(filter)
        ]);

        const formattedUsers = users.map((user) => ({
            ...user,
            id: user._id.toString(),
            avatar: user.profileImage,
            status: user.status || "active",
            joined: user.createdAt
        }));

        return res.status(200).json({
            message: "Users fetched successfully",
            users: formattedUsers,
            pagination: {
                currentPage,
                pageSize,
                totalUsers,
                totalPages: Math.ceil(totalUsers / pageSize)
            }
        });
    } catch (error) {
        console.error("Get users error:", error);

        return res.status(500).json({
            message: "Failed to fetch users"
        });
    }
}





// GET /api/admin/users/:id
async function getUserById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await userModel.findById(req.params.id)
            .select("-password")
            .lean();

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                ...user,
                id: user._id.toString(),
                avatar: user.profileImage,
                status: user.status || "active",
                joined: user.createdAt
            }
        });
    } catch (error) {
        console.error("Get user error:", error);

        return res.status(500).json({
            message: "Failed to fetch user"
        });
    }
}






// PATCH /api/admin/users/:id/status
async function updateUserStatus(req, res) {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                message: "Status must be active or inactive"
            });
        }

        if (id === req.user.userId && status === "inactive") {
            return res.status(400).json({
                message: "You cannot deactivate your own account"
            });
        }

        const user = await userModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: `User ${status === "active" ? "activated" : "deactivated"} successfully`,
            user: {
                ...user.toObject(),
                id: user._id.toString(),
                avatar: user.profileImage,
                joined: user.createdAt
            }
        });
    } catch (error) {
        console.error("Update user status error:", error);

        return res.status(500).json({
            message: "Failed to update user status"
        });
    }
}





// DELETE /api/admin/users/:id
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (id === req.user.userId) {
            return res.status(400).json({
                message: "You cannot delete your own account"
            });
        }

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error);

        return res.status(500).json({
            message: "Failed to delete user"
        });
    }
}



module.exports = {
    getUsers,
    getUserById,
    updateUserStatus,
    deleteUser
};