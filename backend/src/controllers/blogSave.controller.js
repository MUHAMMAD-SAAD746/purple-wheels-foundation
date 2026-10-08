const userModel = require("../model/user.model")

async function saveBlog(req, res) {
    try {
        const { blogId } = req.params;
        const userId = req.user.userId;

        await userModel.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    savedPosts: blogId
                }
            }
        );

        res.status(200).json({
            message: "Blog saved successfully"
        });

    } catch (error) {
        console.error("Error saving blog:", error);

        res.status(500).json({
            message: "Failed to save blog"
        });
    }
}



async function unsaveBlog(req, res) {
    try {
        const { blogId } = req.params;
        const userId = req.user.userId;

        await userModel.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    savedPosts: blogId
                }
            }
        );

        res.status(200).json({
            message: "Blog unsaved successfully"
        });

    } catch (error) {
        console.error("Error unsaving blog:", error);

        res.status(500).json({
            message: "Failed to unsave blog"
        });
    }
}





async function getAllSavedBlogs(req, res) {
    try {
        const userId = req.user.userId;

        const user = await userModel
            .findById(userId)
            .populate({
                path: "savedPosts",
                populate: {
                    path: "author",
                    select: "username profileImage"
                }
            });

        res.status(200).json({
            savedPosts: user.savedPosts
        });

    } catch (error) {
        console.error("Error fetching saved blogs:", error);

        res.status(500).json({
            message: "Failed to fetch saved blogs"
        });
    }
}




module.exports = {
    saveBlog,
    unsaveBlog,
    getAllSavedBlogs
}