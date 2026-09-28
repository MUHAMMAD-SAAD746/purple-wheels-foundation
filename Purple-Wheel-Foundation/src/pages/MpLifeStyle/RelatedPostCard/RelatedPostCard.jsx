import React from "react";
import { FaEye } from "react-icons/fa";
import "./RelatedPostCard.css";

const RelatedPostCard = () => {
    return (
        <aside className="related-post-card">
            <div className="related-post-header">
                <h4>Related Post</h4>
            </div>

            <div className="related-post-list">
                <div className="related-post-item">
                    <h4>The Art of Digital Detox</h4>
                    <div className="related-post-views">
                        <FaEye /> <span>3.7k views</span>
                    </div>
                </div>

                <div className="related-post-item">
                    <h4>Sustainable Fashion on a Budget</h4>
                    <div className="related-post-views"> <FaEye />
                        <span>2.8k views</span>
                    </div>
                </div>

                <div className="related-post-item">
                    <h4>Plant-Based Meals for Busy Weeknights</h4>
                    <div className="related-post-views">
                        <FaEye />
                        <span>2.5k views</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}; export default RelatedPostCard;