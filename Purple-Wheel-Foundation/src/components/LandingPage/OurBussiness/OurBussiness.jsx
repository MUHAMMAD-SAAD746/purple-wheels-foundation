import { FaApple } from "react-icons/fa";
import GooglePlay from "../../../assets/icons/google-play.png"
import Bussiness2 from "../../../assets/bb.png";

import "./OurBussiness.css";

const OurBussiness = () => {
    return (
        <section className="our-business">

            <div className="our-business-header">
                <h1>Our Business</h1>

                <p>
                    Present your charity brand as the heart of the ecosystem —
                    emotional, credible, and inspiring action (“Donate,”
                    “Volunteer,” “Get Involved”).
                </p>
            </div>

            <div className="our-business-content">
                <div className="our-business-image">
                    <img src={Bussiness2} alt="Purple Wheels Foundation" />
                </div>

                <div className="our-business-info">
                    <div className="our-business-text">
                        <h2>Purple Wheels Foundation</h2>

                        <p>
                            Join us in creating impact. Through PurpleWheels,
                            every donation, every volunteer, and every shared story
                            helps someone move forward. Together, we roll hope
                            forward.
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