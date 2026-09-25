

import { useEffect, useState } from "react";
import axios from "axios";

import "./Home.css";

import Header from "../../../components/MPLifeStyle/Header/Header";
import FeedHeader from "../../../components/MPLifeStyle/FeedHeader/FeedHeader";
import BlogCard from "../../../components/MPLifeStyle/BlogCard/BlogCard";


const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url =
                    selectedCategory === "All"
                        ? `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/`
                        : `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/?category=${selectedCategory.toLowerCase()}`;

                const response = await axios.get(url);

                console.log(response.data);
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [selectedCategory]);


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
                            {["All", "Wellness", "Fashion", "Travel", "Motivation", "Food"].map(
                                (category) => (
                                    <li
                                        key={category}
                                        className={`mp-home-tab ${selectedCategory === category ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>



                    <div className="blog-card-grid">
                        {loading ? (
                            <p className="blog-loading">Loading blogs...</p>
                        ) : blogs.length === 0 ? (
                            <div className="no-blogs">
                                <h3>No blogs found</h3>
                                <p>
                                    There are no blogs available in the {selectedCategory} category yet.
                                </p>
                            </div>
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