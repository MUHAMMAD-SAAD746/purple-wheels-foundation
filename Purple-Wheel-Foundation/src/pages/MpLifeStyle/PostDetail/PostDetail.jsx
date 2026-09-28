import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
    FaHeart,
    FaEye,
    FaShare,
    FaBookmark,
} from "react-icons/fa";

import Header from "../../../components/MPLifeStyle/Header/Header";

import "./PostDetail.css";
import CommentsCard from "../CommentsCard/CommentsCard";
import RelatedPostCard from "../RelatedPostCard/RelatedPostCard";

const PostDetail = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}`,
                    {
                        withCredentials: true
                    }
                );

                console.log(response.data);
                setBlog(response.data.blog);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);



    if (loading) {
        return <p>Loading blog...</p>;
    }

    if (!blog) {
        return <p>Blog not found.</p>;
    }


    return (
        <div>
            <Header />

            <main className="post-detail">

                {/* Main Content */}
                <div className="post-detail-main">



                    {/* Post */}
                    <article className="post-content-card">
                        {/* Author Info */}
                        <div className="post-author">
                            <div className="post-author-info">
                                <img
                                    className="post-author-image"
                                    src={blog.author?.profileImage}
                                    alt={blog.author?.username}
                                />

                                <div className="post-author-text">
                                    <p className="post-author-name">
                                        {blog.author?.username}
                                    </p>

                                    <p className="post-publish-date">
                                        September 28, 2026
                                    </p>
                                </div>
                            </div>

                            <button className="follow-button">
                                Follow
                            </button>
                        </div>

                        {/* Stats + Actions */}
                        <div className="post-top-bar">

                            <div className="post-stats">

                                <div className="post-stat">
                                    <FaHeart />
                                    <span>{blog.likeCount}</span>
                                </div>

                                <div className="post-stat">
                                    <FaEye />
                                    <span>{blog.viewCount}</span>
                                </div>

                            </div>

                            <div className="post-actions">

                                <button
                                    className="post-action-button"
                                    aria-label="Share post"
                                >
                                    <FaShare />
                                </button>

                                <button
                                    className="post-action-button"
                                    aria-label="Save post"
                                >
                                    <FaBookmark />
                                </button>

                            </div>

                        </div>

                        {/* Blog Image */}
                        <img
                            className="post-main-image"
                            src={blog.image}
                            alt="Blog"
                        />

                        {/* Blog Content */}
                        <div className="post-article-content">

                            <h1>{blog.title}</h1>

                            <p>
                                This is the introduction of the blog post.
                                The author can explain the main topic here
                                and provide some useful information to the
                                readers.
                            </p>

                            <h2>First Heading</h2>

                            <p>
                                This is the first section of the blog post.
                                Multiple paragraphs can be added here depending
                                on the content of the article.
                            </p>

                            <p>
                                Another paragraph can be added to continue
                                explaining the topic in more detail.
                            </p>

                            <h2>Second Heading</h2>

                            <p>
                                This section contains more information about
                                the topic. You can render multiple headings
                                and paragraphs dynamically from your backend.
                            </p>

                            <h3>Sub Heading</h3>

                            <p>
                                Additional content can be placed under the
                                sub-heading.
                            </p>

                        </div>

                    </article>

                </div>

                {/* Right Sidebar */}
                <aside className="post-detail-sidebar">
                    {/* Related posts / advertisements / other content */}
                    <CommentsCard />
                    <RelatedPostCard />
                </aside>

            </main>
        </div>
    );
};

export default PostDetail;