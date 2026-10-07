const blogLikeModel = require("../model/blogLike.model");
const blogsModel = require("../model/blogs.model");



const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user.userId;

        const existingLike = await blogLikeModel.findOne({
            blog: blogId,
            user: userId
        });

        if (existingLike) {
            return res.status(400).json({
                message: "Blog already liked"
            });
        }

        await blogLikeModel.create({
            blog: blogId,
            user: userId
        });

        await blogsModel.findByIdAndUpdate(blogId, {
            $inc: { likeCount: 1 }
        });

        return res.status(200).json({
            message: "Blog liked"
        });

    } catch (error) {
        console.error("Error liking blog:", error);

        return res.status(500).json({
            message: "Failed to like blog"
        });
    }
};




const unlikeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user.userId;

        const existingLike = await blogLikeModel.findOne({
            blog: blogId,
            user: userId
        });

        if (!existingLike) {
            return res.status(400).json({
                message: "Blog is not liked"
            });
        }

        await blogLikeModel.deleteOne({
            blog: blogId,
            user: userId
        });

        await blogsModel.findByIdAndUpdate(blogId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({
            message: "Blog unliked"
        });

    } catch (error) {
        console.error("Error unliking blog:", error);

        return res.status(500).json({
            message: "Failed to unlike blog"
        });
    }
};




module.exports = {
    likeBlog,
    unlikeBlog
};