
const mongoose = require("mongoose");
const commentsModel = require("../../model/comments.model");
const blogsModel = require("../../model/blogs.model");


// GET /api/admin/comments
async function getAllComments(req, res) {
    try {
        const {
            search = "",
            status = "all",
            page = 1,
            limit = 8
        } = req.query;

        const currentPage = Math.max(1, Number(page) || 1);
        const pageSize = Math.max(1, Number(limit) || 8);

        const filter = {};

        // Status filtering
        if (["pending", "approved", "rejected"].includes(status)) {
            filter.status = status;
        }

        // Search filtering
        if (search.trim()) {
            const searchRegex = new RegExp(
                search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i"
            );

            const User = mongoose.model("users");

            const matchingUsers = await User.find({
                username: searchRegex
            }).select("_id");

            const matchingBlogs = await blogsModel.find({
                title: searchRegex
            }).select("_id");

            filter.$or = [
                { text: searchRegex },
                {
                    author: {
                        $in: matchingUsers.map(user => user._id)
                    }
                },
                {
                    blog: {
                        $in: matchingBlogs.map(blog => blog._id)
                    }
                }
            ];
        }

        const totalComments = await commentsModel.countDocuments(filter);

        const comments = await commentsModel
            .find(filter)
            .populate("author", "username profileImage")
            .populate("blog", "title")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        return res.status(200).json({
            comments,
            totalComments,
            currentPage,
            totalPages: Math.ceil(totalComments / pageSize)
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}


// PATCH /api/admin/comments/:id/status
async function updateCommentStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid comment status"
            });
        }

        const comment = await commentsModel.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        return res.status(200).json({
            message: "Comment status updated successfully",
            comment
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}


// DELETE /api/admin/comments/:id
async function deleteComment(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        const comment = await commentsModel.findById(id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Delete replies first
        await commentsModel.deleteMany({
            parentComment: comment._id
        });

        await commentsModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = {
    getAllComments,
    updateCommentStatus,
    deleteComment
};
