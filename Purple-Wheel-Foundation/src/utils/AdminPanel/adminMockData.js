// src/utils/AdminPanel/adminMockData.js
// Frontend-only sample data for the Admin Panel. No backend connection.

export const adminStats = {
    totalUsers: 3842,
    totalBlogs: 1254,
    totalComments: 8913,
    totalCreators: 247,
    userGrowth: 12.4,
    blogGrowth: 8.7,
    commentGrowth: 15.2,
    creatorGrowth: 5.3,
};

export const adminUsers = [
    { id: 1, username: "sarah_johnson", email: "sarah.johnson@example.com", role: "creator", status: "active", joined: "2024-01-15", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Sarah%20Johnson" },
    { id: 2, username: "mark_williams", email: "mark.williams@example.com", role: "user", status: "active", joined: "2024-02-08", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Mark%20Williams" },
    { id: 3, username: "emily_chen", email: "emily.chen@example.com", role: "creator", status: "active", joined: "2024-02-20", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Emily%20Chen" },
    { id: 4, username: "james_taylor", email: "james.taylor@example.com", role: "user", status: "inactive", joined: "2024-03-05", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=James%20Taylor" },
    { id: 5, username: "lisa_brown", email: "lisa.brown@example.com", role: "creator", status: "active", joined: "2024-03-18", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Lisa%20Brown" },
    { id: 6, username: "david_garcia", email: "david.garcia@example.com", role: "user", status: "active", joined: "2024-04-02", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=David%20Garcia" },
    { id: 7, username: "anna_martinez", email: "anna.martinez@example.com", role: "creator", status: "inactive", joined: "2024-04-15", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Anna%20Martinez" },
    { id: 8, username: "kevin_lee", email: "kevin.lee@example.com", role: "user", status: "active", joined: "2024-05-01", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Kevin%20Lee" },
    { id: 9, username: "natalie_white", email: "natalie.white@example.com", role: "creator", status: "active", joined: "2024-05-20", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Natalie%20White" },
    { id: 10, username: "ryan_clark", email: "ryan.clark@example.com", role: "user", status: "active", joined: "2024-06-08", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Ryan%20Clark" },
    { id: 11, username: "sophia_hall", email: "sophia.hall@example.com", role: "creator", status: "active", joined: "2024-06-22", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Sophia%20Hall" },
    { id: 12, username: "tyler_young", email: "tyler.young@example.com", role: "user", status: "inactive", joined: "2024-07-10", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Tyler%20Young" },
    { id: 13, username: "olivia_king", email: "olivia.king@example.com", role: "creator", status: "active", joined: "2024-07-28", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Olivia%20King" },
    { id: 14, username: "ethan_scott", email: "ethan.scott@example.com", role: "user", status: "active", joined: "2024-08-14", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Ethan%20Scott" },
    { id: 15, username: "mia_adams", email: "mia.adams@example.com", role: "creator", status: "active", joined: "2024-09-01", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Mia%20Adams" },
];

export const adminBlogs = [
    { id: 1, title: "The Future of Renewable Energy", author: "sarah_johnson", category: "Technology", views: 4821, likes: 312, comments: 47, status: "approved", created: "2024-09-05" },
    { id: 2, title: "Mindful Morning Routines That Changed My Life", author: "emily_chen", category: "Lifestyle", views: 3210, likes: 218, comments: 35, status: "approved", created: "2024-09-12" },
    { id: 3, title: "10 Business Strategies for 2025", author: "lisa_brown", category: "Business", views: 5632, likes: 421, comments: 63, status: "approved", created: "2024-09-18" },
    { id: 4, title: "Urban Gardening in Small Spaces", author: "anna_martinez", category: "Lifestyle", views: 1894, likes: 145, comments: 22, status: "pending", created: "2024-09-25" },
    { id: 5, title: "AI Tools Every Developer Needs", author: "sophia_hall", category: "Technology", views: 7241, likes: 583, comments: 91, status: "approved", created: "2024-10-02" },
    { id: 6, title: "Charity Work & Community Building", author: "natalie_white", category: "Community", views: 2145, likes: 178, comments: 29, status: "approved", created: "2024-10-08" },
    { id: 7, title: "Photography Tips for Beginners", author: "olivia_king", category: "Arts", views: 3421, likes: 267, comments: 41, status: "pending", created: "2024-10-14" },
    { id: 8, title: "Financial Planning in Your 30s", author: "mia_adams", category: "Finance", views: 6213, likes: 498, comments: 74, status: "approved", created: "2024-10-19" },
    { id: 9, title: "Plant-Based Diet: A Complete Guide", author: "emily_chen", category: "Health", views: 4132, likes: 334, comments: 52, status: "rejected", created: "2024-10-21" },
    { id: 10, title: "The Rise of Remote Work Culture", author: "sarah_johnson", category: "Business", views: 5814, likes: 463, comments: 68, status: "approved", created: "2024-10-22" },
    { id: 11, title: "Sustainable Fashion Choices", author: "lisa_brown", category: "Lifestyle", views: 2876, likes: 221, comments: 33, status: "pending", created: "2024-10-23" },
    { id: 12, title: "Mental Health Awareness in Workplaces", author: "natalie_white", category: "Health", views: 3945, likes: 318, comments: 48, status: "approved", created: "2024-10-23" },
];

export const adminComments = [
    { id: 1, content: "This article completely changed my perspective on renewable energy. Great work!", author: "mark_williams", blogTitle: "The Future of Renewable Energy", created: "2024-09-06", status: "approved" },
    { id: 2, content: "I've been doing mindful mornings for 3 months now and the results are amazing!", author: "ryan_clark", blogTitle: "Mindful Morning Routines That Changed My Life", created: "2024-09-13", status: "approved" },
    { id: 3, content: "Strategy #7 is something every business owner needs to read right now.", author: "james_taylor", blogTitle: "10 Business Strategies for 2025", created: "2024-09-19", status: "approved" },
    { id: 4, content: "I tried this in my apartment balcony and grew tomatoes! Amazing advice.", author: "kevin_lee", blogTitle: "Urban Gardening in Small Spaces", created: "2024-09-26", status: "pending" },
    { id: 5, content: "The AI tools section was super helpful. Bookmarked this one!", author: "tyler_young", blogTitle: "AI Tools Every Developer Needs", created: "2024-10-03", status: "approved" },
    { id: 6, content: "Totally disagree with the investment advice in point 3. Very misleading.", author: "ethan_scott", blogTitle: "Financial Planning in Your 30s", created: "2024-10-20", status: "rejected" },
    { id: 7, content: "The community section was heartwarming. Purple Wheel is doing great things!", author: "sophia_hall", blogTitle: "Charity Work & Community Building", created: "2024-10-09", status: "approved" },
    { id: 8, content: "This spam content has nothing to do with the article. Buy followers here!", author: "unknown_user", blogTitle: "Photography Tips for Beginners", created: "2024-10-15", status: "rejected" },
    { id: 9, content: "Plant-based diets have helped me lose 15 lbs in 2 months. Highly recommend!", author: "lisa_brown", blogTitle: "Plant-Based Diet: A Complete Guide", created: "2024-10-22", status: "approved" },
    { id: 10, content: "Remote work is the future! My productivity has doubled since I started WFH.", author: "anna_martinez", blogTitle: "The Rise of Remote Work Culture", created: "2024-10-22", status: "pending" },
    { id: 11, content: "Sustainable fashion is more affordable than people think. Great tips here.", author: "mia_adams", blogTitle: "Sustainable Fashion Choices", created: "2024-10-23", status: "pending" },
    { id: 12, content: "Every HR professional needs to read this. Mental health at work matters.", author: "olivia_king", blogTitle: "Mental Health Awareness in Workplaces", created: "2024-10-23", status: "approved" },
];

export const adminCreators = [
    { id: 1, username: "sarah_johnson", email: "sarah.johnson@example.com", posts: 24, followers: 1842, status: "active", joined: "2024-01-15", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Sarah%20Johnson" },
    { id: 2, username: "emily_chen", email: "emily.chen@example.com", posts: 18, followers: 2156, status: "active", joined: "2024-02-20", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Emily%20Chen" },
    { id: 3, username: "lisa_brown", email: "lisa.brown@example.com", posts: 31, followers: 3214, status: "active", joined: "2024-03-18", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Lisa%20Brown" },
    { id: 4, username: "anna_martinez", email: "anna.martinez@example.com", posts: 12, followers: 987, status: "inactive", joined: "2024-04-15", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Anna%20Martinez" },
    { id: 5, username: "natalie_white", email: "natalie.white@example.com", posts: 20, followers: 1654, status: "active", joined: "2024-05-20", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Natalie%20White" },
    { id: 6, username: "sophia_hall", email: "sophia.hall@example.com", posts: 27, followers: 2891, status: "active", joined: "2024-06-22", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Sophia%20Hall" },
    { id: 7, username: "olivia_king", email: "olivia.king@example.com", posts: 15, followers: 1123, status: "active", joined: "2024-07-28", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Olivia%20King" },
    { id: 8, username: "mia_adams", email: "mia.adams@example.com", posts: 22, followers: 1987, status: "active", joined: "2024-09-01", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Mia%20Adams" },
];

export const adminMonthlyData = [
    { month: "Apr", users: 280, blogs: 85, comments: 420 },
    { month: "May", users: 340, blogs: 102, comments: 510 },
    { month: "Jun", users: 410, blogs: 118, comments: 640 },
    { month: "Jul", users: 390, blogs: 130, comments: 590 },
    { month: "Aug", users: 520, blogs: 155, comments: 780 },
    { month: "Sep", users: 620, blogs: 183, comments: 940 },
    { month: "Oct", users: 712, blogs: 210, comments: 1130 },
];

export const adminCategoryData = [
    { name: "Technology", count: 312, percentage: 25 },
    { name: "Lifestyle", count: 264, percentage: 21 },
    { name: "Business", count: 200, percentage: 16 },
    { name: "Health", count: 175, percentage: 14 },
    { name: "Community", count: 150, percentage: 12 },
    { name: "Finance", count: 88, percentage: 7 },
    { name: "Arts", count: 65, percentage: 5 },
];
