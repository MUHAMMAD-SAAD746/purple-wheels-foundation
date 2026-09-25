const blogsModel = require("../model/blogs.model")

async function getAllBlogs (req,res) {
    const category = req.query.category

    if( category ) {
        const blogs = await blogsModel.find({
            category
        })
        
        res.status(200).json({
            message: category + ` blogs fetched Sucessfully`,
            blogs: blogs
        })
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