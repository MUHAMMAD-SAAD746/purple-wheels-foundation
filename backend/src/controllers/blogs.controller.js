const blogsModel = require("../model/blogs.model")
const userModel = require("../model/user.model");
const followModel = require("../model/follows.model");
const blogViewModel = require("../model/blogView.model");
const multer = require("multer");
const cloudinary = require("../services/cloudinary.service");

async function getAllBlogs(req, res) {
    const category = req.query.category

    if (category) {
        const blogs = await blogsModel
            .find({ category })
            .populate("author", "username profileImage");

        res.status(200).json({
            message: category + ` blogs fetched Sucessfully`,
            blogs: blogs
        })
    }

    const blogs = await blogsModel
        .find()
        .populate("author", "username profileImage");

    res.status(200).json({
        message: "Blogs Fetched Successfully",
        blogs: blogs
    })
}



const myBlogs = async (req, res) => {
    try {
        const blogs = await blogsModel.find({
            author: req.user.userId
        })
            .populate("author", "username profileImage")
            .sort({ createdAt: -1 });

        res.status(200).json({
            blogs
        });

    } catch (error) {
        console.error("Error fetching my blogs:", error);

        res.status(500).json({
            message: "Failed to fetch your blogs"
        });
    }
};



async function createBlog(req, res) {

    const {
        title,
        description,
        category,
        date,
        tags
    } = req.body;

    const image = req.file;

    if (!title || !description || !image || !category || !date) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const result = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "blogs",
                    resource_type: "auto"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );

            stream.end(image.buffer);
        });

        const blog = await blogsModel.create({
            title,
            description,
            image: result.secure_url,
            category,
            date,
            tags: tags
                ? tags.split(",").map(tag => tag.trim().toLowerCase()).filter(Boolean)
                : [],
            author: req.user.userId
        });

        await userModel.findByIdAndUpdate(
            req.user.userId,
            { $inc: { postCount: 1 } }
        );

        return res.status(201).json({
            message: "Blog created successfully",
            blog
        });

    } catch (error) {

        console.error("Cloudinary upload error:", error);

        return res.status(500).json({
            message: "Failed to upload image"
        });
    }
}



async function getBlogById(req, res) {
    const { id } = req.params;

    const blog = await blogsModel.findById(id).populate("author")

    res.status(200).json({
        message: "Blog fetched Sucessfully",
        blog: blog
    })
}



async function relatedBlogs(req, res) {
    const { id } = req.params;

    try {
        const blog = await blogsModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const relatedBlogs = await blogsModel.find({
            category: blog.category,
            _id: { $ne: id }
        });

        return res.status(200).json({
            relatedBlogs
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}




async function getCreators(req, res) {

    try {

        const currentUserId = req.user.userId;

        // Find all users followed by the current user
        const followingUsers = await followModel.find({
            follower: currentUserId
        }).select("following");

        // Create an array of followed user IDs
        const followingIds = followingUsers.map(
            follow => follow.following.toString()
        );

        const creators = await userModel
            .find({ postCount: { $gt: 0 } })
            .select("username profileImage postCount followers following");

        const creatorsWithFollowStatus = creators.map(creator => ({
            ...creator.toObject(),
            isFollowing: followingIds.includes(creator._id.toString())
        }));

        return res.status(200).json({
            creators: creatorsWithFollowStatus
        });

    } catch (error) {

        console.error("Error fetching creators:", error);

        return res.status(500).json({
            message: "Failed to fetch creators"
        });
    }
}




const recordBlogView = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const existingView = await blogViewModel.findOne({
            blog: id,
            user: userId
        });

        if (existingView) {
            return res.status(200).json({
                message: "Blog already viewed"
            });
        }

        await blogViewModel.create({
            blog: id,
            user: userId
        });

        await blogsModel.findByIdAndUpdate(id, {
            $inc: { viewCount: 1 }
        });

        res.status(200).json({
            message: "Blog view recorded"
        });

    } catch (error) {
        console.error("Error recording blog view:", error);

        res.status(500).json({
            message: "Failed to record blog view"
        });
    }
};


module.exports = { getAllBlogs, myBlogs, createBlog, getBlogById, relatedBlogs, getCreators, recordBlogView }