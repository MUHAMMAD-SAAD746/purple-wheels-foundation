import React from 'react'
import DonateIcon from "../../../assets/icons/donate.svg"
import JoinCreator from "../../../assets/icons/creator.svg"
import Play from "../../../assets/icons/play.svg"

import "./Home.css"

const Home = () => {
    return (
        <main className="landing-hero">
            <h1>One Platform - Three Experiences.</h1>
            <h1>One Purpose</h1>

            <p>
                From compassion to creativity to culture - we empower change,
                expression, and connection.
            </p>

            <div className="hero-buttons">
                <button className="donate-button">
                    <img src={DonateIcon} alt="" />
                    Donate Now
                </button>
                <button className="creator-button">
                    <img src={JoinCreator} alt="" />
                    Join As Creator
                </button>
                <button className="pepper-button">
                    <img src={Play} alt="" />
                    Play Hot Like Pepper
                </button>
            </div>
        </main>
    )
}

export default Home