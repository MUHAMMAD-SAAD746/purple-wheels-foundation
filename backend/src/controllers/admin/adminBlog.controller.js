
const mongoose = require("mongoose");
const userModel = require('../../model/user.model')
const blogsModel = require("../../model/blogs.model");
const commentsModel = require("../../model/comments.model");
const blogLikeModel = require("../../model/blogLike.model");
const blogViewModel = require("../../model/blogView.model");




// GET /api/admin/blogs
async function getBlogs(req, res) {
    try {
        const {
            search = "",
            category = "all",
            status = "all",
            page = 1,
            limit = 8
        } = req.query;

        const currentPage = Math.max(1, parseInt(page, 10) || 1);
        const pageSize = Math.min(
            100,
            Math.max(1, parseInt(limit, 10) || 8)
        );

        const validCategories = [
            "wellness",
            "fashion",
            "travel",
            "motivation",
            "food"
        ];

        if (category !== "all" && !validCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid category filter"
            });
        }

        if (!["all", "pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status filter"
            });
        }

        const filter = {};

        if (search.trim()) {
            const escapedSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            const matchingUsers = await userModel
                .find({
                    username: {
                        $regex: escapedSearch,
                        $options: "i"
                    }
                })
                .select("_id")
                .lean();

            filter.$or = [
                {
                    title: {
                        $regex: escapedSearch,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $in: matchingUsers.map(user => user._id)
                    }
                }
            ];
        }

        if (category !== "all") {
            filter.category = category;
        }

        if (status !== "all") {
            filter.status = status;
        }

        const [blogs, totalBlogs] = await Promise.all([
            blogsModel.find(filter)
                .populate("author", "username profileImage")
                .sort({ createdAt: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .lean(),

            blogsModel.countDocuments(filter)
        ]);

        const formattedBlogs = await Promise.all(
            blogs.map(async blog => {
                const [likes, comments] = await Promise.all([
                    blogLikeModel.countDocuments({ blog: blog._id }),
                    commentsModel.countDocuments({ blog: blog._id })
                ]);

                return {
                    id: blog._id.toString(),
                    title: blog.title,
                    author: blog.author?.username || "Unknown",
                    category: blog.category,
                    views: blog.viewCount || 0,
                    likes,
                    comments,
                    status: blog.status ?? null,
                    created: blog.createdAt,
                    image: blog.image,
                    subtitle: blog.subtitle || "",
                    description: blog.description,
                    tags: blog.tags || []
                };
            })
        );

        return res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: formattedBlogs,
            pagination: {
                currentPage,
                pageSize,
                totalBlogs,
                totalPages: Math.ceil(totalBlogs / pageSize)
            }
        });
    } catch (error) {
        console.error("Get admin blogs error:", error);

        return res.status(500).json({
            message: "Failed to fetch blogs"
        });
    }
}




// GET /api/admin/blogs/:id
async function getBlogById(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid blog ID"
            });
        }

        const blog = await blogsModel.findById(id)
            .populate("author", "username profileImage")
            .lean();

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const [likes, comments] = await Promise.all([
            blogLikeModel.countDocuments({ blog: id }),
            commentsModel.countDocuments({ blog: id })
        ]);

        return res.status(200).json({
            blog: {
                id: blog._id.toString(),
                title: blog.title,
                author: blog.author?.username || "Unknown",
                category: blog.category,
                views: blog.viewCount || 0,
                likes,
                comments,
                status: blog.status || "approved",
                created: blog.createdAt,
                image: blog.image,
                subtitle: blog.subtitle || "",
                description: blog.description,
                tags: blog.tags || []
            }
        });
    } catch (error) {
        console.error("Get admin blog error:", error);

        return res.status(500).json({
            message: "Failed to fetch blog"
        });
    }
}





// PATCH /api/admin/blogs/:id/status
async function updateBlogStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid blog ID"
            });
        }

        if (!["approved", "rejected", "pending"].includes(status)) {
            return res.status(400).json({
                message: "Invalid blog status"
            });
        }

        const blog = await blogsModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            message: `Blog ${status} successfully`,
            blog: {
                id: blog._id.toString(),
                status: blog.status
            }
        });
    } catch (error) {
        console.error("Update blog status error:", error);

        return res.status(500).json({
            message: "Failed to update blog status"
        });
    }
}





// DELETE /api/admin/blogs/:id
async function deleteBlog(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid blog ID"
            });
        }

        const blog = await blogsModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        await Promise.all([
            blogsModel.deleteOne({ _id: id }),
            blogLikeModel.deleteMany({ blog: id }),
            blogViewModel.deleteMany({ blog: id }),
            commentsModel.deleteMany({ blog: id })
        ]);

        return res.status(200).json({
            message: "Blog deleted successfully",
            id
        });
    } catch (error) {
        console.error("Delete admin blog error:", error);

        return res.status(500).json({
            message: "Failed to delete blog"
        });
    }
}




module.exports = {
    getBlogs,
    getBlogById,
    updateBlogStatus,
    deleteBlog
};
