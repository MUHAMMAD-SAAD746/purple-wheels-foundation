import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Header from '../../../components/MPLifeStyle/Header/Header'
import FeedHeader from '../../../components/MPLifeStyle/FeedHeader/FeedHeader'
import CreateNewPost from "../../../components/MPLifeStyle/CreateNewPost/CreateNewPost";
import AnalyticsCard from "../../../components/MPLifeStyle/AnalyticsCard/AnalyticsCard";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";
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

    const [analytics, setAnalytics] = useState({
        currentViews: 0,
        previousViews: 0,
        viewsGrowth: null,
        currentLikes: 0,
        previousLikes: 0,
        likesGrowth: null
    });




    const loadDrafts = () => {
        const savedDrafts = JSON.parse(
            localStorage.getItem("mp_lifestyle_drafts")
        ) || [];

        const userDrafts = savedDrafts.filter(
            (draft) => draft.userId === user?._id
        );

        setDrafts(userDrafts);
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

                // const savedDrafts = JSON.parse(
                //     localStorage.getItem("mp_lifestyle_drafts")
                // ) || [];

                // const userDrafts = savedDrafts.filter(
                //     (draft) => draft.userId === user?._id
                // );

                // setDrafts(userDrafts);

                loadDrafts();

            } catch (error) {
                console.error("Error fetching analytics data:", error);
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
                            value="1200"
                            percentage="+15%"
                            positive={true}
                        />

                        <AnalyticsCard
                            icon={<FaChartLine />}
                            title="Engagement Rate"
                            value="24%"
                            percentage="+15%"
                            positive={true}
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
                                        description={blog.description}
                                        profileImage={blog.author?.profileImage}
                                        authorName={blog.author?.username}
                                        date={blog.createdAt}
                                        likeCount={blog.likeCount}
                                        viewCount={blog.viewCount}
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
                                        description={draft.content}
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
                    onSave={loadDrafts}
                    draft={selectedDraft}
                    onClose={() => {
                        setShowCreatePost(false);
                        setSelectedDraft(null);
                    }}
                />
            )}
        </div>
    )
}

export default Analytics