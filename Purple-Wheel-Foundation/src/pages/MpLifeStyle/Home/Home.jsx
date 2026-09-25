

import { useEffect, useState } from "react";
import axios from "axios";

import "./Home.css";

import Header from "../../../components/MPLifeStyle/Header/Header";
import FeedHeader from "../../../components/MPLifeStyle/FeedHeader/FeedHeader";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";

// import Painting from "../../../assets/painting.png"
// import MorningRitual from "../../../assets/morning-ritual.png"

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/`
                    // `http://localhost:3000/api/blogs/`
                );

                console.log(response.data);
                setBlogs(response.data.blogs);
                console.log(blogs)
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    return (
        <div className="mp-home">
            <Header />

            <main className="mp-home-content">
                <FeedHeader
                    title="HOME FEED"
                    subtitle="Discover inspiring lifestyle content"
                    showButton={true}
                />

                <div className="mp-home-banner">
                    <h1>Welcome to MP Lifestyle</h1>
                    <p>Discover inspiring stories, creative ideas, and lifestyle tips from our community</p>
                </div>


                <div className="main-content">
                    <div className="mp-home-tabs">
                        <ul className="mp-home-tab-list">
                            <li className="mp-home-tab active">All</li>
                            <li className="mp-home-tab">Wellness</li>
                            <li className="mp-home-tab">Fashion</li>
                            <li className="mp-home-tab">Travel</li>
                            <li className="mp-home-tab">Motivation</li>
                            <li className="mp-home-tab">Food</li>
                        </ul>
                    </div>


                    {/* <div className="blog-card-grid">
                        <BlogCard
                            image={MorningRitual}
                            title="Morning Rituals for Better Focus"
                            description="Discover simple morning habits that can transform your productivity and mental clarity..."
                            profileImage={MorningRitual}
                            authorName="Ayesha Khan"
                            date="Oct 12, 2025"
                            likeCount="420"
                            viewCount="3.2k"
                        />
                        <BlogCard
                            image={Painting}
                            title="Creative Hobbies That Cost Less Than $20"
                            description="Unleash your creativity with these affordable hobby ideas perfect for beginners."
                            profileImage={Painting}
                            authorName="Nora Ali"
                            date="Oct 20, 2025"
                            likeCount="298"
                            viewCount="1.9k"
                        />
                        <BlogCard
                            image={Painting}
                            title="Creative Hobbies That Cost Less Than $20"
                            description="Unleash your creativity with these affordable hobby ideas perfect for beginners."
                            profileImage={Painting}
                            authorName="Nora Ali"
                            date="Oct 20, 2025"
                            likeCount="298"
                            viewCount="1.9k"
                        />
                    </div> */}




                    <div className="blog-card-grid">
                        {loading ? (
                            <p>Loading blogs...</p>
                        ) : (
                            blogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    image={blog.image}
                                    title={blog.title}
                                    description={blog.description}
                                    profileImage={blog.profileImage}
                                    authorName={blog.username}
                                    date={blog.createdAt}
                                    likeCount={blog.likeCount}
                                    viewCount={blog.viewCount}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;