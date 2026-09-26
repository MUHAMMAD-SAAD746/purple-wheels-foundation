const blogsModel = require("../model/blogs.model")

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
        image,
        category,
        date
    } = req.body;

    if (!title || !description || !image || !category || !date) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const blog = await blogsModel.create({
        title,
        description,
        image,
        category,
        date,
        author: req.user.userId
    });

    return res.status(201).json({
        message: "Blog created successfully",
        blog
    });
}



module.exports = { getAllBlogs, createBlog }