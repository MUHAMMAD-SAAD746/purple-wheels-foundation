const blogsModel = require("../model/blogs.model")
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



module.exports = { getAllBlogs, createBlog, getBlogById, relatedBlogs }