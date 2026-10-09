import { useNavigate } from "react-router-dom";
import { FaHeart, FaEye } from "react-icons/fa";
import formatNumber from "../../../utils/formatNumber"
import "./BlogCard.css";

const BlogCard = ({
    id,
    image,
    title,
    description,
    profileImage,
    authorName,
    date,
    likeCount,
    viewCount,
    onClick,
}) => {
    const navigate = useNavigate();


    return (
        <article
            className="blog-card"
            onClick={onClick || (() => navigate(`/MP-LifeStyle/post-detail/${id}`))}
            style={{ cursor: "pointer" }}
        >

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
                            <span>{formatNumber(likeCount)}</span>
                        </div>

                        <div className="blog-card-stat">
                            <FaEye className="blog-card-stat-icon" />
                            <span>{formatNumber(viewCount)}</span>
                        </div>

                    </div>

                </div>
            </div>
        </article>
    );
};

export default BlogCard;