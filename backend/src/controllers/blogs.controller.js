const blogsModel = require("../model/blogs.model")

async function getAllBlogs (req,res) {
    const category = req.query.category

    if( category ) {
        res.status(200).json({message: "no query params"})
    }
    else {
        const blogs = await blogsModel.find()
        
        res.status(200).json({
            message: "Blogs Fetched Successfully",
            blogs: blogs
        })
    }
}

module.exports = { getAllBlogs }