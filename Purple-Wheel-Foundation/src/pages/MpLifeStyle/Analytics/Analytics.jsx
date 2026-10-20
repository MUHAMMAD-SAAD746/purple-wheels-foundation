import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Header from '../../../components/MPLifeStyle/Header/Header'
import FeedHeader from '../../../components/MPLifeStyle/FeedHeader/FeedHeader'
import CreateNewPost from "../../../components/MPLifeStyle/CreateNewPost/CreateNewPost";
import AnalyticsCard from "../../../components/MPLifeStyle/AnalyticsCard/AnalyticsCard";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";
import DeletePostModal from "../../../components/MPLifeStyle/DeletePostModal/DeletePostModal";
import { showToast } from "../../../utils/toast";
import { FaEye, FaHeart, FaComment, FaChartLine } from "react-icons/fa";

import formatNumber from "../../../utils/formatNumber";

import "./Analytics.css"

const Analytics = () => {
    const { user } = useAuth();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [selectedDraft, setSelectedDraft] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [activeTab, setActiveTab] = useState("publish");
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const [analytics, setAnalytics] = useState({
        currentViews: 0,
        previousViews: 0,
        viewsGrowth: null,
        currentLikes: 0,
        previousLikes: 0,
        likesGrowth: null,
        totalComments: 0,
        currentPeriodComments: 0,
        previousPeriodComments: 0,
        commentsGrowth: null
    });


    const [blogToDelete, setBlogToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");




    const loadDrafts = () => {
        const savedDrafts = JSON.parse(
            localStorage.getItem("mp_lifestyle_drafts")
        ) || [];

        const userDrafts = savedDrafts.filter(
            (draft) => draft.userId === user?._id
        );

        setDrafts(userDrafts);
    };



    const refreshBlogs = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/my-blogs`,
                {
                    withCredentials: true,
                }
            );

            setBlogs(response.data.blogs);
            loadDrafts();
        } catch (error) {
            console.error("Error refreshing blogs:", error);
        }
    };




    const openDeleteModal = (blog) => {
        setDeleteError("");
        setBlogToDelete(blog);
    };

    const handleConfirmDelete = async () => {
        if (!blogToDelete || isDeleting) return;

        setIsDeleting(true);
        setDeleteError("");

        try {
            await axios.delete(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${blogToDelete._id}`,
                {
                    withCredentials: true,
                }
            );

            // Remove the deleted post from the UI
            setBlogs((prevBlogs) =>
                prevBlogs.filter(
                    (blog) => blog._id !== blogToDelete._id
                )
            );

            showToast("Blog deleted successfully!", "success");
            setBlogToDelete(null);
        } catch (error) {
            console.error(
                "Failed to delete blog:",
                error.response?.data || error.message
            );

            const message =
                error.response?.data?.message ||
                "Unable to delete the post. Please try again.";

            setDeleteError(message);
            showToast(message, "error", 4000);
        } finally {
            setIsDeleting(false);
        }
    };




    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const [blogsResponse, analyticsResponse] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/my-blogs`,
                        {
                            withCredentials: true
                        }
                    ),
                    axios.get(
                        `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/analytics`,
                        {
                            withCredentials: true
                        }
                    )
                ]);

                setBlogs(blogsResponse.data.blogs);
                setAnalytics(analyticsResponse.data);

                loadDrafts();

            } catch (error) {
                console.error("Error fetching analytics data:", error);
                showToast("Failed to load analytics data.", "error", 4000);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, [user]);



    const totalViews = blogs.reduce(
        (total, blog) => total + (blog.viewCount || 0),
        0
    );

    const totalLikes = blogs.reduce(
        (total, blog) => total + (blog.likeCount || 0),
        0
    );

    const viewsGrowth = analytics.viewsGrowth;
    const likesGrowth = analytics.likesGrowth;



    const currentEngagementRate =
        analytics.currentViews > 0
            ? ((analytics.currentLikes + analytics.currentPeriodComments) /
                analytics.currentViews) * 100
            : 0;

    const previousEngagementRate =
        analytics.previousViews > 0
            ? ((analytics.previousLikes + analytics.previousPeriodComments) /
                analytics.previousViews) * 100
            : 0;

    const engagementGrowth =
        previousEngagementRate > 0
            ? ((currentEngagementRate - previousEngagementRate) /
                previousEngagementRate) * 100
            : null;



    return (
        <div>
            <Header />

            <main className="mp-home-content">
                <FeedHeader
                    title="ANALYTICS"
                    subtitle="Manage your content and track performance"
                    showButton={true}
                    onNewPost={() => setShowCreatePost(true)}
                />


                <div className="mp-analytics">
                    <div className="mp-analytics-cards">
                        <AnalyticsCard
                            icon={<FaEye />}
                            title="Total Views"
                            value={formatNumber(totalViews)}
                            percentage={
                                viewsGrowth === null
                                    ? `+${analytics.currentViews} views`
                                    : `${viewsGrowth > 0 ? "+" : ""}${viewsGrowth}%`
                            }
                            positive={
                                viewsGrowth === null || viewsGrowth >= 0
                            }
                        />

                        <AnalyticsCard
                            icon={<FaHeart />}
                            title="Total Likes"
                            value={formatNumber(totalLikes)}
                            percentage={
                                likesGrowth === null
                                    ? `+${analytics.currentLikes} likes`
                                    : `${likesGrowth > 0 ? "+" : ""}${likesGrowth}%`
                            }
                            positive={
                                likesGrowth === null || likesGrowth >= 0
                            }
                        />

                        <AnalyticsCard
                            icon={<FaComment />}
                            title="Total Comments"
                            value={formatNumber(analytics.totalComments)}
                            percentage={
                                analytics.commentsGrowth === null
                                    ? `+${analytics.currentPeriodComments} comments`
                                    : `${analytics.commentsGrowth > 0 ? "+" : ""}${analytics.commentsGrowth}%`
                            }
                            positive={
                                analytics.commentsGrowth === null ||
                                analytics.commentsGrowth >= 0
                            }
                        />

                        <AnalyticsCard
                            className="engagement-card"
                            icon={<FaChartLine />}
                            title="Engagement Rate"
                            value={`${currentEngagementRate.toFixed(1)}%`}
                            percentage={
                                engagementGrowth === null
                                    ? ""
                                    : `${engagementGrowth > 0 ? "+" : ""}${engagementGrowth.toFixed(1)}%`
                            }
                            positive={
                                engagementGrowth === null || engagementGrowth >= 0
                            }
                        />
                    </div>


                    <div className="analytics-tabs">
                        <button
                            className={`analytics-tab ${activeTab === "publish" ? "active" : ""}`}
                            onClick={() => setActiveTab("publish")}
                        >
                            Publish
                        </button>

                        <button
                            className={`analytics-tab ${activeTab === "drafts" ? "active" : ""}`}
                            onClick={() => setActiveTab("drafts")}
                        >
                            Drafts
                        </button>
                    </div>


                    <div className="analytics-blog-grid">
                        {activeTab === "publish" ? (
                            loading ? (
                                <p className="analytics-loading">
                                    Loading posts...
                                </p>
                            ) : (
                                blogs.map((blog) => (
                                    <BlogCard
                                        key={blog._id}
                                        id={blog._id}
                                        image={blog.image}
                                        title={blog.title}
                                        subtitle={blog.subtitle}
                                        profileImage={blog.author?.profileImage}
                                        authorName={blog.author?.username}
                                        date={blog.createdAt}
                                        likeCount={blog.likeCount}
                                        viewCount={blog.viewCount}
                                        showAuthor={false}
                                        onDelete={() => openDeleteModal(blog)}
                                        onEdit={() => {
                                            setSelectedDraft(null);
                                            setSelectedBlog(blog);
                                            setShowCreatePost(true);
                                        }}
                                    />
                                ))
                            )
                        ) : (
                            drafts.length > 0 ? (
                                drafts.map((draft) => (
                                    <BlogCard
                                        key={draft.id}
                                        id={draft.id}
                                        image={undefined}
                                        title={draft.title || "Untitled Draft"}
                                        subtitle={draft.subtitle}
                                        profileImage={user?.profileImage}
                                        authorName={user?.username}
                                        date={draft.createdAt}
                                        likeCount={0}
                                        viewCount={0}
                                        onClick={() => {
                                            setSelectedDraft(draft);
                                            setShowCreatePost(true);
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="analytics-loading">
                                    No drafts found.
                                </p>
                            )
                        )}
                    </div>
                </div>
            </main>

            {showCreatePost && (
                <CreateNewPost
                    onSave={refreshBlogs}
                    draft={selectedDraft}
                    blog={selectedBlog}
                    onClose={() => {
                        setShowCreatePost(false);
                        setSelectedDraft(null);
                        setSelectedBlog(null);
                    }}
                />
            )}


            <DeletePostModal
                isOpen={Boolean(blogToDelete)}
                postTitle={blogToDelete?.title}
                isDeleting={isDeleting}
                error={deleteError}
                onCancel={() => {
                    if (isDeleting) return;

                    setBlogToDelete(null);
                    setDeleteError("");
                }}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

export default Analytics