
const UserModel = require("../../model/user.model");
const blogsModel = require("../../model/blogs.model");
const commentsModel = require("../../model/comments.model");

function calculateGrowth(current, previous) {
    if (previous === 0) return null;

    return Number(
        (((current - previous) / previous) * 100).toFixed(1)
    );
}

async function getEntityStats(model, filter, startOfThisMonth, startOfNextMonth, startOfLastMonth) {
    const [
        total,
        thisMonth,
        lastMonth,
    ] = await Promise.all([
        model.countDocuments(filter),
        model.countDocuments({
            ...filter,
            createdAt: {
                $gte: startOfThisMonth,
                $lt: startOfNextMonth,
            },
        }),
        model.countDocuments({
            ...filter,
            createdAt: {
                $gte: startOfLastMonth,
                $lt: startOfThisMonth,
            },
        }),
    ]);

    return {
        total,
        thisMonth,
        lastMonth,
        growth: calculateGrowth(thisMonth, lastMonth),
    };
}

async function getAdminStats() {
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

    // Only users with at least one approved blog are creators.
    const approvedBlogAuthors = await blogsModel.distinct("author", {
        status: "approved",
    });

    const creatorFilter = {
        role: "user",
        _id: { $in: approvedBlogAuthors },
    };

    const [
        users,
        blogs,
        comments,
        creators,
    ] = await Promise.all([
        getEntityStats(
            UserModel,
            {},
            startOfThisMonth,
            startOfNextMonth,
            startOfLastMonth
        ),
        getEntityStats(
            blogsModel,
            {},
            startOfThisMonth,
            startOfNextMonth,
            startOfLastMonth
        ),
        getEntityStats(
            commentsModel,
            {},
            startOfThisMonth,
            startOfNextMonth,
            startOfLastMonth
        ),
        getEntityStats(
            UserModel,
            creatorFilter,
            startOfThisMonth,
            startOfNextMonth,
            startOfLastMonth
        ),
    ]);

    return {
        totalUsers: users.total,
        usersThisMonth: users.thisMonth,
        usersLastMonth: users.lastMonth,
        userGrowth: users.growth,

        totalBlogs: blogs.total,
        blogsThisMonth: blogs.thisMonth,
        blogsLastMonth: blogs.lastMonth,
        blogsGrowth: blogs.growth,

        totalComments: comments.total,
        commentsThisMonth: comments.thisMonth,
        commentsLastMonth: comments.lastMonth,
        commentsGrowth: comments.growth,

        totalCreators: creators.total,
        creatorsThisMonth: creators.thisMonth,
        creatorsLastMonth: creators.lastMonth,
        creatorsGrowth: creators.growth,
    };
}

module.exports = { getAdminStats };
