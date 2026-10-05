import { FaUserPlus } from "react-icons/fa";
import "./TopCreatorCard.css";

const TopCreatorCard = ({
    profileImage,
    username,
    followers,
    posts,
    following
}) => {
    return (
        <div className="top-creator-card">
            <div className="container">
                <img
                    className="top-creator-profile"
                    src={profileImage}
                    alt={username}
                />

                <div className="top-creator-info">
                    <h4 className="top-creator-name"> {username} </h4>
                    <p className="top-creator-stats">
                        {followers} followers •
                        {posts} posts •
                        {following} following
                    </p>
                </div>
            </div>

            <button className="top-creator-follow-button">
                <FaUserPlus />
                Follow
            </button>
        </div>
    );
};

export default TopCreatorCard;