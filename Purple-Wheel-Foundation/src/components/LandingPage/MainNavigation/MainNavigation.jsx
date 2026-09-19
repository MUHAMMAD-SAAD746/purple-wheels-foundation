import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";

import PurpleWheel from "../../../assets/purplewheel.png";

import "./MainNavigation.css";

const MainNavigation = () => {
    return (
        <header className="main-navigation">

            <div className="navigation-container">

                <a href="/" className="navigation-logo">
                    <img src={PurpleWheel} alt="Purple Wheel" />
                </a>

                <NavigationBar />

                <button className="get-started-button">
                    Get Started
                </button>

            </div>

        </header>
    );
};

export default MainNavigation;