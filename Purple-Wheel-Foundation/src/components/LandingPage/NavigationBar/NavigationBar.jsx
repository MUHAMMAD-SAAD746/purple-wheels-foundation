import React from "react";

import PurpleWheel from "../../../assets/purple-wheel-logo.png"

import "./NavigationBar.css";

const NavigationBar = ({ className }) => {
    return (
        <nav className={`navigation-bar ${className}`}>

            <a href="/" className="mobile-navigation-logo">
                <img src={PurpleWheel} alt="Purple Wheel" />
            </a>

            <div className="navigation-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/business">Our Business</a>
                <a href="/journey">Our Journey</a>
                <a href="/gallery">Gallery</a>
            </div>

            <button className="mobile-get-started-button">
                Get Started
            </button>
        </nav>
    );
};

export default NavigationBar;
