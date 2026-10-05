const mongoose = require("mongoose");
const commentsModel = require("../model/comments.model");

async function createComment(req, res) {
    try {
        const { blogId, text } = req.body;
        const userId = req.user.userId;

        const comment = await commentsModel.create({
            blog: blogId,
            author: userId,
            text
        });

        return res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function getComments(req, res) {
    try {
        const { blogId } = req.params;

        const comments = await commentsModel.find({
            blog: blogId
        }).populate("author", "username profileImage");

        return res.status(200).json({
            comments
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}



async function replyToComment(req, res) {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }


        const parentComment = await commentsModel.findById(commentId);

        if (!parentComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }


        const reply = await commentsModel.create({
            blog: parentComment.blog,
            author: userId,
            text: text,
            parentComment: commentId
        });

        return res.status(201).json({
            message: "Reply added successfully",
            reply
        });

        console.log(commentId)
        console.log(text)
        console.log(userId)

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}



module.exports = {
    createComment,
    getComments,
    replyToComment
};