import { FaUserPlus, FaUserCheck, FaUser } from "react-icons/fa";
import axios from "axios";

import "./TopCreatorCard.css";

const TopCreatorCard = ({
    creatorId,
    profileImage,
    username,
    followers,
    posts,
    following,
    isFollowing,
    isCurrentUser,
    onFollow,
    onUnfollow
}) => {


    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await axios.delete(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/follows/${creatorId}`,
                    { withCredentials: true }
                );

                onUnfollow(creatorId);
            } else {
                await axios.post(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/follows/${creatorId}`,
                    {},
                    { withCredentials: true }
                );

                onFollow(creatorId);
            }
        } catch (error) {
            console.error(
                "Error updating follow:",
                error.response?.data?.message
            );
        }
    };




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

            {isCurrentUser ? (
                <button className="top-creator-follow-button own-profile" disabled>
                    <FaUser />
                    You
                </button>
            ) : (
                <button
                    className={`top-creator-follow-button ${isFollowing ? "following" : ""}`}
                    onClick={handleFollow}
                >
                    {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                    {isFollowing ? "Following" : "Follow"}
                </button>
            )}
        </div>
    );
};

export default TopCreatorCard;