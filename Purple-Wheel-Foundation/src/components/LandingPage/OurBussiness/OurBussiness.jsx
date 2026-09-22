import { useState } from "react";

import { FaApple, FaChevronRight } from "react-icons/fa";
import GooglePlay from "../../../assets/icons/google-play.png"
import Bussiness1 from "../../../assets/bb.png";
import Bussiness2 from "../../../assets/business2.png";
import Bussiness3 from "../../../assets/business3.png";

import "./OurBussiness.css";

const OurBussiness = () => {
    const [currentBusiness, setCurrentBusiness] = useState(0);


    const businesses = [
        {
            description:
                "Present your charity brand as the heart of the ecosystem — emotional, credible, and inspiring action (“Donate,” “Volunteer,” “Get Involved”).",
            image: Bussiness1,
            title: "Purple Wheels Foundation",
            text:
                "Join us in creating impact. Through PurpleWheels, every donation, every volunteer, and every shared story helps someone move forward. Together, we roll hope forward.",
        },
        {
            description:
                "A creative hub for bloggers, storytellers, and wellness creators to share their voice with the world.",
            image: Bussiness2,
            title: "MP Lifestyle — Where Stories Inspire Change",
            text:
                "MP Lifestyle connects everyday creators and readers through real stories, wellness tips, and culture. Discover inspiration, follow creators, and engage with meaningful content — all in one place.",
        },
        {
            description:
                "Stream the hottest podcasts, shows, and moments — anytime, anywhere.",
            image: Bussiness3,
            title: "Hot Like Pepper — Where Entertainment Never Cools Down",
            text:
                "Hot Like Pepper blends creativity, rhythm, and voice. From trending music to talk shows and live events, this is the place to play, share, and stay connected with the world of entertainment.",
        },
    ];


    return (
        <section className="our-business">

            <div className="our-business-header">
                <h1>Our Business</h1>

                <p>
                    {businesses[currentBusiness].description}
                </p>
            </div>

            <div className="our-business-content">
                <div
                    className="business-arrow"
                    onClick={() =>
                        setCurrentBusiness(
                            (currentBusiness + 1) % businesses.length
                        )
                    }
                >
                    <FaChevronRight />
                </div>

                <div className="our-business-image">
                    <img
                        src={businesses[currentBusiness].image}
                        alt={businesses[currentBusiness].title}
                    />
                </div>

                <div className="our-business-info">
                    <div className="our-business-text">
                        <h2>{businesses[currentBusiness].title}</h2>

                        <p>
                            {businesses[currentBusiness].text}
                        </p>
                    </div>

                    <div className="app-buttons">

                        <div className="app-button">
                            <div className="app-icon google-play-icon">
                                {/* <GooglePlay /> */}
                                <img src={GooglePlay} alt="" />
                            </div>


                            <div>
                                <span>GET IT ON</span>
                                <strong>Google Play</strong>
                            </div>
                        </div>

                        <div className="app-button">
                            <div className="app-icon apple-icon">
                                <FaApple />
                            </div>


                            <div>
                                <span>Download on the</span>
                                <strong>App Store</strong>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default OurBussiness;