import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import formatNumber from "../../../utils/formatNumber";
import "./RelatedPostCard.css";

const RelatedPostCard = ({ relatedBlogs }) => {
    const navigate = useNavigate();

    return (
        <aside className="related-post-card">
            <div className="related-post-header">
                <h4>Related Post</h4>
            </div>

            <div className="related-post-list">
                {relatedBlogs.map((blog) => (
                    <div
                        className="related-post-item"
                        key={blog._id}
                        onClick={() => navigate(`/MP-LifeStyle/post-detail/${blog._id}`)}
                    >
                        <h4>{blog.title}</h4>

                        <div className="related-post-views">
                            <FaEye />
                            <span>{formatNumber(blog.viewCount)} views</span>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}; export default RelatedPostCard;