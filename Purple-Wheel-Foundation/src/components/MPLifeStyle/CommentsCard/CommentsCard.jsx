import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import getTimeAgo from "../../../utils/getTimeAgo";

import "./CommentsCard.css";

const CommentsCard = ({ blogId, blogAuthorId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/comments/${blogId}`,
                    {
                        withCredentials: true
                    }
                );

                setComments(response.data.comments);

            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [blogId]);




    const handlePostComment = async () => {
        if (!text.trim()) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/comments/`,
                {
                    blogId,
                    text
                },
                {
                    withCredentials: true
                }
            );

            setText("");

            const response = await axios.get(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/comments/${blogId}`,
                {
                    withCredentials: true
                }
            );

            setComments(response.data.comments);

        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };



    if (loading) {
        return <section className="comments-card">Loading comments...</section>;
    }




    return (
        <section className="comments-card">

            {/* Comments Header */}
            <div className="comments-header">
                <h4>Comments ({comments.length})</h4>
            </div>

            {/* Comments List */}
            <div className="comments-list">
                {comments.map((comment) => (
                    <div className="comment-item" key={comment._id}>

                        <img
                            className="comment-avatar"
                            src={comment.author?.profileImage}
                            alt={comment.author?.username}
                        />

                        <div className="comment-content">

                            <div className="comment-author-row">

                                <div className="comment-author-info">

                                    <p className="comment-author-name">
                                        {comment.author?.username}{" "}

                                        {comment.author?._id === blogAuthorId && (
                                            <span className="creator-badge">
                                                Creator
                                            </span>
                                        )}
                                    </p>

                                    <p className="comment-time">
                                        {getTimeAgo(comment.createdAt)}
                                    </p>

                                </div>

                                <button
                                    className="comment-like-button"
                                    aria-label="Like comment"
                                >
                                    <FaHeart />
                                </button>

                            </div>

                            <p className="comment-text">
                                {comment.text}
                            </p>

                        </div>

                    </div>
                ))}
            </div>


            {/* Comment Input */}
            <div className="comment-input-wrapper">

                <textarea
                    className="comment-input"
                    placeholder="Share your thoughts..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    className="comment-post-button"
                    onClick={handlePostComment}
                >
                    Post
                </button>

            </div>

        </section>
    );
};

export default CommentsCard;