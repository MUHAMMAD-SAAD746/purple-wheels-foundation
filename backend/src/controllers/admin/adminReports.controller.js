const UserModel = require("../../model/user.model");
const blogsModel = require("../../model/blogs.model");
const commentsModel = require("../../model/comments.model")
const categoriesModel = require("../../model/category.model");

async function getReports(req, res) {
    try {
        const now = new Date();

        const startOfThisMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

        const startOfLastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        );

        const startOfSevenMonthsAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 6,
            1
        );

        const approvedBlogAuthors = await blogsModel.distinct("author", {
            status: "approved"
        });

        const creatorFilter = {
            role: "user",
            _id: { $in: approvedBlogAuthors }
        };

        const [
            totalUsers,
            usersThisMonth,
            usersLastMonth,
            totalBlogs,
            blogsThisMonth,
            blogsLastMonth,
            totalComments,
            commentsThisMonth,
            commentsLastMonth,
            totalCreators,
            creatorsThisMonth,
            creatorsLastMonth,
        ] = await Promise.all([
            UserModel.countDocuments(),
            UserModel.countDocuments({
                createdAt: {
                    $gte: startOfThisMonth,
                    $lt: startOfNextMonth
                }
            }),
            UserModel.countDocuments({
                createdAt: {
                    $gte: startOfLastMonth,
                    $lt: startOfThisMonth
                }
            }),


            blogsModel.countDocuments(),
            blogsModel.countDocuments({
                createdAt: {
                    $gte: startOfThisMonth,
                    $lt: startOfNextMonth
                }
            }),
            blogsModel.countDocuments({
                createdAt: {
                    $gte: startOfLastMonth,
                    $lt: startOfThisMonth
                }
            }),


            commentsModel.countDocuments(),
            commentsModel.countDocuments({
                createdAt: {
                    $gte: startOfThisMonth,
                    $lt: startOfNextMonth
                }
            }),
            commentsModel.countDocuments({
                createdAt: {
                    $gte: startOfLastMonth,
                    $lt: startOfThisMonth
                }
            }),


            UserModel.countDocuments(creatorFilter),
            UserModel.countDocuments({
                ...creatorFilter,
                createdAt: {
                    $gte: startOfThisMonth,
                    $lt: startOfNextMonth
                }
            }),
            UserModel.countDocuments({
                ...creatorFilter,
                createdAt: {
                    $gte: startOfLastMonth,
                    $lt: startOfThisMonth
                }
            }),
        ]);


        const monthlyUserCounts = await UserModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfSevenMonthsAgo,
                        $lt: startOfNextMonth
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    users: { $sum: 1 }
                }
            }
        ]);


        const monthlyBlogCounts = await blogsModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfSevenMonthsAgo,
                        $lt: startOfNextMonth
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    blogs: { $sum: 1 }
                }
            }
        ]);


        const monthlyCommentCounts = await commentsModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfSevenMonthsAgo,
                        $lt: startOfNextMonth
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    comments: { $sum: 1 }
                }
            }
        ]);


        const monthlyUsers = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(
                now.getFullYear(),
                now.getMonth() - 6 + i,
                1
            );

            const year = date.getFullYear();
            const monthNumber = date.getMonth() + 1;

            const monthData = monthlyUserCounts.find(
                (item) =>
                    item._id.year === year &&
                    item._id.month === monthNumber
            );

            monthlyUsers.push({
                month: date.toLocaleString("en-US", {
                    month: "short"
                }),
                year,
                users: monthData?.users ?? 0
            });
        }


        const monthlyBlogs = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(
                now.getFullYear(),
                now.getMonth() - 6 + i,
                1
            );

            const year = date.getFullYear();
            const monthNumber = date.getMonth() + 1;

            const monthData = monthlyBlogCounts.find(
                (item) =>
                    item._id.year === year &&
                    item._id.month === monthNumber
            );

            monthlyBlogs.push({
                month: date.toLocaleString("en-US", {
                    month: "short"
                }),
                year,
                blogs: monthData?.blogs ?? 0
            });
        }


        const monthlyComments = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(
                now.getFullYear(),
                now.getMonth() - 6 + i,
                1
            );

            const year = date.getFullYear();
            const monthNumber = date.getMonth() + 1;

            const monthData = monthlyCommentCounts.find(
                (item) =>
                    item._id.year === year &&
                    item._id.month === monthNumber
            );

            monthlyComments.push({
                month: date.toLocaleString("en-US", {
                    month: "short"
                }),
                year,
                comments: monthData?.comments ?? 0
            });
        }


        const userGrowth = usersLastMonth === 0
            ? null
            : Number(
                (
                    ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100
                ).toFixed(1)
            );


        const blogsGrowth = blogsLastMonth === 0
            ? null
            : Number(
                (
                    ((blogsThisMonth - blogsLastMonth) / blogsLastMonth) * 100
                ).toFixed(1)
            );


        const commentsGrowth = commentsLastMonth === 0
            ? null
            : Number(
                (
                    ((commentsThisMonth - commentsLastMonth) / commentsLastMonth) * 100
                ).toFixed(1)
            );


        const creatorsGrowth = creatorsLastMonth === 0
            ? null
            : Number(
                (
                    ((creatorsThisMonth - creatorsLastMonth) / creatorsLastMonth) * 100
                ).toFixed(1)
            );



        const [categoryCounts, allCategories] = await Promise.all([
            blogsModel.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 }
                    }
                }
            ]),
            categoriesModel.find({}).select("name").lean()
        ]);

        const totalCategoryBlogs = categoryCounts.reduce(
            (total, category) => total + category.count,
            0
        );

        const categoryData = allCategories.map((category) => {
            const categoryCount = categoryCounts.find(
                (item) => item._id === category.name
            );

            const count = categoryCount?.count ?? 0;

            return {
                name: category.name,
                count,
                percentage: totalCategoryBlogs > 0
                    ? Number(((count / totalCategoryBlogs) * 100).toFixed(1))
                    : 0
            };
        });



        res.status(200).json({
            success: true,
            totalUsers,
            userGrowth,
            usersThisMonth,
            usersLastMonth,
            totalBlogs,
            blogsGrowth,
            blogsThisMonth,
            blogsLastMonth,
            totalComments,
            commentsGrowth,
            commentsThisMonth,
            commentsLastMonth,
            totalCreators,
            creatorsGrowth,
            creatorsThisMonth,
            creatorsLastMonth,
            monthlyUsers,
            monthlyBlogs,
            monthlyComments,
            categoryData
        });
    } catch (error) {
        console.error("Failed to fetch reports:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch reports"
        });
    }
}

module.exports = {
    getReports
};