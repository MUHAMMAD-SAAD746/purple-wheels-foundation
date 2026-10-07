import { useEffect, useState } from "react";
import axios from "axios";
import Header from '../../../components/MPLifeStyle/Header/Header'
import FeedHeader from '../../../components/MPLifeStyle/FeedHeader/FeedHeader'
import CreateNewPost from "../../../components/MPLifeStyle/CreateNewPost/CreateNewPost";
import AnalyticsCard from "../../../components/MPLifeStyle/AnalyticsCard/AnalyticsCard";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";
import { FaEye, FaHeart, FaComment, FaChartLine } from "react-icons/fa";

import formatNumber from "../../../utils/formatNumber";

import "./Analytics.css"

const Analytics = () => {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const [analytics, setAnalytics] = useState({
        currentViews: 0,
        previousViews: 0,
        viewsGrowth: null,
        currentLikes: 0,
        previousLikes: 0,
        likesGrowth: null
    });


    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/my-blogs`,
                    {
                        withCredentials: true
                    }
                );

                setBlogs(response.data.blogs);

            } catch (error) {
                console.error("Error fetching my blogs:", error);
            }
        };


        const fetchAnalytics = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/analytics`,
                    {
                        withCredentials: true
                    }
                );

                setAnalytics(response.data);

            } catch (error) {
                console.error("Error fetching analytics:", error);
            }
        };


        fetchMyBlogs();
        fetchAnalytics();
    }, []);



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
                        <button className="analytics-tab active">
                            Publish
                        </button>

                        <button className="analytics-tab">
                            Drafts
                        </button>
                    </div>


                    <div className="analytics-blog-grid">
                        {blogs.map((blog) => (
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
                        ))}
                    </div>
                </div>
            </main>

            {showCreatePost && (
                <CreateNewPost
                    onClose={() => setShowCreatePost(false)}
                />
            )}
        </div>
    )
}

export default Analytics