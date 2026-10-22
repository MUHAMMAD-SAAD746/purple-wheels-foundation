const blogsModel = require("../model/blogs.model")
const userModel = require("../model/user.model");
const followModel = require("../model/follows.model");
const blogViewModel = require("../model/blogView.model");
const blogLikeModel = require("../model/blogLike.model");
const commentsModel = require("../model/comments.model");
const cloudinary = require("../services/cloudinary.service");


/**
 * - GET /api/blogs/
 * (Retrieves all blog posts.)
 * - GET /api/blogs/?tag=ethical clothing
 * (Retrieves blog posts filtered by the specified tag.)
 * - GET /api/blogs/?category=wellness
 * (Retrieves blog posts filtered by the specified category.)
 * - GET /api/blogs/?category=wellness&tag=healthy habits
 * (Retrieves blog posts matching both the specified category and tag.)
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


/**
 * - GET /api/blogs/trending
 * (Retrieves 50 trending blog based on points higest to lowest.)
 * - points calculated by (2(likes)+views)/(age in hour +24)
 * - GET /api/blogs/trending?tag=ethical clothing
 * - GET /api/blogs/trending?category=wellness
 * - GET /api/blogs/trending?category=wellness&tag=healthy habits
 * (Retrieves blog posts filtered by the specified tag or category or both.)
 */

async function getTrendingBlogs(req, res) {
    try {
        const { category, tag } = req.query;

        const filter = {};

        if (category) filter.category = category;
        if (tag) filter.tags = tag;

        const now = new Date();
        const thirtyDaysAgo = new Date(now);

        thirtyDaysAgo.setDate(now.getDate() - 30);

        // First, find blogs from the last 30 days
        let blogs = await blogsModel.find({
            ...filter,
            createdAt: { $gte: thirtyDaysAgo }
        }).populate("author", "username profileImage");

        // If none exist, search all dates
        if (blogs.length === 0) {
            blogs = await blogsModel.find(filter)
                .populate("author", "username profileImage");
        }

        // Calculate trending score
        blogs = blogs.map(blog => {
            const ageInHours = Math.max(
                0,
                (now - new Date(blog.createdAt)) / (1000 * 60 * 60)
            );

            const trendingScore =
                ((blog.likeCount || 0) * 2 + (blog.viewCount || 0)) /
                (ageInHours + 24);

            return {
                ...blog.toObject(),
                trendingScore
            };
        });

        // Highest trending score first
        blogs.sort((a, b) => b.trendingScore - a.trendingScore);

        return res.status(200).json({
            message: "Trending blogs fetched successfully",
            blogs: blogs.slice(0, 50)
        });

    } catch (error) {
        console.error("Error fetching trending blogs:", error);

        return res.status(500).json({
            message: "Failed to fetch trending blogs"
        });
    }
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
        subtitle,
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
            subtitle,
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




async function updateBlog(req, res) {
    const { id } = req.params;

    const {
        title,
        subtitle,
        description,
        category,
        tags
    } = req.body;

    try {
        const blog = await blogsModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }


        // Verify blog ownership
        if (blog.author.toString() !== req.user?.userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this blog"
            });
        }

        // Update only the fields provided
        if (title !== undefined) {
            blog.title = title;
        }

        if (subtitle !== undefined) {
            blog.subtitle = subtitle;
        }

        if (description !== undefined) {
            blog.description = description;
        }

        if (category !== undefined) {
            blog.category = category;
        }

        if (tags !== undefined) {
            blog.tags = tags
                ? tags.split(",")
                    .map(tag => tag.trim().toLowerCase())
                    .filter(Boolean)
                : [];
        }

        // Replace the image only when a new image is uploaded
        if (req.file) {
            blog.image = req.file.path;
        }

        await blog.save();

        return res.status(200).json({
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        console.error("Update blog error:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid blog ID"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: "Failed to update blog",
            error: error.message
        });
    }
}



/**
 * - DELETE /api/blogs/:id
 * - Deletes a blog post by its ID if the authenticated user is its author.
 * - Returns 404 if the blog does not exist and 403 if the user is not authorized.
 */

async function deleteBlog(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const blog = await blogsModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        // Ensure the logged-in user owns this blog
        if (blog.author.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this blog"
            });
        }

        await blogsModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Blog deleted successfully",
            blogId: id
        });

    } catch (error) {
        console.error("Delete blog error:", error);

        // Handle invalid MongoDB ObjectIds
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid blog ID"
            });
        }

        return res.status(500).json({
            message: "Failed to delete blog"
        });
    }
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

        const totalComments = await commentsModel.countDocuments({
            blog: { $in: blogIds }
        });

        const now = new Date();

        const currentPeriodStart = new Date();
        currentPeriodStart.setDate(now.getDate() - 30);

        const previousPeriodStart = new Date();
        previousPeriodStart.setDate(now.getDate() - 60);


        // comments growth calculation 
        const currentPeriodComments = await commentsModel.countDocuments({
            blog: { $in: blogIds },
            createdAt: {
                $gte: currentPeriodStart,
                $lte: now
            }
        });

        const previousPeriodComments = await commentsModel.countDocuments({
            blog: { $in: blogIds },
            createdAt: {
                $gte: previousPeriodStart,
                $lt: currentPeriodStart
            }
        });

        let commentsGrowth = null;

        if (previousPeriodComments > 0) {
            commentsGrowth = Number(
                (
                    ((currentPeriodComments - previousPeriodComments) /
                        previousPeriodComments) * 100
                ).toFixed(1)
            );
        }


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
            likesGrowth,
            totalComments,
            currentPeriodComments,
            previousPeriodComments,
            commentsGrowth
        });

    } catch (error) {
        console.error("Error fetching analytics:", error);

        return res.status(500).json({
            message: "Failed to fetch analytics"
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





async function topCreators(req, res) {
    try {
        const creators = await userModel
            .find({ postCount: { $gt: 0 } })
            .select("username profileImage postCount followers following")
            .sort({ followers: -1, postCount: -1 })
            .limit(5);

        const creatorsWithFollowStatus = await Promise.all(
            creators.map(async (creator) => {
                const follow = await followModel.findOne({
                    follower: req.user.userId,
                    following: creator._id
                });

                return {
                    ...creator.toObject(),
                    isFollowing: !!follow
                };
            })
        );

        res.status(200).json({
            creators: creatorsWithFollowStatus
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to fetch top creators"
        });
    }
}




module.exports = {
    getAllBlogs,
    getBlogById,
    getTrendingBlogs,
    myBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    relatedBlogs,
    recordBlogView,
    getMyAnalytics,
    getCreators,
    topCreators
}