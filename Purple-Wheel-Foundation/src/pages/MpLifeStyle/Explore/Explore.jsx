import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

import Header from "../../../components/MPLifeStyle/Header/Header";
import FeedHeader from "../../../components/MPLifeStyle/FeedHeader/FeedHeader";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";
import TopCreatorCard from "../../../components/MPLifeStyle/TopCreatorCard/TopCreatorCard"

import getTrendingTags from "../../../utils/getTrendingTags";

import "./Explore.css";

const Explore = () => {
    const { user } = useAuth();
    const currentUserId = user?._id;

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topCreators, setTopCreators] = useState([]);
    const [topCreatorsLoading, setTopCreatorsLoading] = useState(true);
    const [trendingTags, setTrendingTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/`
                );

                const fetchedBlogs = response.data.blogs;
                setBlogs(fetchedBlogs);
                setTrendingTags(getTrendingTags(fetchedBlogs, 10));

            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);




    useEffect(() => {
        const fetchTopCreators = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/topCreators`,
                    { withCredentials: true }
                );

                setTopCreators(
                    response.data.creators.map((creator) => ({
                        id: creator._id,
                        username: creator.username,
                        profileImage: creator.profileImage,
                        posts: creator.postCount,
                        followers: creator.followers,
                        following: creator.following,
                        isFollowing: creator.isFollowing
                    }))
                );
            } catch (error) {
                console.error("Error fetching top creators:", error);
            } finally {
                setTopCreatorsLoading(false);
            }
        };

        fetchTopCreators();
    }, []);




    const handleTagClick = async (tag) => {
        try {
            setLoading(true);
            setSelectedTag(tag);

            const response = await axios.get(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/?tag=${encodeURIComponent(tag)}`
            );

            setBlogs(response.data.blogs);

        } catch (error) {
            console.error("Error fetching tag blogs:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleClearTag = async () => {
        try {
            setLoading(true);
            setSelectedTag(null);

            const response = await axios.get(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/`
            );

            setBlogs(response.data.blogs);

        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };






    const handleFollow = (creatorId) => {
        setTopCreators((prev) =>
            prev.map((creator) => {
                if (creator.id === creatorId) {
                    return {
                        ...creator,
                        isFollowing: true,
                        followers: creator.followers + 1
                    };
                }

                if (creator.id === currentUserId) {
                    return {
                        ...creator,
                        following: creator.following + 1
                    };
                }

                return creator;
            })
        );
    };

    const handleUnfollow = (creatorId) => {
        setTopCreators((prev) =>
            prev.map((creator) => {
                if (creator.id === creatorId) {
                    return {
                        ...creator,
                        isFollowing: false,
                        followers: creator.followers - 1
                    };
                }

                if (creator.id === currentUserId) {
                    return {
                        ...creator,
                        following: creator.following - 1
                    };
                }

                return creator;
            })
        );
    };





    return (
        <div className="mp-explore">
            <Header />

            <main className="mp-home-content">

                <FeedHeader
                    title="EXPLORE"
                    subtitle="Discover trending content and top creators"
                />

                <div className="explore-content">

                    <section className="explore-trending">

                        <div className="explore-title-row">

                            <h3 className="explore-section-title">
                                {selectedTag
                                    ? `Posts tagged #${selectedTag}`
                                    : "Trending Posts"}
                            </h3>

                            {selectedTag && (
                                <button
                                    className="clear-tag-btn"
                                    onClick={handleClearTag}
                                >
                                    Clear Tag
                                </button>
                            )}

                        </div>

                        <div className="explore-blog-grid">
                            {loading ? (
                                <p className="explore-loading">
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
                            )}
                        </div>

                    </section>


                    {/* Right Section */}
                    <aside className="explore-sidebar">

                        <div className="explore-sidebar-card top-creator-section">

                            <h3 className="explore-section-title">
                                Top Creators
                            </h3>

                            {topCreatorsLoading ? (
                                <p className="explore-loading">Loading creators...</p>
                            ) : topCreators.length > 0 ? (
                                topCreators.map((creator) => (
                                    <TopCreatorCard
                                        key={creator.id}
                                        creatorId={creator.id}
                                        profileImage={creator.profileImage}
                                        username={creator.username}
                                        followers={creator.followers}
                                        posts={creator.posts}
                                        following={creator.following}
                                        isFollowing={creator.isFollowing}
                                        isCurrentUser={creator.id === currentUserId}
                                        onFollow={handleFollow}
                                        onUnfollow={handleUnfollow}
                                    />
                                ))
                            ) : (
                                <p className="explore-loading">No creators found.</p>
                            )}
                        </div>


                        <div className="explore-sidebar-card">

                            <h3 className="explore-section-title">
                                Trending Tags
                            </h3>

                            <div className="trending-tags">
                                {trendingTags.map((tag) => (
                                    <div
                                        className="trending-tag"
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        #{tag}
                                    </div>
                                ))}
                            </div>

                        </div>

                    </aside>

                </div>

            </main>
        </div>
    );
};

export default Explore;