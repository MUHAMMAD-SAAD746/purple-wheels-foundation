import React from "react";
import Profile1 from "../../../assets/profile1.jpg";
import Profile2 from "../../../assets/profile2.jpg";
import Profile3 from "../../../assets/profile3.jpg";
import Profile4 from "../../../assets/profile4.png";
import AboutPanel from "../../../assets/about-panel.png"

import CreatorOnboard from "../../../assets/icons/creator-onboard.svg"
import Heart from "../../../assets/icons/heart.svg"
import PlayBtn from "../../../assets/icons/playbtn.svg"
import Growth from "../../../assets/icons/growth.svg"

import StatCard from "../StatCard/StatCard";

import "./About.css";

const About = () => {
    return (
        <section className="about-section">

            <div className="about-header">
                <h1>One Vision. Three Movements.</h1>

                <p>
                    A connected ecosystem built to empower kindness,
                    creativity, and culture.
                </p>
            </div>

            <div className="about-content">
                <div className="about-info">
                    <div className="padding-container">
                        <p>
                            Our platform unites charity, lifestyle, and
                            entertainment in one digital ecosystem. We believe
                            in the power of community — helping others, sharing
                            stories, and celebrating creativity.
                        </p>

                        <p>
                            Whether it's empowering lives through PurpleWheels,
                            inspiring change through MP Lifestyle, or spreading
                            joy through Hot Like Pepper, each experience is linked
                            by a single login, one user journey, and a shared
                            mission to make an impact.
                        </p>
                    </div>

                    <div className="about-footer">
                        <button className="about-start-button">
                            Let's Start
                        </button>

                        <div className="about-members">
                            <div className="member-profiles">
                                <img src={Profile1} alt="Member" />
                                <img src={Profile2} alt="Member" />
                                <img src={Profile4} alt="Member" />
                                <img src={Profile3} className="profile3" alt="Member" />
                            </div>

                            <div className="member-rating">
                                <h2>350k+ Members</h2>

                                <div className="rating-stars">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="empty-star">★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-image">
                    <img src={AboutPanel} alt="" />
                </div>
            </div>




            <div className="about-stats">

                <StatCard
                    icon={CreatorOnboard}
                    heading="$120K +"
                    description="Donation Raised"
                    color="#542f6c"
                />

                <StatCard
                    icon={Heart}
                    heading="320K +"
                    description="Creators Onboarded"
                    color="#1e90ff"
                />

                <StatCard
                    icon={PlayBtn}
                    heading="$120K +"
                    description="Episodes Streamed"
                    color="#fd0202"
                />

                <StatCard
                    icon={Growth}
                    heading="3 +"
                    description="Year Growth"
                    color="#542f6c"
                />
            </div>

        </section>
    );
};

export default About;