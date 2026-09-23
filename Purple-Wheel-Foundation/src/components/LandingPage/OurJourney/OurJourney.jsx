import "./OurJourney.css";

const OurJourney = ({ id }) => {

    return (
        <section id={id} className="our-journey">

            <div className="our-journey-header">
                <h1>Our Journey</h1>

                <p>
                    From a single idea to a unified ecosystem connecting
                    charity, lifestyle, and entertainment.
                </p>
            </div>



            <div className="journey-curve-wrapper">
                <div className="journey-curve-container">
                    <svg
                        viewBox="-70 -12 1232 640"
                        className="journey-curve"
                        overflow="visible"
                    >
                        <path
                            d="M12.5002 319.297C60.5002 354.297 172.3 420.297 235.5 404.297C314.5 384.297 334 281.297 456 257.297C578 233.297 667.5 316.797 762 196.297C856.5 75.7967 902.5 -3.20334 1029.5 13.7967"
                            stroke="#CB30E0"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />

                        <circle cx="11.50" cy="319.84" r="25" fill="white" />
                        <circle cx="11.50" cy="319.84" r="10" fill="#c4c4c4" />

                        <circle cx="212.50" cy="407.84" r="25" fill="white" />
                        <circle cx="212.50" cy="407.84" r="10" fill="#c4c4c4" />

                        <circle cx="470.50" cy="255.84" r="25" fill="white" />
                        <circle cx="470.50" cy="255.84" r="10" fill="#c4c4c4" />

                        <circle cx="731.50" cy="227.84" r="25" fill="white" />
                        <circle cx="731.50" cy="227.84" r="10" fill="#c4c4c4" />

                        <circle cx="1029.50" cy="13.84" r="25" fill="white" />
                        <circle cx="1029.50" cy="13.84" r="10" fill="#c4c4c4" />
                    </svg>



                    <div className="journey-info journey-info-2020">
                        <div className="journey-year">
                            2020
                        </div>

                        <div className="journey-description">
                            The vision for a connected digital ecosystem was born — one platform
                            that would bring together charity, creativity, and culture under a
                            single purpose.
                        </div>
                    </div>

                    <div className="journey-info journey-info-2021">
                        <div className="journey-year">
                            2021
                        </div>

                        <div className="journey-description">
                            The PurpleWheels Foundation launched to support wellness, accessibility,
                            and mental health. It became the first step in transforming lives
                            through community-driven compassion.
                        </div>
                    </div>

                    <div className="journey-info journey-info-2022">
                        <div className="journey-year">
                            2022
                        </div>

                        <div className="journey-description">
                            MP Lifestyle opened as a creative space for writers, creators, and
                            dreamers. It turned everyday experiences into inspiring stories that
                            motivate personal growth and connection.
                        </div>
                    </div>

                    <div className="journey-info journey-info-2023">
                        <div className="journey-year">
                            2023
                        </div>

                        <div className="journey-description">
                            The Hot Like Pepper platform brought podcasts, shows, and live media
                            together — giving creators and audiences a bold, engaging space to
                            share entertainment with purpose.
                        </div>
                    </div>

                    <div className="journey-info journey-info-2024">
                        <div className="journey-year">
                            2024
                        </div>

                        <div className="journey-description">
                            All three brands merged into one integrated ecosystem — uniting
                            charity, lifestyle, and entertainment through a seamless digital
                            experience with shared access and identity.
                        </div>
                    </div>

                </div>
            </div>






            <div className="journey-mobile-timeline">

                <div className="journey-mobile-item">
                    <div className="journey-mobile-dot"></div>

                    <div className="journey-mobile-content">
                        <div className="journey-year">2020</div>
                        <div className="journey-description">
                            The vision for a connected digital ecosystem was born — one platform
                            that would bring together charity, creativity, and culture under a
                            single purpose.
                        </div>
                    </div>
                </div>

                <div className="journey-mobile-item">
                    <div className="journey-mobile-dot"></div>

                    <div className="journey-mobile-content">
                        <div className="journey-year">2021</div>
                        <div className="journey-description">
                            The PurpleWheels Foundation launched to support wellness, accessibility,
                            and mental health. It became the first step in transforming lives
                            through community-driven compassion.
                        </div>
                    </div>
                </div>

                <div className="journey-mobile-item">
                    <div className="journey-mobile-dot"></div>

                    <div className="journey-mobile-content">
                        <div className="journey-year">2022</div>
                        <div className="journey-description">
                            MP Lifestyle opened as a creative space for writers, creators, and
                            dreamers. It turned everyday experiences into inspiring stories that
                            motivate personal growth and connection.
                        </div>
                    </div>
                </div>

                <div className="journey-mobile-item">
                    <div className="journey-mobile-dot"></div>

                    <div className="journey-mobile-content">
                        <div className="journey-year">2023</div>
                        <div className="journey-description">
                            The Hot Like Pepper platform brought podcasts, shows, and live media
                            together — giving creators and audiences a bold, engaging space to
                            share entertainment with purpose.
                        </div>
                    </div>
                </div>

                <div className="journey-mobile-item">
                    <div className="journey-mobile-dot"></div>

                    <div className="journey-mobile-content">
                        <div className="journey-year">2024</div>
                        <div className="journey-description">
                            All three brands merged into one integrated ecosystem — uniting
                            charity, lifestyle, and entertainment through a seamless digital
                            experience with shared access and identity.
                        </div>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default OurJourney;