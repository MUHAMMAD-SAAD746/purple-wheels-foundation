import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import NavigationBar from "../NavigationBar/NavigationBar";

import PurpleWheel from "../../../assets/purplewheel.png";

import "./MainNavigation.css";

const MainNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="main-navigation">

            <div className="navigation-container">

                <a href="/" className="navigation-logo">
                    <img src={PurpleWheel} alt="Purple Wheel" />
                </a>

                <NavigationBar className={isMenuOpen ? "mobile-menu-open" : ""} />

                <button 
                    className="get-started-button"
                    onClick={() => navigate("/login")}
                >
                    Get Started
                </button>

                <button
                    className="hamburger-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <HiMenu />
                </button>

            </div>

        </header>
    );
};

export default MainNavigation;