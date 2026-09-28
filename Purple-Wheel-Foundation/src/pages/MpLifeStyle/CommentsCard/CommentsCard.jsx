import React from "react";
import { FaHeart } from "react-icons/fa";

import "./CommentsCard.css";

const CommentsCard = () => {
    return (
        <section className="comments-card">

            {/* Comments Header */}
            <div className="comments-header">
                <h4>Comments (12)</h4>
            </div>

            {/* Comments List */}
            <div className="comments-list">

                {/* Comment */}
                <div className="comment-item">

                    <img
                        className="comment-avatar"
                        src=""
                        alt="Author Name"
                    />

                    <div className="comment-content">

                        <div className="comment-author-row">
                            <div className="comment-author-info">
                                <p className="comment-author-name">
                                    Author Name
                                </p>

                                <p className="comment-time">
                                    2h ago
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
                            This is a sample comment from the author.
                        </p>

                    </div>
                </div>


                {/* Creator Comment */}
                <div className="comment-item">

                    <img
                        className="comment-avatar"
                        src=""
                        alt="Author Name"
                    />

                    <div className="comment-content">

                        <div className="comment-author-info">
                            <p className="comment-author-name">
                                Author Name{" "}
                                <span className="creator-badge">
                                    Creator
                                </span>
                            </p>

                            <p className="comment-time">
                                2 mins ago
                            </p>
                        </div>

                        <p className="comment-text">
                            Thanks for sharing your thoughts!
                        </p>

                    </div>

                </div>

            </div>


            {/* Comment Input */}
            <div className="comment-input-wrapper">

                <textarea
                    className="comment-input"
                    placeholder="Share your thoughts..."
                />

                <button className="comment-post-button">
                    Post
                </button>

            </div>

        </section>
    );
};

export default CommentsCard;