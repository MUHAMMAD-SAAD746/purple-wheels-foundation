import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
    FaHeart,
    FaRegHeart,
    FaEye,
    FaShare,
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";

import Header from "../../../components/MPLifeStyle/Header/Header";

import CommentsCard from "../../../components/MPLifeStyle/CommentsCard/CommentsCard";
import RelatedPostCard from "../../../components/MPLifeStyle/RelatedPostCard/RelatedPostCard";
import SharePostModal from "../../../components/MPLifeStyle/SharePostModal/SharePostModal";
import { Spinner, CircleSpinner } from "../../../components/Spinner/Spinner";

import { showToast } from "../../../utils/toast";

import "./PostDetail.css";

const PostDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    const [isSaved, setIsSaved] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false)

    const [showShareModal, setShowShareModal] = useState(false);




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
                setIsSaved(response.data.isSaved)


                const authorId = response.data.blog.author?._id;

                if (authorId && user?._id && authorId !== user._id) {
                    const followResponse = await axios.get(
                        `${import.meta.env.VITE_DOMAIN_NAME}/api/follows/${authorId}`,
                        {
                            withCredentials: true
                        }
                    );

                    setIsFollowing(followResponse.data.isFollowing);
                }


                const relatedResponse = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/related`,
                    {
                        withCredentials: true
                    }
                );

                setRelatedBlogs(relatedResponse.data.relatedBlogs);

            } catch (error) {
                console.error("Error fetching blog:", error);
                showToast("Failed to load blog post.", "error", 4000);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, user?._id]);





    const handleFollow = async () => {
        if (followLoading || !blog?.author?._id) return;

        try {
            setFollowLoading(true);

            if (isFollowing) {
                await axios.delete(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/follows/${blog.author._id}`,
                    {
                        withCredentials: true
                    }
                );

                setIsFollowing(false);
            } else {
                await axios.post(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/follows/${blog.author._id}`,
                    {},
                    {
                        withCredentials: true
                    }
                );

                setIsFollowing(true);
            }
        } catch (error) {
            showToast(
                error.response?.data?.message || "Failed to update follow status.",
                "error"
            );
        } finally {
            setFollowLoading(false);
        }
    };




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
            showToast(
                error.response?.data?.message || "Failed to update like.",
                "error"
            );
        } finally {
            setLikeLoading(false);
        }
    };





    const handleSave = async () => {
        if (saveLoading) return;

        try {
            setSaveLoading(true);

            if (isSaved) {
                await axios.delete(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/save`,
                    {
                        withCredentials: true
                    }
                );

                setIsSaved(false);
                showToast("Post removed from saved posts.", "info");

            } else {
                await axios.post(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/${id}/save`,
                    {},
                    {
                        withCredentials: true
                    }
                );

                setIsSaved(true);
                showToast("Post saved successfully!");
            }

        } catch (error) {
            console.error("Error updating saved post:", error);
            showToast(
                error.response?.data?.message || "Failed to update saved post.",
                "error"
            );
        } finally {
            setSaveLoading(false);
        }
    };




    return (
        <div>
            <Header />

            <main className="post-detail">
                <div className="post-detail-main">
                    <article className="post-content-card">
                        {loading ? (
                            <div className="post-status">
                                <p>Loading blog...</p>
                            </div>
                        ) : !blog ? (
                            <div className="post-status">
                                <h2>Blog not found</h2>
                                <p>The blog post you're looking for doesn't exist.</p>
                            </div>
                        ) : (
                            <>
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

                                    {user && user?._id !== blog.author?._id && (
                                        <button
                                            className={`follow-button ${isFollowing ? "following" : ""}`}
                                            onClick={handleFollow}
                                            disabled={followLoading}
                                        >
                                            {isFollowing
                                                ? "Following"
                                                : "Follow"}
                                        </button>
                                    )}
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
                                            onClick={() => setShowShareModal(true)}
                                        >
                                            <FaShare />
                                        </button>

                                        <button
                                            className="post-action-button"
                                            onClick={handleSave}
                                            disabled={saveLoading}
                                            aria-label={isSaved ? "Unsave post" : "Save post"}
                                        >
                                            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
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

                                    <div
                                        className="blog-description"
                                        dangerouslySetInnerHTML={{ __html: blog.description }}
                                    />

                                </div>
                            </>
                        )}

                    </article>

                </div>

                {!loading && blog && (
                    <aside className="post-detail-sidebar">
                        <CommentsCard
                            blogId={id}
                            blogAuthorId={blog.author?._id}
                        />
                        <RelatedPostCard relatedBlogs={relatedBlogs} />
                    </aside>
                )}

            </main>

            {showShareModal && blog && (
                <SharePostModal
                    blogUrl={window.location.href}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </div>
    );
};

export default PostDetail;