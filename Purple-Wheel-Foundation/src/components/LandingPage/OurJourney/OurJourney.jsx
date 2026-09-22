import "./OurJourney.css";

const OurJourney = () => {

    return (
        <section className="our-journey">

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
                        viewBox="-70 0 1232 550"
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
                        <text
                            x="-50.50"
                            y="360"
                            fill="white"
                            textAnchor="middle"
                            fontSize="16"
                        >
                            2020
                        </text>

                        <foreignObject
                            x="-70"
                            y="375"
                            width="180"
                            height="100"
                        >
                            <p className="journey-description">
                                The vision for a connected digital ecosystem was born — one platform
                                that would bring together charity, creativity, and culture under a
                                single purpose.
                            </p>
                        </foreignObject>





                        <circle cx="212.50" cy="407.84" r="25" fill="white" />
                        <circle cx="212.50" cy="407.84" r="10" fill="#c4c4c4" />
                        <text
                            x="207.89"
                            y="460"
                            fill="white"
                            textAnchor="middle"
                            fontSize="16"
                        >
                            2021
                        </text>
                        <foreignObject
                            x="189"
                            y="475"
                            width="180"
                            height="120"
                        >
                            <p className="journey-description">
                                The PurpleWheels Foundation launched to support wellness, accessibility, and mental health. It became the first step in transforming lives through community-driven compassion.
                            </p>
                        </foreignObject>




                        <circle cx="410.50" cy="272.84" r="25" fill="white" />
                        <circle cx="410.50" cy="272.84" r="10" fill="#c4c4c4" />
                        <text
                            x="402.23"
                            y="325.61"
                            fill="white"
                            textAnchor="middle"
                            fontSize="16"
                        >
                            2022
                        </text>
                        <foreignObject
                            x="383.89"
                            y="343.17"
                            width="180"
                            height="120"
                        >
                            <p className="journey-description">
                                MP Lifestyle opened as a creative space for writers, creators, and dreamers. It turned everyday experiences into inspiring stories that motivate personal growth and connection.
                            </p>
                        </foreignObject>

                        <circle cx="731.50" cy="227.84" r="25" fill="white" />
                        <circle cx="731.50" cy="227.84" r="10" fill="#c4c4c4" />
                        <text
                            x="725.46"
                            y="284.61"
                            fill="white"
                            textAnchor="middle"
                            fontSize="16"
                        >
                            2023
                        </text>
                        <foreignObject
                            x="706.46"
                            y="300.17"
                            width="180"
                            height="120"
                        >
                            <p className="journey-description">
                                The Hot Like Pepper platform brought podcasts, shows, and live media together — giving creators and audiences a bold, engaging space to share entertainment with purpose.
                            </p>
                        </foreignObject>



                        <circle cx="1029.50" cy="13.84" r="25" fill="white" />
                        <circle cx="1029.50" cy="13.84" r="10" fill="#c4c4c4" />
                        <text
                            x="1022.69"
                            y="70.61"
                            fill="white"
                            textAnchor="middle"
                            fontSize="16"
                        >
                            2024
                        </text>
                        <foreignObject
                            x="1002.69"
                            y="87.61"
                            width="180"
                            height="120"
                        >
                            <p className="journey-description">
                                All three brands merged into one integrated ecosystem — uniting charity, lifestyle, and entertainment through a seamless digital experience with shared access and identity.
                            </p>
                        </foreignObject>


                    </svg>

                </div>
            </div>


        </section>
    );
};

export default OurJourney;