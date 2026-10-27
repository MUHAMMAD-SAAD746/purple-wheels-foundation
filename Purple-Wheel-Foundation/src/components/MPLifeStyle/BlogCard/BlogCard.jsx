import { useNavigate } from "react-router-dom";
import { FaHeart, FaEye, FaComment, FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import formatNumber from "../../../utils/formatNumber"
import "./BlogCard.css";

const BlogCard = ({
    id,
    image,
    title,
    subtitle,
    profileImage,
    authorName,
    date,
    likeCount,
    viewCount,
    commentCount = 0,
    status,
    onClick,
    onEdit,
    onDelete,
    showAuthor = true,
}) => {
    const navigate = useNavigate();


    return (
        <article
            className="blog-card"
            onClick={onClick || (() => navigate(`/MP-LifeStyle/post-detail/${id}`))}
            style={{ cursor: "pointer" }}
        >


            {/* Blog Image Wrapper */}
            <div className="blog-card-image-wrapper">
                <img
                    className="blog-card-image"
                    src={image}
                    alt={title}
                    referrerPolicy="no-referrer"
                />

                {status && (
                    <span className={`blog-card-status blog-card-status-${status}`}>
                        {status}
                    </span>
                )}

                {!showAuthor && (
                    <button
                        type="button"
                        className="blog-card-delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.();
                        }}
                        aria-label="Delete post"
                        title="Delete post"
                    >
                        <FaTrashAlt />
                    </button>
                )}
            </div>


            {/* Card Content */}
            <div className="blog-card-content">

                {/* Blog Information */}
                <div className="blog-card-info">
                    <h2 className="blog-card-title">
                        {title}
                    </h2>

                    <p className="blog-card-description">
                        {subtitle}
                    </p>
                </div>

                {/* Card Footer */}
                <div className="blog-card-footer">

                    {showAuthor && (
                        <div className="blog-card-author">
                            <img
                                className="blog-card-profile"
                                src={profileImage}
                                alt={authorName}
                            />

                            <div className="blog-card-author-info">
                                <p className="blog-card-author-name">
                                    {authorName}
                                </p>

                                <p className="blog-card-date">
                                    {new Date(date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="blog-card-stats">

                        <div className="blog-card-stat">
                            <FaHeart className="blog-card-stat-icon" />
                            <span>{formatNumber(likeCount)}</span>
                        </div>

                        <div className="blog-card-stat">
                            <FaEye className="blog-card-stat-icon" />
                            <span>{formatNumber(viewCount)}</span>
                        </div>

                        {!showAuthor && (
                            <div className="blog-card-stat">
                                <FaComment className="blog-card-stat-icon" />
                                <span>{formatNumber(commentCount)}</span>
                            </div>
                        )}
                    </div>

                    {!showAuthor && (
                        <button
                            type="button"
                            className="blog-card-edit-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.();
                            }}
                            aria-label="Edit post"
                            title="Edit post"
                        >
                            <FaPencilAlt />
                        </button>
                    )}

                </div>
            </div>
        </article>
    );
};

export default BlogCard;