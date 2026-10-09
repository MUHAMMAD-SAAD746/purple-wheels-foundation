import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../../components/MPLifeStyle/Header/Header";
import FeedHeader from "../../../components/MPLifeStyle/FeedHeader/FeedHeader";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";
import TopCreatorCard from "../../../components/MPLifeStyle/TopCreatorCard/TopCreatorCard"

import getTrendingTags from "../../../utils/getTrendingTags";

import "./Explore.css";

const Explore = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topCreators, setTopCreators] = useState([]);
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

                const creatorMap = {};

                fetchedBlogs.forEach((blog) => {
                    const author = blog.author;

                    if (!author) return;

                    if (!creatorMap[author._id]) {
                        creatorMap[author._id] = {
                            id: author._id,
                            username: author.username,
                            profileImage: author.profileImage,
                            posts: 0,
                            followers: author.followers,
                            following: author.following
                        };
                    }

                    creatorMap[author._id].posts += 1;
                });

                setTopCreators(Object.values(creatorMap));

            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
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





    return (
        <div className="mp-explore">
            <Header />

            <main className="mp-home-content">

                <FeedHeader
                    title="EXPLORE"
                    subtitle="Discover trending content and top creators"
                />

                <div className="explore-content">

                    {/* Trending Posts */}
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

                        {/* Top Creators */}
                        <div className="explore-sidebar-card">

                            <h3 className="explore-section-title">
                                Top Creators
                            </h3>

                            {/* Top creators will go here */}
                            {topCreators.map((creator) => (
                                <TopCreatorCard
                                    key={creator.id}
                                    profileImage={creator.profileImage}
                                    username={creator.username}
                                    followers={creator.followers}
                                    posts={creator.posts}
                                    following={creator.following}
                                />
                            ))}
                        </div>


                        {/* Trending Tags */}
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