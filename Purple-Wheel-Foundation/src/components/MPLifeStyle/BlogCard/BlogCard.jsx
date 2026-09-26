import { FaHeart, FaEye } from "react-icons/fa";
import "./BlogCard.css";

const BlogCard = ({
    image,
    title,
    description,
    profileImage,
    authorName,
    date,
    likeCount,
    viewCount,
}) => {
    return (
        <article className="blog-card">

            {/* Blog Image */}
            <img
                className="blog-card-image"
                src={image}
                alt={title}
                referrerPolicy="no-referrer"
            />

            {/* Card Content */}
            <div className="blog-card-content">

                {/* Blog Information */}
                <div className="blog-card-info">
                    <h2 className="blog-card-title">
                        {title}
                    </h2>

                    <p className="blog-card-description">
                        {description}
                    </p>
                </div>

                {/* Card Footer */}
                <div className="blog-card-footer">

                    {/* Author */}
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

                    {/* Stats */}
                    <div className="blog-card-stats">

                        <div className="blog-card-stat">
                            <FaHeart className="blog-card-stat-icon" />
                            <span>{likeCount}</span>
                        </div>

                        <div className="blog-card-stat">
                            <FaEye className="blog-card-stat-icon" />
                            <span>{viewCount}</span>
                        </div>

                    </div>

                </div>
            </div>
        </article>
    );
};

export default BlogCard;