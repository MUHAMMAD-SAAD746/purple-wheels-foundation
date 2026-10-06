import { FaUser, FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";

import "./CreatorsCard.css";

const CreatorCard = ({
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
                    {
                        withCredentials: true
                    }
                );

                onUnfollow(creatorId);

            } else {

                await axios.post(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/follows/${creatorId}`,
                    {},
                    {
                        withCredentials: true
                    }
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
        <div className="creator-card">
            <div className="container">
                <img
                    className="creator-profile"
                    src={profileImage}
                    alt={username}
                />

                <div className="creator-info">
                    <h4 className="creator-name"> {username} </h4>
                    <p className="creator-bio">Sharing ideas and inspiration every day.</p>
                </div>
            </div>

            <p className="creator-stats">
                <span className="stats"> {followers}</span> followers •
                <span className="stats"> {posts}</span> posts •
                <span className="stats"> {following}</span> following
            </p>

            {isCurrentUser ? (
                <button className="creator-follow-button own-profile">
                    <FaUser />
                    You
                </button>
            ) : (
                <button
                    className={`creator-follow-button ${isFollowing ? "following" : ""}`}
                    onClick={handleFollow}
                >
                    {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                    {isFollowing ? "Following" : "Follow"}
                </button>
            )}
        </div>
    );
};

export default CreatorCard;