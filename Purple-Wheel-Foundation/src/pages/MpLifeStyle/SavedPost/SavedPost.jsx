import { useEffect, useState } from "react";
import axios from "axios";

import Header from '../../../components/MPLifeStyle/Header/Header'
import FeedHeader from '../../../components/MPLifeStyle/FeedHeader/FeedHeader'
import BlogCard from '../../../components/MPLifeStyle/BlogCard/BlogCard'

import { FaBookmark } from "react-icons/fa";

import "./SavedPost.css";



const SavedPost = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchSavedBlogs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/saved`,
                    {
                        withCredentials: true
                    }
                );

                setBlogs(response.data.savedPosts);
            } catch (error) {
                console.error("Error fetching saved posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedBlogs();
    }, []);




    return (
        <div>
            <Header />

            <main className="mp-home-content">
                <FeedHeader
                    title="SAVED POSTS"
                    subtitle="View and manage your saved lifestyle content"
                />

                <div className="saved-blog-grid">
                    {loading ? (
                        <div className="blog-loading">
                            Loading saved posts...
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="empty-saved-posts">
                            <div className="empty-saved-icon">
                                <FaBookmark />
                            </div>

                            <h3>No Saved Posts Yet</h3>

                            <p>
                                Posts you save will appear here.
                                Explore your feed and save something you love!
                            </p>
                        </div>
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


            </main>
        </div>
    )
}

export default SavedPost