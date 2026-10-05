const getTrendingTags = (blogs, limit = 5) => {
    const tagMap = {};

    blogs.forEach((blog) => {
        (blog.tags || []).forEach((tag) => {
            tagMap[tag] = (tagMap[tag] || 0) + 1;
        });
    });

    return Object.entries(tagMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([tag]) => tag);
};

export default getTrendingTags;