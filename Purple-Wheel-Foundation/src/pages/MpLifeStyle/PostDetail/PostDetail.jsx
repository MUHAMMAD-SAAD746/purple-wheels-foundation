import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
    FaHeart,
    FaRegHeart,
    FaEye,
    FaShare,
    FaBookmark,
} from "react-icons/fa";

import Header from "../../../components/MPLifeStyle/Header/Header";

import "./PostDetail.css";
import CommentsCard from "../../../components/MPLifeStyle/CommentsCard/CommentsCard";
import RelatedPostCard from "../../../components/MPLifeStyle/RelatedPostCard/RelatedPostCard";

const PostDetail = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);




    useEffect(() => {
        const fetchBlog = async () => {
            try {
                await axios.post(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/view`,
                    {},
                    {
                        withCredentials: true
                    }
                );


                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}`,
                    {
                        withCredentials: true
                    }
                );

                setBlog(response.data.blog);
                setIsLiked(response.data.isLiked);


                const relatedResponse = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/related`,
                    {
                        withCredentials: true
                    }
                );

                setRelatedBlogs(relatedResponse.data.relatedBlogs);

            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);




    const handleLike = async () => {
        if (likeLoading) return;

        try {
            setLikeLoading(true);

            if (isLiked) {
                await axios.delete(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/like`,
                    {
                        withCredentials: true
                    }
                );

                setIsLiked(false);

                setBlog((prevBlog) => ({
                    ...prevBlog,
                    likeCount: prevBlog.likeCount - 1
                }));

            } else {
                await axios.post(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/like`,
                    {},
                    {
                        withCredentials: true
                    }
                );

                setIsLiked(true);

                setBlog((prevBlog) => ({
                    ...prevBlog,
                    likeCount: prevBlog.likeCount + 1
                }));
            }

        } catch (error) {
            console.error("Error updating like:", error);
        } finally {
            setLikeLoading(false);
        }
    };





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
                <div className="post-detail-main">
                    <article className="post-content-card">
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

                        <div className="post-top-bar">

                            <div className="post-stats">

                                <button
                                    className="post-stat like-button"
                                    onClick={handleLike}
                                    disabled={likeLoading}
                                    aria-label="Like post"
                                >
                                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                                    <span>{blog.likeCount}</span>
                                </button>

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

                        <img
                            className="post-main-image"
                            src={blog.image}
                            alt="Blog"
                        />

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

                <aside className="post-detail-sidebar">
                    <CommentsCard
                        blogId={id}
                        blogAuthorId={blog.author?._id}
                    />
                    <RelatedPostCard relatedBlogs={relatedBlogs} />
                </aside>

            </main>
        </div>
    );
};

export default PostDetail;