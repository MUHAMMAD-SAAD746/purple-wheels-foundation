const blogsModel = require("../model/blogs.model")
const userModel = require("../model/user.model");
const followModel = require("../model/follows.model");
const blogViewModel = require("../model/blogView.model");
const blogLikeModel = require("../model/blogLike.model");
const cloudinary = require("../services/cloudinary.service");


/**
 * - Get /api/blogs/
 * - Get /api/blogs/?tag=ethical clothing
 * - Get /api/blogs/?category=wellness
 * - Get /api/blogs/?category=wellness&tag=healthy habits
 */

async function getAllBlogs(req, res) {
    // const category = req.query.category
    const { category, tag } = req.query;

    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (tag) {
        filter.tags = tag;
    }

    const blogs = await blogsModel
        .find(filter)
        .populate("author", "username profileImage followers following");

    res.status(200).json({
        message: "Blogs Fetched Successfully",
        blogs
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

    const blog = await blogsModel
        .findById(id)
        .populate("author")

    const existingLike = await blogLikeModel.findOne({
        blog: id,
        user: req.user.userId
    });

    const user = await userModel.findById(req.user.userId);
    const isSaved = user.savedPosts.includes(id);

    res.status(200).json({
        message: "Blog fetched Sucessfully",
        blog: blog,
        isLiked: !!existingLike,
        isSaved: isSaved
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

        const allBlogs = await blogsModel.find({
            _id: { $ne: id }
        });

        const currentTags = (blog.tags || []).map(tag =>
            tag.toLowerCase()
        );

        const scoredBlogs = allBlogs.map((relatedBlog) => {
            let score = 0;

            // Same category
            if (relatedBlog.category === blog.category) {
                score += 2;
            }

            // Matching tags
            const relatedTags = (relatedBlog.tags || []).map(tag =>
                tag.toLowerCase()
            );

            const matchingTags = relatedTags.filter(tag =>
                currentTags.includes(tag)
            );

            score += matchingTags.length * 3;

            return {
                blog: relatedBlog,
                score
            };
        });

        // Sort by relevance score
        scoredBlogs.sort((a, b) => b.score - a.score);

        // Get top 6 related posts
        let relatedBlogs = scoredBlogs
            .filter(item => item.score > 0)
            .slice(0, 6)
            .map(item => item.blog);

        // Fallback if fewer than 6 related posts exist
        if (relatedBlogs.length < 6) {
            const existingIds = relatedBlogs.map(blog =>
                blog._id.toString()
            );

            const fallbackBlogs = await blogsModel
                .find({
                    _id: {
                        $ne: id,
                        $nin: existingIds
                    }
                })
                .sort({ createdAt: -1 })
                .limit(6 - relatedBlogs.length);

            relatedBlogs = [
                ...relatedBlogs,
                ...fallbackBlogs
            ];
        }

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




async function getMyAnalytics(req, res) {
    try {
        const userId = req.user.userId;

        const myBlogs = await blogsModel
            .find({ author: userId })
            .select("_id");


        const blogIds = myBlogs.map(blog => blog._id);

        const now = new Date();

        const currentPeriodStart = new Date();
        currentPeriodStart.setDate(now.getDate() - 30);

        const previousPeriodStart = new Date();
        previousPeriodStart.setDate(now.getDate() - 60);

        // views growth calculation
        const currentViews = await blogViewModel.countDocuments({
            blog: { $in: blogIds },
            createdAt: {
                $gte: currentPeriodStart,
                $lte: now
            }
        });

        const previousViews = await blogViewModel.countDocuments({
            blog: { $in: blogIds },
            createdAt: {
                $gte: previousPeriodStart,
                $lt: currentPeriodStart
            }
        });

        let viewsGrowth = null;

        if (previousViews > 0) {
            viewsGrowth =
                ((currentViews - previousViews) / previousViews) * 100;

            viewsGrowth = Number(viewsGrowth.toFixed(1));
        }


        // like growth calculation
        const currentLikes = await blogLikeModel.countDocuments({
            blog: { $in: blogIds },
            createdAt: {
                $gte: currentPeriodStart,
                $lte: now
            }
        });

        const previousLikes = await blogLikeModel.countDocuments({
            blog: { $in: blogIds },
            createdAt: {
                $gte: previousPeriodStart,
                $lt: currentPeriodStart
            }
        });

        let likesGrowth = null;

        if (previousLikes > 0) {
            likesGrowth =
                ((currentLikes - previousLikes) / previousLikes) * 100;

            likesGrowth = Number(likesGrowth.toFixed(1));
        }



        return res.status(200).json({
            currentViews,
            previousViews,
            viewsGrowth,
            currentLikes,
            previousLikes,
            likesGrowth
        });

    } catch (error) {
        console.error("Error fetching analytics:", error);

        return res.status(500).json({
            message: "Failed to fetch analytics"
        });
    }
}




module.exports = {
    getAllBlogs,
    myBlogs,
    createBlog,
    getBlogById,
    relatedBlogs,
    getCreators,
    recordBlogView,
    getMyAnalytics
}