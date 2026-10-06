import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";

import Header from "../../../components/MPLifeStyle/Header/Header"
import FeedHeader from '../../../components/MPLifeStyle/FeedHeader/FeedHeader'
import CreatorCard from '../../../components/MPLifeStyle/CreatorsCard/CreatorsCard'

import "./Creators.css";

const Creators = () => {
    const { user } = useAuth();
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = user?._id;


    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/creators`,
                    {
                        withCredentials: true
                    }
                );

                setCreators(response.data.creators);

            } catch (error) {
                console.error("Error fetching creators:", error);

            } finally {
                setLoading(false);
            }
        };

        fetchCreators();
    }, []);




    const handleFollow = (creatorId) => {
        setCreators((prevCreators) =>
            prevCreators.map((creator) => {

                // Person we followed
                if (creator._id === creatorId) {
                    return {
                        ...creator,
                        isFollowing: true,
                        followers: creator.followers + 1
                    };
                }

                // Our own card
                if (creator._id === currentUserId) {
                    return {
                        ...creator,
                        following: creator.following + 1
                    };
                }

                return creator;
            })
        );
    };



    const handleUnfollow = (creatorId) => {
        setCreators((prevCreators) =>
            prevCreators.map((creator) => {

                if (creator._id === creatorId) {
                    return {
                        ...creator,
                        isFollowing: false,
                        followers: creator.followers - 1
                    };
                }

                if (creator._id === currentUserId) {
                    return {
                        ...creator,
                        following: creator.following - 1
                    };
                }

                return creator;
            })
        );
    };



    return (
        <div className='mp-creators'>
            <Header />

            <main className="mp-home-content">
                <FeedHeader
                    title="CREATORS"
                    subtitle="Discover and follow amazing content creators"
                />

                <div className="creators-grid">

                    {loading ? (
                        <p>Loading creators...</p>
                    ) : (
                        creators.map((creator) => (
                            <CreatorCard
                                key={creator._id}
                                creatorId={creator._id}
                                profileImage={creator.profileImage}
                                username={creator.username}
                                followers={creator.followers}
                                posts={creator.postCount}
                                following={creator.following}
                                isFollowing={creator.isFollowing}
                                onFollow={handleFollow}
                                onUnfollow={handleUnfollow}
                                isCurrentUser={creator._id === currentUserId}
                            />
                        ))
                    )}

                </div>


            </main>
        </div>
    )
}

export default Creators